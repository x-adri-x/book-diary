// FormWithButton.test.tsx

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from '@/app/components/form'
import FormButton from '@/app/components/form-button'

describe('Form Component', () => {
  it('renders the form heading and children correctly', () => {
    render(
      <Form onSubmit={() => {}} heading='Test'>
        <p>Children</p>
      </Form>
    )

    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Children')).toBeInTheDocument()
  })

  it('forwards the ref to the form element', () => {
    const formRef = React.createRef<HTMLFormElement>()
    render(
      <Form onSubmit={() => {}} heading='Ref Test' ref={formRef}>
        <p>Form Content</p>
      </Form>
    )

    // Check that ref is attached to the form element
    expect(formRef.current).toBeInstanceOf(HTMLFormElement)
  })
})

describe('Form component with FormButton Component', () => {
  it('calls onSubmit when button within form is clicked', async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault())
    render(
      <Form onSubmit={handleSubmit} heading='Form with Button Test'>
        <FormButton label='Submit' loading={false} />
      </Form>
    )

    const buttonElement = screen.getByText('Submit')
    fireEvent.click(buttonElement)

    // Wait for the form submission to be registered
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('displays loading state on button click if loading is true', async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault())
    render(
      <Form onSubmit={handleSubmit} heading='Form with Loading Button'>
        <FormButton label='Submit' loading={true} />
      </Form>
    )

    // Check that the loading text appears
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
