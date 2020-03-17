//Since task 2 is rather similar to the first one I will only comment the differences from the first one.

let spriteSheet;
let spriteData;
let animation = [];

function preload() {
  spriteData = loadJSON('star.json');
  spriteSheet = loadImage('star.png');
}

function setup() {
  checkWhichCanvasToDraw();
  //Since JSON is different, we grab frames differently from the first one
  let frames = spriteData.frames;
  console.log(frames);
  portraitImg = loadImage('main-bg-portrait1.png');
  landscapeImg = loadImage('main-bg1.png');
  setInterval(changeBackground, 2000);
  populatingAnimations(frames);
}

function draw() {
  if (deviceOrientation === 'portrait') {
    //Presenting corresponding image for the portrait
    background(portraitImg);
    //In this case we are presenting frames randomly on the screen, in portrait orientation that is between 1080 - 1920.
    image(animation[frameCount % animation.length], Math.random() * 1080, Math.random() * 1920, 500, 500);
  } else {
    //Presenting corresponding image for the landscape
    background(landscapeImg);
    //Here is randomly presented between 1920 - 1080.
    image(animation[frameCount % animation.length], Math.random() * 1920, Math.random() * 1080, 200, 200);
  }
  frameRate(2);   //Rate is slower in this example so we can admire longer these beautiful stars!
}

function changeBackground() {
  if (deviceOrientation === 'portrait') {
    deviceOrientation = 'landscape';
    console.log(deviceOrientation);
  } else if (deviceOrientation === 'landscape') {
    deviceOrientation = 'portrait';
    console.log(deviceOrientation);
  }
  let frames = spriteData.frames;
  populatingAnimations(frames);
  checkWhichCanvasToDraw();
}

function populatingAnimations(frames) {
  animation = [];
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].frame;
    let img = spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    console.log('Trenutno stanje: ' + deviceOrientation);
    //Condition is different in a matter of smallStars
    if (deviceOrientation === 'portrait' && frames[i].filename.includes('smallStars')) {
      animation.push(img);
    } else if (deviceOrientation === 'landscape' && frames[i].filename.includes('zvezdica')) {  //Here only zvezdica frames will be added
      animation.push(img);
    }
    console.log(animation);
  }
}

function checkWhichCanvasToDraw() {
  if (deviceOrientation === 'portrait') {
    createCanvas(1080, 1920);
  } else {
    createCanvas(1920, 1080);
  }
}


