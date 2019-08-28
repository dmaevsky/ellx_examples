const ELLX_META = Symbol.for('~ellxMeta');

export default function(math) {
  math.type.Complex.prototype[ELLX_META] =
  math.type.Matrix.prototype[ELLX_META] =
  {
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
  return math;
}
