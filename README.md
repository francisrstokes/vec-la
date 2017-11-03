# vec

Tiny linear algebra library specifically for 2d.

See it in action: https://codepen.io/fstokesman/pen/aWgEXv

## Installation

`npm install --save vec-la`

and import or require as needed. If you need to use a standalone windowed version in a script tag:

`<script src="node_modules/vec-la/dist/vec.window.js"></script>`

## Features

- Immutable functions for manipulating vectors
- Vectors and matrices represented as pure, single dimensional arrays
- Immutable Matrix builder helper object for sequentially composing matrices

## API

- `vec.add(v, v2)` : Result of adding `v` and `v2`
- `vec.sub(v, v2)` : Result of subtracting `v2` from `v`
- `vec.scale(v, sc)` : Result of multiplying components of `v` by `sc`
- `vec.midpoint(v, v2)` : Midpoint between `v` and `v2`
- `vec.norm(v)` : Result of normalising `v`
- `vec.mag(v)` : Magnitude of `v`
- `vec.normal(v)`: Normal vector of `v`
- `vec.towards(v, v2, t)`: A point in the interval [v, v2] along the direction formed from `v2 - v1`. `t` is a normalalised percentage [0, 1] of where in the interval the point falls.
- `vec.rotate(v, a)` : Result of rotating `v` around the origin by `a` radians
- `vec.rotatePointAround(v, cp, a)` : Result of rotating `v` around `cp` by `a` radians
- `vec.dot(v, v2)` : Dot product of `v` and `v2`
- `vec.det(v)` : Determinant of `v`
- `vec.dist(v, v2)` : Euclidean distance between `v` and `v2`
- `vec.matrixBuilder(m)` : Creates a matrix builder (see below)
- `vec.createMatrix(a, b, c, d, tx, ty)` : Helper function for matrix creation. Defaults to an identity matrix
- `vec.transform(v, m)` : Result of applying matrix tranformation `m` to `v`
- `vec.composeTransform(m, m2)` : Result of composing transformation matrix `m` with `m2`


Finally, when using the window version you can call `vec.polute()` to insert these functions into the global scope with the naming convention:

`vFunctionName` e.g `vAdd`, `vMidpoint`, `vDot` etc.

## Matrix Builder

`vec.matrixBuilder(m)` creates a builder object that can be used to easily chain together transformations. Call `get()` on the builder at any time to get a copy of the matrix at that point.

```javascript 
const mb = vec.matrixBuilder(); // Defaults to identity matrix
const finalMatrix = mb
  .rotate(Math.PI/6)
  .scale(2, 3)
  .shear(0.2, 0)
  .translate(20, 40)
  .get();

// [ 
//  2.0320508075688775, -0.48038475772933664, 20,
//  1.4999999999999998, 2.598076211353316, 40,
//  0, 0, 1
// ]
```

The function also accepts a matrix as it's argument. 

- `rotate(a)` : Concatenate a rotation matrix of `a` radians
- `scale(x, y)` : Concatenate a scaling matrix
- `shear(x, y)` : Concatenate a shearing matrix
- `translate(x, y)` : Concatenate a translation matrix
- `add(m)` : Concatenate an arbitrary matrix
- `get()` : Return the resulting matrix

## Tests

Clone the repository, and then run `npm install && npm test`.

## Examples

(all examples assume vec is imported under `vec`)

### Addition

```javascript 
const v1 = [0, 1];
const v2 = [1, 0];
const v3 = vec.add(v1, v2); // [1, 1]
```

### Scaling

```javascript 
const v1 = [0, 1];
const scaler = 10;
const v2 = vec.scale(v1, scaler); // [0, 10]
```

### Normalising

```javascript 
const v1 = [6.32, -23.1];
const v2 = vec.norm(v1); // [0.2638946146581466, -0.9645515187663272]
```

### Magnitude

```javascript 
const v1 = [6.32, -23.1];
const mag = vec.mag(v1); // 23.948954048141644
```


### Matrix Transform

```javascript 
const v1 = [10, 10];

// Inversion matrix
const m = [
  -1, 0,  0
   0, -1, 0,
   0,  0, 1
];
const v2 = vec.transform(v1, m); // [-10, -10]
```

### Computing determinants

```javascript 
const m = [
  10, 0, 0,
  0, 10, 0,
  0,  0, 1
];
const d = vec.det(m); // 100
```

### Composing Matrices

```javascript 
const v = [10, 10];
const m = [
  0, -1, 0,
  -1, 0, 0,
   0, 0, 1
];
const m2 = [
  Math.cos(Math.PI/2), -Math.sin(Math.PI/2), 0,
  Math.sin(Math.PI/2), Math.cos(Math.PI/2)   0,
  0, 0, 1
];
const m3 = vec.composeTransform(m2, m);

const v2 = vec.transform(v1, m1); // is the same as
const v3 = vec.transform(vec.transform(v1, m), m2);
```

## Motivation

 Many linear algebra libraries represent their vectors as object like `{ x, y, mutableMethod, ... }`, which can be cumbersome to work with. Arrays are easier to map, reduce, combine and generally work with symbolically. Additionally, Vec is designed to be used with ES6 and thus the `...` rest syntax, and so can easily and cleanly be supplied to functions expecting `x` and `y` parameters as sequential arguments.
 
 For example: 
 
 `ctx.arc(...point, radius, 0, 2 * Math.PI, false)`;
