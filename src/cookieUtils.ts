// Set a cookie
// export function setCookie(name: string, value: string, days: number): void {
//   const date = new Date()
//   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
//   const expires = 'expires=' + date.toUTCString()
//   document.cookie = `${name}=${value};${expires};path=/`
// }

// Set a cookie with SameSite attribute
// setCookie('firstVisit', 'true', 7, 'None'); // Or 'Lax' if cross-site usage is not needed
export function setCookie(
  name: string,
  value: string,
  days: number,
  sameSite: string = 'Lax',
): void {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  // Ensure SameSite is set to None and Secure for cross-site contexts
  const secure = sameSite === 'None' ? 'Secure;' : ''
  document.cookie = `${name}=${value};${expires};path=/;SameSite=${sameSite};${secure}`
}

// Get a cookie by name
export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let c of ca) {
    c = c.trim()
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// Check if a cookie exists
export function checkCookie(name: string): boolean {
  return getCookie(name) !== null
}

// Delete a cookie by name
export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}
