export const consoleOutUpdatedProps = _this => {
  const v = Object.values(_this.props)
  const k = Object.keys(_this.props)
  const lv = Object.values(_this.__lastProps || {})
  const lk = Object.keys(_this.__lastProps || {})

  // @todo: ignores props that disappeared
  const updatedProps = v
    .filter(i => !lv.includes(i))
    .map(i => k[v.indexOf(i)])

  if (updatedProps.length)
    console.log(_this.constructor.name + ' props updated', updatedProps)

  _this.__lastProps = _this.props
}

export const consoleOutUpdatedState = _this => {
  const v = Object.values(_this.state)
  const k = Object.keys(_this.state)
  const lv = Object.values(_this.__lastState || {})
  const lk = Object.keys(_this.__lastState || {})

  // @todo: ignores state that disappeared
  const updatedState = v
    .filter(i => !lv.includes(i))
    .map(i => k[v.indexOf(i)])

  if (updatedState.length)
    console.log(_this.constructor.name + ' state updated', updatedState)

  _this.__lastState = _this.state
}