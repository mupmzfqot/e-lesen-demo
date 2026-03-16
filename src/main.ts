import './styles/main.css'
import { createIcons, icons } from 'lucide'
import { loadLayout } from './layout'

document.addEventListener('DOMContentLoaded', async () => {
  await loadLayout()
  createIcons({ icons })

  // Restore dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.documentElement.classList.add('dark')
  }

  // Dark mode toggle
  const toggle = document.getElementById('dark-mode-toggle')
  toggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark')
    localStorage.setItem(
      'darkMode',
      document.documentElement.classList.contains('dark') ? 'enabled' : 'disabled'
    )
  })

  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById('sidebar-toggle')
  const sidebar = document.getElementById('sidebar')
  sidebarToggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('-translate-x-full')
  })

  // Close sidebar when clicking overlay on mobile
  const overlay = document.getElementById('sidebar-overlay')
  overlay?.addEventListener('click', () => {
    sidebar?.classList.add('-translate-x-full')
  })
})
