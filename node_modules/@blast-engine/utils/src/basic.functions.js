export const assign = Object.assign
export const keys = obj => Object.keys(obj || {})
export const k = keys
export const values = obj => keys(obj).map(k => obj[k])
export const v = values
export const merge = (...objs) => Object.assign({}, ...objs)
export const m = merge
export const rollup = (arr, deriveValue = () => true) => arr.reduce((obj, str) => merge(obj, { [str]: deriveValue(str) }), {})
export const flattenArrs = arrs => arrs.reduce((flat, arr) => flat.concat(arr), [])
export const valuesWithKey = obj => keys(obj).map(k => merge(obj[k], { _key: k }))
export const shallowClone = merge
export const arrayClone = arr => arr.slice(0)
export const kv = obj => keys(obj).map(k => ({ k, v: obj[k] }))
export const pairs = kv
export const kvr = kv => kv.reduce((o, { k, v }) => merge(o, { [k]: v }), {}) 
export const objMap = (obj, fn) => kv(obj).reduce((o, { k, v }) => merge(o, { [k]: fn(v, k) }), {})
export const objForEach = objMap
export const doAsync = (fn, ms = 0) => new Promise(resolve => setTimeout(() => resolve(fn()), ms))
export const isArray = thing => Array.isArray(thing)
export const isString = thing => typeof thing === 'string'
export const noop = () => undefined
export const sleep = ms => new Promise(r => setTimeout(r, ms))
export const wait = sleep
export const rand = (from = 0, to = 100) => Math.floor(Math.random() * (to)) + from
export const unique = (...arrs) => Array.from(new Set(arrs.reduce((c, a) => c.concat(a))))
export const arrayOf = (length = 0) => (new Array(length)).fill(true)
export const ellipsis = (str = '', maxLength) =>
  (str.length > maxLength) ? str.substring(0, maxLength).trim() + '...' : str

export class Emitter {
  constructor() { this.handlers = [] }
  subscribe(handler) { this.handlers.push(handler) }
  unsubscribe(handler) { this.handlers = this.handlers.filter(h => h !== handler)}
  emit(result) { this.handlers.forEach(handler => handler(result)) }
}

export const trimStart = str => {
  if (str.trimStart) return str.trimStart()
  if (str.trimLeft) return str.trimLeft()
  const trimmed = str.trim()
	const startIndex = str.indexOf(trimmed)	
	return str.slice(startIndex, str.length)
}

export const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

export const debounce = (func, delay) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}