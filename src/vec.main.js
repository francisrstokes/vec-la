/**
 * Adds two vectors
 * @param {Vector} v
 * @param {Vector} v2
 * @returns {Vector}
 */
const vAdd = (v, v2) => [v[0]+v2[0], v[1]+v2[1]];

/**
 * Subtracts one vector from another
 * @param {Vector} v
 * @param {Vector} v2
 * @returns {Vector}
 */
const vSub = (v, v2) => [v[0]-v2[0], v[1]-v2[1]];

/**
 * Gets the magnitude of a vector
 * @param {Vector} v
 * @returns {Number}
 */
const vMag = (v) => Math.sqrt(v[0]*v[0]+v[1]*v[1]);

/**
 * Gets the normal of a vector
 * @param {Vector} v
 * @returns {Vector}
 */
const vNormal = (v) => [-v[1], v[0]];

/**
 * Gets a point along the direction formed from v2 - v1.
 * t represents a normalised percentage [0, 1] such that vTowards(v1, v2, 0) === v1 and vTowards(v1, v2, 1) === v2
 * @param {Vector} v1
 * @param {Vector} v2
 * @param {Number} t
 * @returns {Vector}
 */
const vTowards = (v1, v2, t) => {
  const d = vSub(v2, v1);
  const m = vMag(d);
  return vAdd(v1, vScale(vNorm(d), t*m));
};

/**
 * Gets a normalised vector
 * @param {Vector} v
 * @returns {Vector}
 */
const vNorm = (v) => {
  const mag = vMag(v);
  return [
    v[0] / mag,
    v[1] / mag
  ];
};

/**
 * Gets a scaled vector
 * @param {Vector} v
 * @param {Number} sc
 * @returns {Vector}
 */
const vScale = (v, sc) => [v[0]*sc, v[1]*sc];

/**
 * Creates an 2x3 Matrix
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 * @returns {Matrix}
 */
const vCreateMatrix = (a=1, b=0, c=0, d=1, tx=0, ty=0) =>[
  a, c, tx,
  b, d, ty,
  0, 0, 1
];

/**
 * Applys a matrix transformation to a vector
 * @param {Vector} v
 * @param {Matrix} m
 * @returns {Vector}
 */
const vTransform = (v, m) => [
  v[0]*m[0] + v[1]*m[1] + m[2],
  v[0]*m[3] + v[1]*m[4] + m[5]
];

/**
 * Functional: Curried vTransform
 * @param {Vector} v
 * @param {Matrix} m
 * @returns {Vector}
 */
const vfTransform = (m) => (v) => vTransform(v, m);

/**
 * Compose two tranformations
 * @param {Matrix} m
 * @param {Matrix} m2
 * @returns {Matrix}
 */
const vComposeTransform = (m, m2) => [
  m[0]*m2[0] + m[1]*m2[3] + m[2]*m2[6],   m[0]*m2[1] + m[1]*m2[4] + m[2]*m2[7],    m[0]*m2[2] + m[1]*m2[5] + m[2]*m2[8],
  m[3]*m2[0] + m[4]*m2[3] + m[5]*m2[6],   m[3]*m2[1] + m[4]*m2[4] + m[5]*m2[7],    m[3]*m2[2] + m[4]*m2[5] + m[5]*m2[8],
  m[6]*m2[0] + m[7]*m2[3] + m[8]*m2[6],   m[6]*m2[1] + m[7]*m2[4] + m[8]*m2[7],    m[6]*m2[2] + m[7]*m2[5] + m[8]*m2[8]
];

/**
 * Rotates a vector around the origin. Shorthand for a rotation matrix
 * @param {Vector} v
 * @param {Number} a
 * @returns {Vector}
 */
const vRotate = (v, a) => [
  v[0] * Math.cos(a) - v[1] * Math.sin(a),
  v[0] * Math.sin(a) + v[1] * Math.cos(a)
];

/**
 * Rotates a vector around a given point.
 * @param {Vector} v
 * @param {Vector} cp
 * @param {Number} a
 * @returns {Vector}
 */
const vRotatePointAround = (v, cp, a) => {
  const v2 = vSub(v, cp);
  return vAdd(cp, [
    v2[0] * Math.cos(a) - v2[1] * Math.sin(a),
    v2[0] * Math.sin(a) + v2[1] * Math.cos(a)
  ]);
};

/**
 * Gets the equidistant point between two vectors
 * @param {Vector} v
 * @param {Vector} v2
 * @returns {Vector}
 */
const vMidpoint = (v, v2) => vScale(vAdd(v, v2), 0.5);

/**
 * Gets the vector r units along the angle a from vector v
 * @param {Vector} v
 * @param {Number} a
 * @param {Number} r
 * @returns {Vector}
 */
const vAlongAngle = (v, a, r) => [
  v[0] + Math.cos(a) * r,
  v[1] + Math.sin(a) * r
];

/**
 * Gets the distance between two vectors
 * @param {Vector} v
 * @param {Vector} v2
 * @returns {Number}
 */
const vDist = (v, v2) => Math.sqrt(
  Math.pow(v2[0] - v[0], 2) + Math.pow(v2[1] - v[1], 2)
);

/**
 * Dot product of two vectors
 * @param {Vector} v
 * @param {Vector} v2
 * @returns {Number}
 */
const vDot = (v, v2) => v[0]*v2[0] + v[1]*v2[1];

/**
 * Determinate of a matrix
 * @param {Matrix} m
 * @returns {Number}
 */
const vDet = (m) => m[0]*m[4] - m[3]*m[1];

/**
 * Returns a builder object for easily composing matrices. Exposes
 * useful helper functions for general matrix operations:
 * translate, scale, rotate, shear
 * as a generic add function that accepts a matrix.
 * Calling get returns the matrix.
 * @param {Matrix} m
 */
const vMatrixBuilder = (m = null) => {
  const _m = m || vCreateMatrix();
  return {
    add: (m) => vMatrixBuilder(vComposeTransform(m, _m)),
    translate: (x, y) =>
      vMatrixBuilder(vComposeTransform([
        1, 0, x,
        0, 1, y,
        0, 0, 1
      ], _m)),
    rotate: (a) =>
      vMatrixBuilder(vComposeTransform([
        Math.cos(a), -Math.sin(a), 0,
        Math.sin(a), Math.cos(a), 0,
        0, 0, 1
      ], _m)),
    scale: (x, y) =>
      vMatrixBuilder(vComposeTransform([
        x, 0, 0,
        0, y, 0,
        0, 0, 1
      ], _m)),
    shear: (x, y) =>
      vMatrixBuilder(vComposeTransform([
        1, x, 0,
        y, 1, 0,
        0, 0, 1
      ], _m)),
    get: () => [..._m]
  };
};

/* start window exports */
/**
 * Polutes the global scope with unnamespaced functions
 */
const polute = function () {
  window.vAdd = vAdd;
  window.vSub = vSub;
  window.vNorm = vNorm;
  window.vScale = vScale;
  window.vAlongAngle = vAlongAngle;
  window.vMag = vMag;
  window.vTransform = vTransform;
  window.vfTransform = vfTransform;
  window.vTowards = vTowards;
  window.vNormal = vNormal;
  window.vComposeTransform = vComposeTransform;
  window.vRotate = vRotate;
  window.vRotatePointAround = vRotatePointAround;
  window.vMidpoint = vMidpoint;
  window.vDot = vDot;
  window.vDet = vDet;
  window.vDist = vDist;
  window.vMatrixBuilder = vMatrixBuilder;
}

/**
 * Exposed API
 */
window.vec = {
  add: vAdd,
  alongAngle: vAlongAngle,
  sub: vSub,
  norm: vNorm,
  mag: vMag,
  scale: vScale,
  fTransform: vfTransform,
  transform: vTransform,
  createMatrix: vCreateMatrix,
  composeTransform: vComposeTransform,
  normal: vNormal,
  towards: vTowards,
  rotate: vRotate,
  rotatePointAround: vRotatePointAround,
  midpoint: vMidpoint,
  dot: vDot,
  det: vDet,
  dist: vDist,
  matrixBuilder: vMatrixBuilder,

  polute: polute
};
/* end window exports */

/* start exports */
  export { vAdd as add };
  export { vAlongAngle as alongAngle };
  export { vSub as sub };
  export { vNorm as norm };
  export { vMag as mag };
  export { vScale as scale };
  export { vNormal as normal };
  export { vTowards as towards };
  export { vfTransform as fTransform };
  export { vTransform as transform };
  export { vComposeTransform as composeTransform };
  export { vMatrixBuilder as matrixBuilder };
  export { vCreateMatrix as createMatrix };
  export { vRotate as rotate };
  export { vRotatePointAround as rotatePointAround };
  export { vMidpoint as midpoint };
  export { vDot as dot };
  export { vDet as det };
  export { vDist as dist };
/* end exports */
