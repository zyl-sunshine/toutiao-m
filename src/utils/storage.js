/*
 *封装localStorage
 */

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
  //   return JSON.parse(window.localStorage.getItem(name))
}
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    return (value = JSON.stringify(value))
  }
  window.localStorage.setItem(name, value)
}
export const removeItem = name => {
  return window.localStorage.removeItem(name)
}
