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

  // Sidebar toggle (works on all screen sizes)
  const sidebarToggle = document.getElementById('sidebar-toggle')
  const sidebarAside = document.querySelector('#sidebar aside')
  const overlay = document.getElementById('sidebar-overlay')
  const contentArea = document.querySelector('.lg\\:pl-64')
  const isLargeScreen = () => window.matchMedia('(min-width: 1024px)').matches

  function openSidebar() {
    sidebarAside?.classList.remove('-translate-x-full')
    if (isLargeScreen()) {
      contentArea?.classList.add('lg:pl-64')
      contentArea?.classList.remove('lg:pl-0')
    } else {
      overlay?.classList.remove('hidden')
    }
  }

  function closeSidebar() {
    sidebarAside?.classList.add('-translate-x-full')
    if (isLargeScreen()) {
      contentArea?.classList.remove('lg:pl-64')
      contentArea?.classList.add('lg:pl-0')
      sidebarAside?.classList.remove('lg:translate-x-0')
    } else {
      overlay?.classList.add('hidden')
    }
  }

  sidebarToggle?.addEventListener('click', () => {
    if (
      sidebarAside?.classList.contains('-translate-x-full') &&
      !sidebarAside?.classList.contains('lg:translate-x-0')
    ) {
      openSidebar()
    } else {
      closeSidebar()
    }
  })

  overlay?.addEventListener('click', closeSidebar)
})
