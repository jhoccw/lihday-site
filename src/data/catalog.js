import all from './products.json'

export const categories = [
  { id: 'ahd', icon: 'camera', name: 'AHD 攝影機', desc: '立岱 AHD 攝影機，分為 200 萬與 500 萬畫素兩個系列。' },
  { id: 'ip', icon: 'dome', name: '網路攝影機', desc: '立岱網路攝影機，包含槍型、半球型與快速球型。' },
  { id: 'recorder', icon: 'recorder', name: '錄影主機', desc: '立岱 AHD 錄影主機與網路錄影主機。' },
  { id: 'intercom', icon: 'intercom', name: '影像對講', desc: '德運經銷的 Honeywell 網路影像對講系統，可下載原廠型錄。' },
]

export const products = all

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]))

export function productsIn(categoryId) {
  return products.filter((p) => p.category === categoryId)
}

// Products of one category, split by their series ("group"), in catalogue order.
export function groupsIn(list) {
  const groups = []
  for (const p of list) {
    let g = groups.find((x) => x.name === p.group)
    if (!g) groups.push((g = { name: p.group, items: [] }))
    g.items.push(p)
  }
  return groups
}

export function findProduct(slug) {
  return products.find((p) => p.slug === slug)
}

export const featured = ['ld-205bs', 'ld-209hrv', 'ld-505br', 'ld-506dr', 'ld-ip406dr', 'ld-ip407x', 'ld-ip308sdr', 'ld-snr8616he']
  .map(findProduct)
  .filter(Boolean)
