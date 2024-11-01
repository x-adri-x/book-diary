// Input.test.tsx

import React from 'react'
import { render, screen } from '@testing-library/react'
import Input from '@/app/components/input'

describe('Input Component', () => {
  it('renders the label correctly', () => {
    render(<Input label='Username' placeholder='Enter username' />)

    const labelElement = screen.getByText('Username')
    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveAttribute('for', 'username')
  })

  it('sets the placeholder correctly', () => {
    render(<Input label='Email' placeholder='Enter your email' />)

    const inputElement = screen.getByPlaceholderText('Enter your email')
    expect(inputElement).toBeInTheDocument()
  })

  it('uses the default type of text when no type is specified', () => {
    render(<Input label='Full Name' placeholder='Enter full name' />)

    const inputElement = screen.getByPlaceholderText('Enter full name')
    expect(inputElement).toHaveAttribute('type', 'text')
  })

  it('uses the specified type when provided', () => {
    render(<Input label='Password' placeholder='Enter password' type='password' />)

    const inputElement = screen.getByPlaceholderText('Enter password')
    expect(inputElement).toHaveAttribute('type', 'password')
  })

  it('renders children elements if provided', () => {
    render(
      <Input label='Search' placeholder='Search here'>
        <span role='img' aria-label='magnifying glass'>
          🔍
        </span>
      </Input>
    )

    const iconElement = screen.getByLabelText('magnifying glass')
    expect(iconElement).toBeInTheDocument()
  })
})
