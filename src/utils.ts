export function getSVGImageURL(name: string) {
  return new URL(`./assets/img/${name}.svg`, import.meta.url).href
}

const frenchFormatter = new Intl.NumberFormat('fr-FR', {
  notation: 'compact',
})

export function formatNumber(num: number, limit = 1000000000): string {
  if (num < limit) return num.toLocaleString('fr')
  return frenchFormatter.format(num)
}
