import jwtDecode from "jwt-decode";

export function tokenIsValid() {
  const tokenStore = localStorage.getItem('token');
  if (!tokenStore) {
    return false;
  }
  const { exp } = jwtDecode(tokenStore);
  const expirationTime = exp * 1000;
  const currentTime = new Date().getTime();
  const timeBeforeExpiration = 1200000;

  return currentTime < expirationTime - timeBeforeExpiration;
}