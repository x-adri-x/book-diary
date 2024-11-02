import { render, screen } from '@testing-library/react'
import SignUpForm from '@/app/ui/signup-form'

jest.mock('@/lib/actions', () => ({
  signup: jest.fn(),
}))

describe('Signup Component', () => {
  it('renders the form title', () => {
    render(<SignUpForm />)
    expect(screen.getByText('Create an account')).toBeInTheDocument()
  })
})
