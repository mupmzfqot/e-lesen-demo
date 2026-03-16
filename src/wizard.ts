import { createIcons, icons } from 'lucide'

const STEP_COUNT = 4

function goToStep(step: number) {
  if (step < 1 || step > STEP_COUNT) return

  // Hide all steps
  document.querySelectorAll('.wizard-step').forEach((el) => {
    el.classList.add('hidden')
  })

  // Show target step
  const target = document.getElementById(`step-${step}`)
  target?.classList.remove('hidden')

  // Update step circles and bars
  const stepIndicators = document.querySelectorAll('[data-step-indicator]')
  stepIndicators.forEach((indicator, index) => {
    const circle = indicator.querySelector('[data-step-circle]') as HTMLElement | null
    const bar = indicator.querySelector('[data-step-bar]') as HTMLElement | null
    const stepNum = index + 1

    if (!circle) return

    if (stepNum < step) {
      circle.className =
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white'
      circle.innerHTML = '<i data-lucide="check" class="h-5 w-5"></i>'
      if (bar) bar.className = 'mx-2 hidden h-1 flex-1 rounded bg-accent sm:block'
    } else if (stepNum === step) {
      circle.className =
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white'
      circle.textContent = String(stepNum)
      if (bar)
        bar.className = 'mx-2 hidden h-1 flex-1 rounded bg-gray-200 sm:block dark:bg-gray-700'
    } else {
      circle.className =
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-500 dark:bg-gray-700 dark:text-gray-400'
      circle.textContent = String(stepNum)
      if (bar)
        bar.className = 'mx-2 hidden h-1 flex-1 rounded bg-gray-200 sm:block dark:bg-gray-700'
    }
  })

  // Update step labels
  const stepLabels = document.querySelectorAll('[data-step-label]')
  stepLabels.forEach((label, index) => {
    const stepNum = index + 1
    if (stepNum < step) {
      label.className = 'font-medium text-accent dark:text-accent-light'
    } else if (stepNum === step) {
      label.className = 'font-medium text-primary dark:text-primary-light'
    } else {
      label.className = 'text-gray-500 dark:text-gray-400'
    }
  })

  // Re-render icons (for the check icon in completed steps)
  createIcons({ icons })

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function submitApplication() {
  // Hide wizard steps and step indicator
  document.querySelectorAll('.wizard-step').forEach((el) => {
    el.classList.add('hidden')
  })
  const wizardNav = document.querySelector('.mb-8') as HTMLElement | null
  if (wizardNav) wizardNav.classList.add('hidden')

  // Show success message
  const success = document.getElementById('success-message')
  if (success) {
    success.classList.remove('hidden')
    createIcons({ icons })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Expose to inline onclick handlers
declare global {
  interface Window {
    goToStep: (step: number) => void
    submitApplication: () => void
  }
}

window.goToStep = goToStep
window.submitApplication = submitApplication
