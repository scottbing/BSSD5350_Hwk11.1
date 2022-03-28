let planeBounds = 2;

function setup() {
  createCanvas(400, 400);
  noLoop;
}

function draw() {
  background(120);
  let pink = color(255, 102, 204);
  colorMode(HSB, 360, 1, 1, 255);
  let truePink = pink;
  pixelDensity(1);
  loadPixels();
  
  let r = width/4;
  let cx = width/2;
  let cy = height/2;
  
  for (let y = 0; y < height; y++) {                             
    for (let x = 0; x < width; x++) {
     let xfrac = map(x, 0, width, -planeBounds, planeBounds); 
     let yfrac = map(y, 0, height, -planeBounds, planeBounds); 
     let i = (x + y * width) * 4;
     let inf = 16;
     let maxlter = 100;
     let n = 0;

     //begin mandelbrot formula
     let a = xfrac;
     let b = yfrac;
     for (n = 0; n < maxlter; n++) { 
        let aa = sq(a) - sq(b);
        let bb = 2 * a * b;
        a = aa + xfrac;
        b = bb + yfrac;
        if (abs(a + b) > inf) { //Pink is not part of the set.
           pixels[i] = red(truePink);
           pixels[i + 1] = green(truePink); 
           pixels[i + 2] = blue(truePink); 
           pixels[i + 3] = alpha(truePink); 
           break; //stop counting toward max iterations. not part of set.}
        }
      }  
      if (n == maxlter) { //blue is part of the set.
      pixels[i] = 0;
      pixels[i + 1] = green(truePink); 
      pixels[i + 2] = blue(truePink); 
      pixels[i + 3] = alpha(truePink);
      }
    }
 }
 updatePixels();
}

function mouseClicked(){
  planeBounds -=0.5;
  draw();  //because there is noLoop, we call draw.
}
