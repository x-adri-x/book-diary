import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Field from '@/app/ui/field'
import { editContent } from '@/app/lib/actions'
import { useParams, usePathname, useSearchParams } from 'next/navigation'

// Mock the editContent function
jest.mock('../../lib/actions', () => ({
  editContent: jest.fn(),
}))

// Mock the Next.js navigation functions
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

// Sample data for the tests
const mockField = { id: 1, name: 'Test Field' }
const mockContents = [{ fieldId: 1, text: 'Initial content' }]

describe('Field Component', () => {
  beforeEach(() => {
    // Mock return values for Next.js functions
    ;(useParams as jest.Mock).mockReturnValue({ id: '123' })
    ;(usePathname as jest.Mock).mockReturnValue('/test/path')

    // Mock searchParams to return an object with the get method
    const mockSearchParams = {
      get: jest.fn((key) => {
        if (key === 'category') return '10'
        if (key === 'item') return '20'
        return null
      }),
    }
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<Field field={mockField} contents={mockContents} />)
    expect(screen.getByText('Test Field')).toBeInTheDocument()
  })

  it('displays initial content', () => {
    render(<Field field={mockField} contents={mockContents} />)
    expect(screen.getByText('Initial content')).toBeInTheDocument()
  })

  it('clicking on the field item opens and closes accordion', () => {
    render(<Field field={mockField} contents={mockContents} />)
    const field = screen.getByText('Test Field')
    fireEvent.click(field)
    expect(screen.getByText('Initial content')).toBeVisible()

    fireEvent.click(field)
    expect(screen.queryByText('Initial content')).not.toBeVisible()
  })

  it('allows editing content', () => {
    render(<Field field={mockField} contents={mockContents} />)
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('calls editContent when saving', async () => {
    const searchParams = useSearchParams()
    const params = useParams()
    const path = usePathname()
    // Mock successful response
    ;(editContent as jest.Mock).mockResolvedValue({ success: true })

    render(<Field field={mockField} contents={mockContents} />)
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
    const textarea = screen.getByRole('textbox')

    // Edit content
    fireEvent.change(textarea, { target: { value: 'Updated content' } })
    fireEvent.click(screen.getByText('Save'))

    await waitFor(() => {
      expect(editContent).toHaveBeenCalledWith(
        'Updated content',
        1,
        parseInt(searchParams.get('category')!),
        parseInt(searchParams.get('item')!),
        params,
        path
      )
    })
  })

  it('displays an error message if editContent fails', async () => {
    // Mock not successful response
    ;(editContent as jest.Mock).mockResolvedValue({ error: 'Error updating content' })

    render(<Field field={mockField} contents={mockContents} />)
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))

    // Edit content
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Updated content' } })
    fireEvent.click(screen.getByText('Save'))
    await waitFor(() => {
      expect(screen.getByText('Error updating content')).toBeInTheDocument()
    })
  })

  it('cancels editing and restores original content', () => {
    render(<Field field={mockField} contents={mockContents} />)
    fireEvent.click(screen.getByText('Edit'))

    // Edit content
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Updated content' } })
    fireEvent.click(screen.getByText('Cancel'))

    expect(screen.getByText('Initial content')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument() // Textarea should not be visible
  })
})
