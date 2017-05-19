# vec

Tiny linear algebra library specifically for 2d

## Features

- Immutable functions
- Vectors and matrices represented as pure, single dimensional arrays

## API

- `vec.add(v, v2)` : Result of adding `v` and `v2`
- `vec.sub(v, v2)` : Result of subtracting `v2` from `v`
- `vec.scale(v, sc)` : Result of multiplying components of `v` by `sc`
- `vec.midpoint(v, v2)` : Midpoint between `v` and `v2`
- `vec.norm(v)` : Result of normalising `v`
- `vec.mag(v)` : Magnitude of `v`
- `vec.rotate(v, a)` : Result of rotating `v` around the origin by `a` radians
- `vec.rotatePointAround(v, cp, a)` : Result of rotating `v` around `cp` by `a` radians
- `vec.transform(v, m)` : Result of applying matrix tranformation `m` to `v`
- `vec.dot(v, v2)` : Dot product of `v` and `v2`
- `vec.det(v)` : Determinant of `v`

Finally, you can call `vec.polute()` to insert these functions into the global scope with the naming convention:

`vFunctionName` e.g `vAdd`, `vMidpoint`, `vDot` etc

## Motivation

 Many linear algebra libraries represent their vectors as object like `{ x, y }`, which can be cumbersome to work with. Arrays are easier to map, reduce, combine and generally work with symbolically. Additionally, Vec is designed to be used with ES6 and thus the `...` rest syntax, and so can easily and cleanly be supplied to functions expecting `x` and `y` parameters as sequential arguments.
 
 For example: 
 
 `ctx.arc(...point, radius, 0, 2 * Math.PI, false)`;
