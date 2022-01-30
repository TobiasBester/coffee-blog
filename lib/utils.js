export const saveToLocalStorage = (key, value) => {
  if (typeof window === 'undefined') {
    return
  }
  if (!isNotBlank(key) || !isNotBlank(value)) {
    return
  }
  window.localStorage.setItem(key, value)
}

export const getFromLocalStorage = (key) => {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage.getItem(key)
}

export const isNotBlank = (str) => {
  return str?.length > 0
}
