import Konva from 'konva';
// first we need to create a stage
const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

// then create layer
const layer = new Konva.Layer();


// create our shape
const circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 3,
  radius: 70,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 5
});

// add the shape to the layer
// Group so the whole lemon moves, scales, and rotates together later.
// The group's x/y is the lemon's center.
const lemon = new Konva.Group({
  x: stage.width() / 2,
  y: stage.height() / 3,
  draggable: true
});

// Lemon body: points are relative to the group's center (0, 0),
// listed clockwise starting from the left tip as [x1, y1, x2, y2, ...]
const body = new Konva.Line({
  points: [
    -120, 0,                  // left tip (pedicel end)
    -100, -10, -80, -30,      // upper left, dipping in to form the bump
    -45, -48, 0, -55, 45, -48,// top curve
    80, -30, 100, -10,        // upper right
    120, 0,                   // right tip (style end)
    100, 10, 80, 30,          // lower right
    45, 48, 0, 55, -45, 48,   // bottom curve
    -80, 30, -100, 10         // lower left
  ],
  closed: true,
  tension: 0.4,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 5
});
const GROWN = 1.1; // 10% bigger

const grow = () => {
  lemon.to({
    scaleX: GROWN,
    scaleY: GROWN,
    duration: 0.1
  });
};

const shrink = () => {
  lemon.to({
    scaleX: 1,
    scaleY: 1,
    duration: 0.1
  });
};

lemon.on('mousedown', grow);
lemon.on('mouseup', shrink);
lemon.on('dragend', shrink);

lemon.on('mouseover', () => {
  stage.container().style.cursor = 'pointer';
});

lemon.on('mouseout', () => {
  stage.container().style.cursor = 'default';
});

lemon.add(body);
layer.add(lemon);

// add the layer to the stage
stage.add(layer);
