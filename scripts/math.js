export default function(math) {
  const meta = {
    operator: {
      binary: {
        '+': (lhs, rhs) => math.add(lhs, rhs),
        '-': (lhs, rhs) => math.subtract(lhs, rhs),
        '*': (lhs, rhs) => math.multiply(lhs, rhs),
        '/': (lhs, rhs) => math.divide(lhs, rhs),
      },
      unary: {
        '-': lhs => math.unaryMinus(lhs),
        '+': lhs => math.unaryPlus(lhs),
        '~': lhs => math.conj(lhs)
      }
    }
  }
  if (!('__EllxMeta__' in math.Complex.prototype)) Object.defineProperty(math.Complex.prototype, '__EllxMeta__', { value: meta });
  if (!('__EllxMeta__' in math.Matrix.prototype)) Object.defineProperty(math.Matrix.prototype, '__EllxMeta__', { value: meta })

  return math;
}
