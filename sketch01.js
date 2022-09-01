const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Color = require('canvas-sketch-util/color');
const risoColors = require ('riso-colors');

const settings = {
  dimensions: [ 1080, 1080 ],
};

const sketch = ({ context, width, height }) => {
  //variables to create a rectangle
  let x, y, w, h, fill, stroke;

  const num = 30; //number of rect
  const degrees = -30;

  const rects = [];

  //random riso-colors
  const rectColors = [random.pick(risoColors),random.pick(risoColors),random.pick(risoColors)];
  
const bgColor = random.pick(risoColors).hex;

  //loop to create random rectangles
  for (let i = 0; i < num; i++) {
    //random position in the canvas
    x = random.range(0, width);
    y = random.range(0, height);
    w = random.range(200, 600);
    h = random.range(40, 200);

    fill = random.pick(rectColors).hex;
    stroke = random.pick(rectColors).hex;

    rects. push({ x, y, w, h, fill, stroke });
  }
  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

  rects.forEach(rect =>{
  const { x, y, w, h, fill, stroke} = rect;
  let shadowColor;

  context.save();
  context.translate(x,y);
  context.strokeStyle = stroke;
  context.fillStyle = fill;
  context.lineWidth = 10;

  //calling function and drawing the rect
  drawSkewedRect({ context, w, h, degrees });

  shadowColor = Color.offsetHSL(fill, 0, 0, -20 );
  shadowColor.rgba[3] = 0.5;

  //shadow effect
  context.shadowColor = Color.style(shadowColor.rgba);
  context.shadowOffsetX = -10;
  context.shadowOffsetY = 20

  context.fill();
  context.shadowColor = null;
  context.stroke();
  

  context.restore();
  });


  };
};

//this function create the rect
const drawSkewedRect = ({ context, w = 600, h = 200, degrees = -45}) => {
    //skewed
    const angle = math.degToRad(degrees);
    const rx = Math.cos(angle) * w;
    const ry = Math.sin(angle) *w;
  

    context.save();
    context.translate(rx * -0.5, (ry + h) * -0.5);
    
    
    //creating the rectangle point by point
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(rx,ry);
    context.lineTo(rx,ry + h);
    context.lineTo(0,h);
    context.closePath();
    context.stroke();

    context.restore();
}

canvasSketch(sketch, settings);
