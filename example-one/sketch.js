let spriteSheet;
let spriteData;
let animation = [];

//Preloading required resources
function preload() {
  spriteData = loadJSON('backgroundAnim.json');
  spriteSheet = loadImage('backgroundAnim.png');
}

//Setting up the canvas size and taking frame list from the JSON
//Also setting the interval for the portrait/landscape dynamic
//change on the screen as well as the stairs with the corresponding
//orientation
function setup() {
  checkWhichCanvasToDraw();
  let frames = spriteData.textures[0].frames; //Accessing first object inside of the list(textures) inside of JSON file and taking the list of all frames
  portraitImg = loadImage('main-bg-portrait.png');  //Portrait image
  landscapeImg = loadImage('main-bg.png');  //Landscape image
  setInterval(changeBackground, 2000); //Interval for switching between portrait/landscape
  populatingAnimations(frames); //Method for populating the data inside of the animation list which our frame images to present on screen
}

//Drawing the backround with the corresponding bg image
//depending on the orientation
function draw() {
  if (deviceOrientation === 'portrait') { //In case the orientation is portrait we have different positioning on the screen and modulo(%) helps us  not go out of range of our image index
    background(portraitImg);
    image(animation[frameCount % animation.length], 300, 500);
  } else {
    background(landscapeImg);
    image(animation[frameCount % animation.length], 500, 300); //Same thing just for landscape orientation
  }
  frameRate(8);   //Also setting the frame rate of apperiance on the screen
}

//Method that helps us to switch between potrait and landscape periodically
function changeBackground() {
  if (deviceOrientation === 'portrait') {
    deviceOrientation = 'landscape';
    console.log(deviceOrientation);
  } else if (deviceOrientation === 'landscape') {
    deviceOrientation = 'portrait';
    console.log(deviceOrientation);
  }
  let frames = spriteData.textures[0].frames; //Initializing frames so we can pass it as a parameter inside of populatingAnimations() method
  populatingAnimations(frames);
  checkWhichCanvasToDraw(); //Again checking which canvas to draw because the orientation will change dynamically and so will the size of the canvas depending on the orientation
}

//Method that is populating our animation list which we present on the page
function populatingAnimations(frames) {
  animation = [];
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].frame;
    let img = spriteSheet.get(pos.x, pos.y, pos.w, pos.h);

    console.log('Trenutno stanje: ' + deviceOrientation);

    //Checking if orientation is potrait and if JSON frame is for the potrait orientation
    if (deviceOrientation === 'portrait' && frames[i].filename.includes('portrait')) {
      //In that case we add it to the animation to only have animations for the potrait orientation
      animation.push(img);
      //Of course there is no need for the whole expression down here but I wrote it for clarity
      //Add only those frames that are meant to be presented on the landscape orientation
    } else if (deviceOrientation === 'landscape' && frames[i].filename.includes('landscape')) {
      animation.push(img);
    }
    //At this point we will have our list on animations only with frames for portrait or a list with only landscape frames
    // !!!Never mixed togheter!!!
    console.log(animation);
  }
}
//Method that will dynamically create a canvas for the corresponding orientation
function checkWhichCanvasToDraw() {
  if (deviceOrientation === 'portrait') {
    createCanvas(1080, 1920);
  } else {
    createCanvas(1920, 1080);
  }
}

