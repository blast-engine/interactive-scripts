export const keys = obj => Object.keys(obj || {})
export const values = obj => Object.values(obj || {})
export const pairs = obj => keys(obj).map(k => ({ k, v: obj[k] }))
export const merge = (...objs) => Object.assign({}, ...objs)
export const encodeEmail = email => email.replace(/\./g,',')
export const decodeEamil = email => email.replace(/,/g,'.')
export const flatMap = arr => mapFunc => (arr || [])
  .map(mapFunc)
  .reduce((flat, item) => flat.concat(Array.isArray(item) ? item : [item]), [])

export const throttle = (func, delay) => {
  let timeout
  return (...args) => {
    if (!timeout) { 
      func(); 
      timeout = setTimeout( () => { timeout = null }, delay)
    }  
  }
}
export const debounce = (func, delay) => {
  let timeout
  return (...args) =>{
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {func()},delay)
  }
}