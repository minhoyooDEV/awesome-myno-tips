import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: About,
})
Route.options.id = 'About'

function About() {
  return <div className="p-2">Hello from About!</div>
}
