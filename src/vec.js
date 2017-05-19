(function () {
  /**
   * Adds two vectors
   * @param {Vector} v
   * @param {Vector} v2
   * @returns {Vector}
   */
  var vAdd = function (v, v2) {
    return [v[0]+v2[0], v[1]+v2[1]];
  };

  /**
   * Subtracts one vector from another
   * @param {Vector} v
   * @param {Vector} v2
   * @returns {Vector}
   */
  var vSub = function (v, v2) {
    return [v[0]-v2[0], v[1]-v2[1]];
  };

  /**
   * Gets the magnitude of a vector
   * @param {Vector} v
   * @returns {Number}
   */
  var vMag = function (v) {
    return Math.sqrt(v[0]*v[0]+v[1]*v[1]);
  };

  /**
   * Gets a normalised vector 
   * @param {Vector} v
   * @returns {Vector}
   */
  var vNorm = function (v) {
    var mag = vMag(v);
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
  var vScale = function (v, sc) {
    return [v[0]*sc, v[1]*sc];
  };

  /**
   * Applys a matrix transformation to a vector
   * @param {Vector} v
   * @param {Matrix} m
   * @returns {Vector}
   */
  var vTransform = function (v, m) {
    return [v[0] * (m[0] + m[1]), v[1] * (m[2] + m[3])];
  };

  /**
   * Rotates a vector around the origin. Shorthand for a rotation matrix
   * @param {Vector} v
   * @param {Number} a
   * @returns {Vector}
   */
  var vRotate = function (v, a) {
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
  var vRotatePointAround = function (v, cp, a) {
    var v2 = vSub(v, cp);
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
  var vMidpoint = function (v, v2) {
    return vScale(vAdd(v, v2), 0.5);
  };

  /**
   * Dot product of two vectors
   * @param {Vector} v
   * @param {Vector} v2
   * @returns {Number}
   */
  var vDot = function (v, v2) {
    return v[0]*v2[0] + v[1]*v2[1];
  };

  /**
   * Determinate of a matrix
   * @param {Matrix} m
   * @returns {Number}
   */
  var vDet = function (m) {
    return m[0]*m[3] - m[1]*m[2];
  };

  /**
   * Polutes the global scope with unnamespaced functions
   */
  var polute = function () {
    window.vAdd = vAdd;
    window.vSub = vSub;
    window.vNorm = vNorm;
    window.vScale = vScale;
    window.vTransform = vTransform;
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
    scale: vScale,
    transform: vTransform,
    rotate: vRotate,
    rotatePointAround: vRotatePointAround,
    midpoint: vMidpoint,
    dot: vDot,
    det: vDet,

    polute: polute
  };
})();