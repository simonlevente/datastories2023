let groupID = null;
let dots = [];
let showInfoBox = true;
let lines = [];
let lineLabels = [];
let lineNames = 
  [
    'Belaya','Kama','Volga','Oka',
    'Sava','Danube','Prut','Tisza',
    'Ural',
    'Desna','Dnieper', 
    'Don', 'Donets',
    'Pechora','Dniester','Rhine','Elbe',
    'Vistula','Tagus','Daugava','Loire',
    'Ebro','Neman','Meuse','Kuban'
  ];

let lineLenght = [0.8,0.9,1,0.9,0.9,1,0.85,0.9,1,0.9,1,1,0.9,1,1,1,1,1,1,1,1,1,1,1,1,1];
let lineGroup = [
  1,1,1,1,
  2,2,2,2,
  3,  
  4,4,
  5,5,
  6,7,8,9,
  10,11,12,13,
  14,15,16,17
];
let lineHead = [
  1,1,0,-1,
  1,0,-1,-2,
  0,  
  1,0,
  0,-1,
  0,0,0,0,
  0,0,0,0,
  0,0,0,0
];
let labelVisible = [];
let selectedDot = null;
let dotNames = ['Caspian Sea', 'Black Sea', 'Sea of Azov', 'Artic Ocean', 'North Sea', 'Baltic sea', 'Mediterrean Sea', 'Atlantic Ocean']
let lineDots = [
  null,null,0,null,
  null,1,null,null,
  0,null,1,2,
  null,3,1,4,4,
  5,7,5,7,
  6,5,4,2
]
let lineDotsGroup = [
  0,0,0,0,
  1,1,1,1,
  0,1,1,2,
  2,3,1,4,4,
  5,7,5,7,
  6,5,4,2
]


function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createImg('info.png');
  button.position(windowWidth -30, 10);
  button.mousePressed(showInfo);

  background(220); // Set the background to a light gray color
  strokeWeight(1); // Set the stroke weight (line thickness) to 2 pixels
  
  // Initialize line positions and labels
  for (let i = 0; i < 25; i++) {
    lines.push({ y: 150 + i * 30 }); // Adjust spacing as needed
    lineLabels.push(lineNames[i])
    labelVisible.push(false);
  }
  for (let i = 0; i < 8; i++) {
    let x = windowWidth - 50;
    let y = 180 + i * 90;
    dots.push({ x, y });
  }
}

function showInfo() {
  showInfoBox = !showInfoBox;
}

function draw() {

  background(220); // Set the background to a light gray color

  fill(245)
  if(showInfoBox){
    rect(windowWidth - 290, 20, 255, 125, 20);

    textSize(14);
    fill(0)
    textAlign(LEFT, LEFT);
    text('Legend:', windowWidth -270, 50);
    text('    ⬅ hover on the lines', windowWidth -270, 74);
    text('    ⮕ click on the dots', windowWidth -270, 96);
    text('Made with ♥ by Levente Simon', windowWidth -270, 125);

  }
  fill(0,0,128)
  textAlign(CENTER, CENTER);
  textSize(32);


  text('Rivers of Europe / by length', windowWidth /2, 100);

  textSize(14);

  stroke(0, 0, 128); // Set the stroke color to blue (R, G, B)
  groupID = null;

  for (let i = 0; i < lines.length; i++) {
    // Check if the mouse is over the current line
    if (mouseY >= lines[i].y - 10 && mouseY <= lines[i].y + 10 && mouseX < windowWidth - 400) {
      labelVisible[i] = true;
    } else {
      labelVisible[i] = false;
    }

    
    // Display labels on hover
    if (labelVisible[i]) {
      text(lineLabels[i], 50, lines[i].y - 10);
      groupID = lineGroup[i];
    }


    if(lineDotsGroup[i] != null && selectedDot == lineDotsGroup[i] && selectedDot != null){
      strokeWeight(3);
      // Draw the horizontal lines
      line(50, lines[i].y, 50 + (windowWidth - 400)*lineLenght[i], lines[i].y);
      // Draw the vertical lines
      line(50 + (windowWidth - 400)*lineLenght[i], lines[i].y, 50 + (windowWidth - 400)*lineLenght[i], lines[i].y + 30*lineHead[i]);
      if(lineDots[i] != null){
        line(50 + (windowWidth - 400)*lineLenght[i], lines[i].y, dots[lineDots[i]].x - 100, dots[lineDots[i]].y);
        line(dots[lineDots[i]].x - 100, dots[lineDots[i]].y, dots[lineDots[i]].x, dots[lineDots[i]].y);
      }
      strokeWeight(1);
    }
    else {
      // Draw the horizontal lines
      line(50, lines[i].y, 50 + (windowWidth - 400)*lineLenght[i], lines[i].y);
      // Draw the vertical lines
      line(50 + (windowWidth - 400)*lineLenght[i], lines[i].y, 50 + (windowWidth - 400)*lineLenght[i], lines[i].y + 30*lineHead[i]);
      if(lineDots[i] != null){
        line(50 + (windowWidth - 400)*lineLenght[i], lines[i].y, dots[lineDots[i]].x - 100, dots[lineDots[i]].y);
        line(dots[lineDots[i]].x - 100, dots[lineDots[i]].y, dots[lineDots[i]].x, dots[lineDots[i]].y);
      }

    }

    if(selectedDot == lineDots[i] && selectedDot != null){
      strokeWeight(3)
      line(50 + (windowWidth - 400)*lineLenght[i], lines[i].y, dots[lineDots[i]].x - 100, dots[lineDots[i]].y);
      line(dots[lineDots[i]].x - 100, dots[lineDots[i]].y, dots[lineDots[i]].x, dots[lineDots[i]].y);
      strokeWeight(1)
    }
    
  }

  for (let i = 0; i < lines.length; i++) {

    // Color group elements
    if (lineGroup[i] == groupID) {
      strokeWeight(3);

      line(50 + (windowWidth - 400)*lineLenght[i], lines[i].y, 50 + (windowWidth - 400)*lineLenght[i], lines[i].y + 30*lineHead[i]);
      line(50, lines[i].y, 50 + (windowWidth - 400)*lineLenght[i], lines[i].y);

      if(lineDots[i] != null){

        line(50 + (windowWidth - 400)*lineLenght[i], lines[i].y, dots[lineDots[i]].x - 100, dots[lineDots[i]].y);
        line(dots[lineDots[i]].x - 100, dots[lineDots[i]].y, dots[lineDots[i]].x, dots[lineDots[i]].y);

      }
      strokeWeight(1)
      
    }

  }
  
  for (let i = 0; i < dots.length; i++) {
    stroke(0, 0, 128)
    if(dots[i].visible){
      text(dotNames[i], dots[i].x - 75, dots[i].y - 20);
 
    }
    fill(0, 0, 128);
    ellipse(dots[i].x, dots[i].y, 20);
  }

}

function mousePressed() {
  selectedDot = null
  for (let i = 0; i < dots.length; i++) {
    let d = dist(mouseX, mouseY, dots[i].x, dots[i].y);
    if (d < 10) {
      // Handle click on the dot here
      dots[i].visible = true;
      selectedDot = i;

    }
    else {
      dots[i].visible = false;

    }

  }
}


function mouseMoved() {
  redraw(); // Redraw the canvas when the mouse moves to update labels
}
