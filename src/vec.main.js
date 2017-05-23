/**
 * Adds two vectors
 * @param {Vector} v
 * @param {Vector} v2
 * @returns {Vector}
 */
const vAdd = function (v, v2) {
  return [v[0]+v2[0], v[1]+v2[1]];
};

/**
 * Subtracts one vector from another
 * @param {Vector} v
 * @param {Vector} v2
 * @returns {Vector}
 */
const vSub = function (v, v2) {
  return [v[0]-v2[0], v[1]-v2[1]];
};

/**
 * Gets the magnitude of a vector
 * @param {Vector} v
 * @returns {Number}
 */
const vMag = function (v) {
  return Math.sqrt(v[0]*v[0]+v[1]*v[1]);
};

/**
 * Gets a normalised vector 
 * @param {Vector} v
 * @returns {Vector}
 */
const vNorm = function (v) {
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
const vScale = function (v, sc) {
  return [v[0]*sc, v[1]*sc];
};

/**
 * Applys a matrix transformation to a vector
 * @param {Vector} v
 * @param {Matrix} m
 * @returns {Vector}
 */
const vTransform = function (v, m) {
  return [v[0] * (m[0] + m[1]), v[1] * (m[2] + m[3])];
};

/**
 * Rotates a vector around the origin. Shorthand for a rotation matrix
 * @param {Vector} v
 * @param {Number} a
 * @returns {Vector}
 */
const vRotate = function (v, a) {
  return [
    v[0] * Math.cos(a) - v[1] * Math.sin(a),
    v[0] * Math.sin(a) + v[1] * Math.cos(a)
  ];
};

/**
 * Rotates a vector around a given point.
 * @param {Vector} v
 * @param {Vector} cp
 * @param {Number} a
 * @returns {Vector}
 */
const vRotatePointAround = function (v, cp, a) {
  const v2 = vSub(v, cp);
  return this.add(cp, [
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
const vMidpoint = function (v, v2) {
  return vScale(vAdd(v, v2), 0.5);
};

/**
 * Dot product of two vectors
 * @param {Vector} v
 * @param {Vector} v2
 * @returns {Number}
 */
const vDot = function (v, v2) {
  return v[0]*v2[0] + v[1]*v2[1];
};

/**
 * Determinate of a matrix
 * @param {Matrix} m
 * @returns {Number}
 */
const vDet = function (m) {
  return m[0]*m[3] - m[1]*m[2];
};

/**
 * Compose two tranformations
 * @param {Matrix} m
 * @param {Matrix} m2
 * @returns {Matrix}
 */
const vComposeTransform = function (m, m2) {
  return [
    m[0]*m2[0] + m[1]*m2[2], m[0]*m2[1] + m[1]*m2[3],
    m[2]*m2[0] + m[3]*m2[2], m[3]*m2[1] + m[3]*m1[3]
  ];
}

/* start window exports */
/**
 * Polutes the global scope with unnamespaced functions
 */
const polute = function () {
  window.vAdd = vAdd;
  window.vSub = vSub;
  window.vNorm = vNorm;
  window.vScale = vScale;
  window.vMag = vMag;
  window.vTransform = vTransform;
  window.vComposeTransform = vComposeTransform;
  window.vRotate = vRotate;
  window.vRotatePointAround = vRotatePointAround;
  window.vMidpoint = vMidpoint;
  window.vDot = vDot;
  window.vDet = vDet;
}

/**
 * Exposed API
 */
window.vec = {
  add: vAdd,
  sub: vSub,
  norm: vNorm,
  mag: vMag,
  scale: vScale,
  transform: vTransform,
  composeTransform: vComposeTransform,
  rotate: vRotate,
  rotatePointAround: vRotatePointAround,
  midpoint: vMidpoint,
  dot: vDot,
  det: vDet,

  polute: polute
};
/* end window exports */

/* start exports */
  export { vAdd as add };
  export { vSub as sub };
  export { vNorm as norm };
  export { vMag as mag };
  export { vScale as scale };
  export { vTransform as transform };
  export { vComposeTransform as composeTransform };
  export { vRotate as rotate };
  export { vRotatePointAround as rotatePointAround };
  export { vMidpoint as midpoint };
  export { vDot as dot };
  export { vDet as det };
/* end exports */
