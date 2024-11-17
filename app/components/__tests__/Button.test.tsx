import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from '@/app/components/button'
import userEvent from '@testing-library/user-event'

describe('Button Component', () => {
  const mockOnClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the button with the correct label', () => {
    render(<Button label='Submit' onClick={mockOnClick} />)

    const buttonElement = screen.getByRole('button', { name: 'Submit' })
    expect(buttonElement).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    render(<Button label='Submit' onClick={mockOnClick} />)

    const user = userEvent.setup()
    const buttonElement = screen.getByRole('button', { name: 'Submit' })
    await user.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders "Loading..." when loading is true', () => {
    render(<Button label='Submit' loading={true} onClick={mockOnClick} />)

    const buttonElement = screen.getByRole('button', { name: 'Loading...' })
    expect(buttonElement).toBeInTheDocument()
  })

  it('disables the button when loading is true', () => {
    render(<Button label='Submit' loading={true} onClick={mockOnClick} />)

    const buttonElement = screen.getByRole('button', { name: 'Loading...' })
    expect(buttonElement).toBeDisabled()
  })

  it('has correct styles when loading is true', () => {
    render(<Button label='Submit' loading={true} onClick={mockOnClick} />)

    const buttonElement = screen.getByRole('button', { name: 'Loading...' })
    expect(buttonElement).toHaveClass('opacity-50')
  })

  it('enables the button and renders the label when loading is false', () => {
    render(<Button label='Submit' loading={false} onClick={mockOnClick} />)

    const buttonElement = screen.getByRole('button', { name: 'Submit' })
    expect(buttonElement).toBeEnabled()
    expect(buttonElement).toHaveTextContent('Submit')
  })
})
