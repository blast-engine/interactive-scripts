export const routerPrefix = (match) => {
  if (!match || !match.url) return ''
  let prefix = match.url
  if (prefix[prefix.length - 1] === '/') 
    prefix = prefix.substr(0, prefix.length - 1)
  return prefix
}
  