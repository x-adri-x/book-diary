export function addDash(text: string) {
  return text.replaceAll(' ', '-')
}

export function removeDash(text: string) {
  return text.replaceAll('-', ' ')
}
