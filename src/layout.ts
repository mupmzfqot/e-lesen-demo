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

export async function loadLayout(): Promise<void> {
  await Promise.all([
    loadPartial('#sidebar', 'partials/sidebar.html'),
    loadPartial('#header', 'partials/header.html'),
  ])
}
