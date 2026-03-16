const base = import.meta.env.BASE_URL

async function loadPartial(selector: string, path: string): Promise<void> {
  const el = document.querySelector(selector)
  if (!el) return
  const url = base.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
  const res = await fetch(url)
  if (!res.ok) {
    console.error(`Failed to load partial: ${url} (${res.status})`)
    return
  }
  el.innerHTML = await res.text()
}

function detectRole(): string {
  const path = window.location.pathname
  if (path.includes('/pegawai/')) return 'pegawai'
  if (path.includes('/pemohon/')) return 'pemohon'
  if (path.includes('/pelesen/')) return 'pelesen'
  return 'admin'
}

export async function loadLayout(): Promise<void> {
  const role = detectRole()
  await Promise.all([
    loadPartial('#sidebar', `partials/sidebar-${role}.html`),
    loadPartial('#header', 'partials/header.html'),
  ])
}
