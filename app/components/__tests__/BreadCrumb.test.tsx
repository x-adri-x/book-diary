import { render, screen } from '@testing-library/react'
import Breadcrumb from '@/app/components/breadcrumb'

const mockRoutes = [{ path: '/diaries/1/harry-potter', label: 'Categories' }]

describe('Breadcrumb Component', () => {
  it('renders the home link correctly', () => {
    render(<Breadcrumb routes={[]} />)

    const homeLink = screen.getByText(/home/i)
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.closest('a')).toHaveAttribute('href', '/diaries')
  })

  it('renders all routes passed as props', () => {
    render(<Breadcrumb routes={mockRoutes} />)

    mockRoutes.forEach((route) => {
      const routeLink = screen.getByText(new RegExp(route.label, 'i'))
      expect(routeLink).toBeInTheDocument()
      expect(routeLink.closest('a')).toHaveAttribute('href', route.path)
    })
  })

  it('displays icon for each breadcrumb item', () => {
    render(<Breadcrumb routes={mockRoutes} />)

    const chevrons = screen.getAllByTestId('chevron-icon')
    expect(chevrons).toHaveLength(mockRoutes.length + 1)
  })
})
