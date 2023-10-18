let groupID = null;
let groupID2 = null;
let dots = [];
let dots2 = [];
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

// -------------------------
let lines2 = [];
let lineLabels2 = [];
let lineNames2 = 
  [
    'Belaya','Kama','Vyatka','Volga','Oka',
    'Sava','Inn','Danube','Tisza',
    'Usa','Pechora',
    'Vychegda','Northern Dvina',
    'Neva','Svir',
    'Rhine',
    'Rhone',
    'Dnieper', 
    'Po',
    'Vistula',
    'Don', 
    'Mezen',
    'Loire',
    'Elbe',
    'Douro'
  ];

let lineLenght2 = [
  0.7,0.8,0.7,1,0.9,
  0.85,0.8,1,0.9,
  0.9,1,
  0.9,1,
  0.9,1,
  1,0.9,
  1,1,1,1,1,
  1,1,1,1,1,
  1,1,1,1,1,
];
let lineGroup2 = [
  1,1,1,1,1,
  2,2,2,2,
  3,3,
  4,4,
  5,5,
  6,6,
  7,
  8,9,10,11,12,13,14
];
let lineHead2 = [
  1,2,-1,0,-1,
  2,1,0,-1,
  1,0, 
  1,0,
  1,0,
  0,0,0,0,
  0,0,0,0,
  0,0
];
let labelVisible2 = [];
let selectedDot2 = null;
let dotNames2 = ['Caspian Sea', 'Black Sea', 'Artic Ocean', 'White Sea', 'Baltic sea', 'North Sea', 'Adriatic Sea', 'Sea of Azov', 'Atlantic Ocean']
let lineDots2 = [
  null,null,null,0,null,
  null,null,1,null,
  null,2,
  null,3,
  null,4,
  5,5,1,6,4,7,3,8,5,8
]
let lineDotsGroup2 = [
  0,0,0,0,0,
  1,1,1,1,
  2,2,3,3,
  4,4,5,5,1,6,4,7,3,8,5,8
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
    lines.push({ y: 200 + i * 30 }); // Adjust spacing as needed
    lineLabels.push(lineNames[i])
    labelVisible.push(false);
  }
  for (let i = 0; i < 8; i++) {
    let x = windowWidth /2 - 50;
    let y = 240 + i * 90;
    dots.push({ x, y });
  }
  for (let i = 0; i < 25; i++) {
    lines2.push({ y: 200 + i * 30 }); // Adjust spacing as needed
    lineLabels2.push(lineNames2[i])
    labelVisible2.push(false);
  }
  for (let i = 0; i < 9; i++) {
    let x = windowWidth - 50;
    let y = 240 + i * 80;
    dots2.push({ x, y });
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
  textSize(36);


  text('Rivers of Europe', windowWidth /2, 100);

  textSize(24);
  text('/ by length', windowWidth * 3/8, 175);
  text('/ by discharge', windowWidth * 7/8, 175);

  //--------------------------------------------

  textSize(14);

  stroke(0, 0, 128); // Set the stroke color to blue (R, G, B)
  groupID = null;

  for (let i = 0; i < lines.length; i++) {
    // Check if the mouse is over the current line
    if (mouseY >= lines[i].y - 10 && mouseY <= lines[i].y + 10 && mouseX < windowWidth /2 ) {
      labelVisible[i] = true;
    } else {
      labelVisible[i] = false;
    }

    
    // Display labels on hover
    if (labelVisible[i]) {
      text(lineLabels[i], 50, lines[i].y - 10);
      groupID = lineGroup[i];
      groupID2 = null;
    }


    if(lineDotsGroup[i] != null && selectedDot == lineDotsGroup[i] && selectedDot != null){
      strokeWeight(3);
      // Draw the horizontal lines
      line(50, lines[i].y, 50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y);
      // Draw the vertical lines
      line(50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y, 50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y + 30*lineHead[i]);
      if(lineDots[i] != null){
        strokeWeight(3)
        line(50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y, dots[lineDots[i]].x - 100, dots[lineDots[i]].y);
        line(dots[lineDots[i]].x - 100, dots[lineDots[i]].y, dots[lineDots[i]].x, dots[lineDots[i]].y);
      }
      strokeWeight(1);
    }
    else {
      // Draw the horizontal lines
      line(50, lines[i].y, 50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y);
      // Draw the vertical lines
      line(50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y, 50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y + 30*lineHead[i]);
      if(lineDots[i] != null){
        line(50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y, dots[lineDots[i]].x - 100, dots[lineDots[i]].y);
        line(dots[lineDots[i]].x - 100, dots[lineDots[i]].y, dots[lineDots[i]].x, dots[lineDots[i]].y);
      }

    }

    if(selectedDot == lineDots[i] && selectedDot != null){
      strokeWeight(3)
      line(50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y, dots[lineDots[i]].x - 100, dots[lineDots[i]].y);
      line(dots[lineDots[i]].x - 100, dots[lineDots[i]].y, dots[lineDots[i]].x, dots[lineDots[i]].y);
      strokeWeight(1)
    }
    
  }

  for (let i = 0; i < lines.length; i++) {

    // Color group elements
    if (lineGroup[i] == groupID) {
      strokeWeight(3);

      line(50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y, 50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y + 30*lineHead[i]);
      line(50, lines[i].y, 50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y);

      if(lineDots[i] != null){

        line(50 + (windowWidth/2 - 300)*lineLenght[i], lines[i].y, dots[lineDots[i]].x - 100, dots[lineDots[i]].y);
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


  //--------------------------------------------

  textSize(14);

  stroke(0, 0, 128); // Set the stroke color to blue (R, G, B)
  groupID2 = null;

  for (let i = 0; i < lines2.length; i++) {
    // Check if the mouse is over the current line
    if (mouseY >= lines2[i].y - 10 && mouseY <= lines2[i].y + 10 && mouseX < windowWidth  && mouseX > windowWidth/2 ) {
      labelVisible2[i] = true;
    } else {
      labelVisible2[i] = false;
    }

    
    // Display labels on hover
    if (labelVisible2[i]) {
      text(lineLabels2[i], windowWidth/2 + 50, lines2[i].y - 10);
      groupID2 = lineGroup2[i];
      groupID = null;
    }


    if(lineDotsGroup2[i] != null && selectedDot2 == lineDotsGroup2[i] && selectedDot2 != null){
      strokeWeight(3);
      // Draw the horizontal lines
      line(windowWidth/2 + 50, lines2[i].y, windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y);
      // Draw the vertical lines
      line(windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y, windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y + 30*lineHead2[i]);
      if(lineDots2[i] != null){
        strokeWeight(3)
        line(windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y, dots2[lineDots2[i]].x - 100, dots2[lineDots2[i]].y);
        line(dots2[lineDots2[i]].x - 100, dots2[lineDots2[i]].y, dots2[lineDots2[i]].x, dots2[lineDots2[i]].y);
      }
      strokeWeight(1);
    }
    else {
      // Draw the horizontal lines
      line(windowWidth/2 + 50, lines2[i].y, windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y);
      // Draw the vertical lines
      line(windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y, windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y + 30*lineHead2[i]);
      if(lineDots2[i] != null){
        line(windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y,  dots2[lineDots2[i]].x - 100, dots2[lineDots2[i]].y);
        line(dots2[lineDots2[i]].x - 100, dots2[lineDots2[i]].y, dots2[lineDots2[i]].x, dots2[lineDots2[i]].y);
      }

    }

    if(selectedDot2 == lineDots2[i] && selectedDot2 != null){
      strokeWeight(3)
      line(windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y, dots2[lineDots2[i]].x - 100, dots2[lineDots2[i]].y);
      line(dots2[lineDots2[i]].x - 100, dots2[lineDots2[i]].y, dots2[lineDots2[i]].x, dots2[lineDots2[i]].y);
      strokeWeight(1)
    }
    
  }

  for (let i = 0; i < lines2.length; i++) {

    // Color group elements
    if (lineGroup2[i] == groupID2) {
      strokeWeight(3);

      line(windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y, windowWidth/2 +50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y + 30*lineHead2[i]);
      line(windowWidth/2 + 50, lines2[i].y, 50 + windowWidth/2 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y);

      if(lineDots2[i] != null){

        line(windowWidth/2 + 50 + (windowWidth/2 - 300)*lineLenght2[i], lines2[i].y, dots2[lineDots2[i]].x - 100, dots2[lineDots2[i]].y);
        line(dots2[lineDots2[i]].x - 100, dots2[lineDots2[i]].y, dots2[lineDots2[i]].x, dots2[lineDots2[i]].y);

      }
      strokeWeight(1)
      
    }

  }

  for (let i = 0; i < dots2.length; i++) {
    stroke(0, 0, 128)
    if(dots2[i].visible){
      text(dotNames2[i], dots2[i].x - 75, dots2[i].y - 20);
 
    }
    fill(0, 0, 128);
    ellipse(dots2[i].x, dots2[i].y, 20);
  }
}

function mousePressed() {
  selectedDot = null
  selectedDot2 = null
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

  //--------------------------------------------

  for (let i = 0; i < dots2.length; i++) {
    let d = dist(mouseX, mouseY, dots2[i].x, dots2[i].y);
    if (d < 10) {
      // Handle click on the dot here
      dots2[i].visible = true;
      selectedDot2 = i;

    }
    else {
      dots2[i].visible = false;

    }

  }
}


function mouseMoved() {
  redraw(); // Redraw the canvas when the mouse moves to update labels
}
