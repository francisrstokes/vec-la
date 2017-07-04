const chai = require('chai');
const expect = chai.expect;
const vec = require('../dist/vec.module.js');

describe('Vec-la', function() {
  it('should add two vectors', () => {
    const v1 = [1,2];
    const v2 = [3,4];
    expect(vec.add(v1, v2)).to.deep.equal([4, 6]);
  });

  it('should subtract two vectors', () => {
    const v1 = [1,2];
    const v2 = [3,4];
    expect(vec.sub(v1, v2)).to.deep.equal([-2, -2]);
  });

  it('should get the magnitude of a vector', () => {
    const v1 = [3,4];
    expect(vec.mag(v1)).to.equal(5);
  });

  it('should normalise a vector', () => {
    const v1 = [3,4];
    expect(vec.norm(v1)).to.deep.equal([3/5, 4/5]);
  });

  it('should scale a vector', () => {
    const v1 = [3,4];
    const sc = 10;
    expect(vec.scale(v1, sc)).to.deep.equal([30, 40]);
  });

  it('should get the normal of a vector', () => {
    const v1 = [0, 1];
    expect(vec.normal(v1)).to.deep.equal([-1, 0]);
  });

  it('should get bet points along a direction vector', () => {
    const v1 = [10, 8];
    const v2 = [12, 20];
    const res1 = vec.towards(v1, v2, 0.25);

    expect(res1).to.deep.equal([10.5, 11]);
  });

  it('should apply a matrix transformation to a vector', () => {
    const v1 = [3,4];
    const m = [
      10, 0, 10,
      0, 10, 10,
      0, 0, 1
    ];

    expect(vec.transform(v1, m)).to.deep.equal([40, 50]);
  });

  it('should compose two matrices', () => {
    const m1 = [
      1, 0, 10,
      0, 1, 10,
      0, 0, 1
    ];
    const m2 = [
      10, 0, -5,
      0, 10, -5,
      0, 0, 1
    ];
    const m3 = vec.composeTransform(m1, m2);
    expect(m3).to.deep.equal([
      10, 0, 5,
      0, 10, 5,
      0, 0, 1
    ]);
  });

  it('should rotate a vector', () => {
    const v1 = [2, 0];
    const angle = Math.PI/2;
    const result = vec.rotate(v1, angle);

    // Remove float point error
    const exactResult = result.map(c => parseFloat(c.toFixed(8)));

    expect(exactResult).to.deep.equal([0, 2]);
  });

  it('should rotate a vector around another vector', () => {
    const v1 = [2, 0];
    const v2 = [4, 0];
    const angle = Math.PI/2;
    const result = vec.rotatePointAround(v2, v1, angle);

    // Remove float point error
    const exactResult = result.map(c => parseFloat(c.toFixed(8)));

    expect(exactResult).to.deep.equal([2, 2]);
  });

  it('should get the middle point of two vectors', () => {
    const v1 = [0, 0];
    const v2 = [10, 0];
    expect(vec.midpoint(v1, v2)).to.deep.equal([5, 0]);
  });

  it('should compute the determinate of a matrix', () => {
    const m = [
      10, 0, 0,
      0, 5, 0,
      0, 0, 1
    ];
    const m2 = [
      1, 2, 0,
      0, 1, 0,
      0, 0, 1
    ];

    // Use a non-trivial matrix
    const m3 = vec.composeTransform(m, m2);

    expect(vec.det(m3)).to.equal(50);
  });

  it('should compute the dot produce of two vectors', () => {
    const v1 = [1, 2];
    const v2 = [4, 5];

    expect(vec.dot(v1, v2)).to.equal(14);
  });
});

describe('Matrix Builder', function() {
  it('should create the default initial matrix and return it on get()', () => {
    const m = vec
      .matrixBuilder()
      .get();

    expect(m).to.deep.equal([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]);
  });

  it('should create a specified matrix and return it on get()', () => {
    const m = vec
      .matrixBuilder([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ])
      .get();

    expect(m).to.deep.equal([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ]);
  });

  it('should correctly add to the existing matrix', () => {
    const m = vec
      .matrixBuilder([
        2, 0, 0,
        0, 2, 0,
        0, 0, 1
      ])
      .add([
        2, 0, 0,
        0, 1, 0,
        0, 0, 1
      ])
      .get();

    expect(m).to.deep.equal([
        4, 0, 0,
        0, 2, 0,
        0, 0, 1
      ]);
  });

  it('should correctly add a translate the existing matrix', () => {
    const m = vec
      .matrixBuilder([
        2, 0, 0,
        0, 2, 0,
        0, 0, 1
      ])
      .translate(30, 40)
      .get();

    expect(m).to.deep.equal([
        2, 0, 30,
        0, 2, 40,
        0, 0, 1
      ]);
  });

  it('should correctly add a scale the existing matrix', () => {
    const m = vec
      .matrixBuilder([
        2, 0, 0,
        0, 3, 0,
        0, 0, 1
      ])
      .scale(2.5, 3)
      .get();

    expect(m).to.deep.equal([
        5, 0, 0,
        0, 9, 0,
        0, 0, 1
      ]);
  });

  it('should correctly add a rotate the existing matrix', () => {
    const m = vec
      .matrixBuilder([
        3, 0, 10,
        0, 2, 20,
        0, 0, 1
      ])
      .rotate(0.5)
      .get();

    const mFixedRounding = m.map(c => parseFloat(c.toFixed(2)));
    expect(mFixedRounding).to.deep.equal([
      2.63, -0.96, -0.81, 
      1.44, 1.76, 22.35, 
      0, 0, 1 
    ]);
  });

  it('should correctly add a shear the existing matrix', () => {
    const m = vec
      .matrixBuilder([
        3, 0, 10,
        0, 2, 20,
        0, 0, 1
      ])
      .shear(0.5, 0.2)
      .get();

    const mFixedRounding = m.map(c => parseFloat(c.toFixed(2)));
    expect(mFixedRounding).to.deep.equal([
      3, 1, 20, 
      0.6, 2, 22, 
      0, 0, 1 
    ]);
  });

  it('should correctly compose multiple operation calls and return it on get()', () => {
    const m = vec
      .matrixBuilder()
      .rotate(0.5)
      .shear(0.1, 0.2)
      .scale(2, 3)
      .translate(30, 40)
      .get();

    const mFixedRounding = m.map(c => parseFloat(c.toFixed(2)));
    expect(mFixedRounding).to.deep.equal([
      1.85, -0.78, 30, 
      1.96, 2.35, 40, 
      0, 0, 1 
    ]);
  });

  it('should allow cloning a builder without modifying the original', () => {
    const mb = vec.matrixBuilder();
    const m2 = mb.translate(10, 10).get();
    const m1 = mb.get();

    expect(m1).to.deep.equal([
      1, 0, 0,
      0, 1, 0, 
      0, 0, 1 
    ]);

    expect(m2).to.deep.equal([
      1, 0, 10,
      0, 1, 10, 
      0, 0, 1 
    ]);
  });
});