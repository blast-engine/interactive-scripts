export const assert = (assertions) => {
  if (!expect) throw new Error('assert() can only be used in a testing environment')
  assertions.forEach(a => expect(a).toBeTruthy())
}