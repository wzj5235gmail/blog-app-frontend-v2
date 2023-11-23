export default function isAuthenticated() {
  return Boolean(localStorage.getItem('currentUser'))
}