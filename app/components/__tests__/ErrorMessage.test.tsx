// ErrorMessage.test.tsx

import React from 'react'
import { render, screen } from '@testing-library/react'
import ErrorMessage from '@/app/components/error-message'

describe('ErrorMessage Component', () => {
  it('renders the error message text when errorMessage is provided', () => {
    render(<ErrorMessage errorMessage='This is an error message.' />)

    // Check if the icon is present
    const iconElement = screen.getByTestId('exclamation-icon')
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveClass('text-red-500')

    // Check if the error message text is present
    const messageElement = screen.getByText('This is an error message.')
    expect(messageElement).toBeInTheDocument()
    expect(messageElement).toHaveClass('text-red-600')
  })

  it('does not render anything when errorMessage is null', () => {
    const { container } = render(<ErrorMessage errorMessage={null} />)

    // Check that nothing is rendered inside the container when errorMessage is null
    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
