import { render, screen, fireEvent } from '@testing-library/react'
import SignUpForm from '@/app/ui/signup-form'
import { signup } from '@/app/lib/actions'

jest.mock('@/lib/actions', () => ({
  signup: jest.fn(),
}))

describe('Signup Component', () => {
  it('renders the form title', () => {
    render(<SignUpForm />)
    expect(screen.getByText('Create an account')).toBeInTheDocument()
  })
})
