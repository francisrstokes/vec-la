# vec

Tiny linear algebra library specifically for 2d

## Installation

`npm install --save vec-la`

and import or require as needed. If you need to use a standalone windowed version in a script tag:

`<script src="node_modules/vec-la/dist/vec.window.js"></script>`

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
- `vec.composeTransform(m, m2)` : Result of composing transformation matrix `m` with `m2`
- `vec.dot(v, v2)` : Dot product of `v` and `v2`
- `vec.det(v)` : Determinant of `v`

Finally, when using the window version you can call `vec.polute()` to insert these functions into the global scope with the naming convention:

`vFunctionName` e.g `vAdd`, `vMidpoint`, `vDot` etc.

## Examples

(all examples assume vec is imported under `vec`)

### Addition

```
const v1 = [0, 1];
const v2 = [1, 0];
const v3 = vec.add(v1, v2); // [1, 1]
```

### Scaling

```
const v1 = [0, 1];
const scaler = 10;
const v2 = vec.scale(v1, scaler); // [0, 10]
```

### Normalising

```
const v1 = [6.32, -23.1];
const v2 = vec.norm(v1); // [0.2638946146581466, -0.9645515187663272]
```

### Magnitude

```
const v1 = [6.32, -23.1];
const mag = vec.mag(v1); // 23.948954048141644
```


### Matrix Transform

```
const v1 = [10, 10];

// Inversion matrix
const m = [
  0, -1,
  -1, 0
];
const v2 = vec.transform(v1, m); // [-10, -10]
```

### Computing determinants

```
const m = [
  10, 0, 
  0, 10
];
const d = vec.det(m); // 100
```

### Composing Matrices

```
const v = [10, 10];
const m = [
  0, -1,
  -1, 0
];
const m2 = [
  Math.cos(Math.PI/2), -Math.sin(Math.PI/2),
  Math.sin(Math.PI/2), Math.cos(Math.PI/2)
];
const m3 = vec.composeTransform(m2, m);

const v2 = vec.transform(v1, m1); // is the same as
const v3 = vec.transform(vec.transform(v1, m), m2);
```

## Motivation

 Many linear algebra libraries represent their vectors as object like `{ x, y }`, which can be cumbersome to work with. Arrays are easier to map, reduce, combine and generally work with symbolically. Additionally, Vec is designed to be used with ES6 and thus the `...` rest syntax, and so can easily and cleanly be supplied to functions expecting `x` and `y` parameters as sequential arguments.
 
 For example: 
 
 `ctx.arc(...point, radius, 0, 2 * Math.PI, false)`;
