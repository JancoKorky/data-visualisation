class CountryLineGraph {
  constructor(startX = 200, startY = 50, graphWidth = 850, graphHeigth = 400, country, data) {
    this.startX = startX;
    this.startY = startY;
    this.graphWidth = graphWidth;
    this.graphHeigth = graphHeigth;
    this.real_sizeX = graphWidth - startX - 100;
    this.real_sizeY = graphHeigth - startY;
    this.country = country;

    this.data = data.reverse();
    this.data_length = Object.entries(this.data).length;

    this.helperArr = pushPopulationToArr(this.data);
    this.max = this.helperArr.reduce((a, b) => Math.max(a, b));
    this.roundLeadUp = roundLeadingNumUp(this.max);
    this.arrOfAxis = convertNumberToQuarters(this.roundLeadUp);
    this.angle = 0;
  }

  drawEllipses() {
    noStroke();

    for (let i = 0; i < this.data_length; i++) {
      let x = i * (this.real_sizeX / (this.data_length - 1)) + this.startX + 25;
      let y = this.graphHeigth - map(this.helperArr[i], 0, this.roundLeadUp, 0, this.graphHeigth - this.startY - 30);
      if (this.yearIsMoreThen2015(this.data[i].year)) {
        fill(150, 0, 0);
      }
      ellipse(x, y, 7);
    }
  }

  drawLines() {
    stroke(150);

    let px = 0;
    let py = 0;

    for (let i = 0; i < this.data_length; i++) {
      let x = i * (this.real_sizeX / (this.data_length - 1)) + this.startX + 25;
      let y = this.graphHeigth - map(this.helperArr[i], 0, this.roundLeadUp, 0, this.graphHeigth - this.startY - 30);
      if (i > 0) {
        if (this.yearIsMoreThen2015(this.data[i].year, false)) {
          stroke(150, 0, 0, 125);
        }
        line(px, py, x, y);
      }
      //store the last position
      px = x;
      py = y;
    }
  }

  drawCountryName() {
    this.setupBeforeWritingText(25);
    text(this.country + " population", width / 2, this.startY - 20);
  }

  drawAxis() {
    stroke(TEXT_COLOR);
    line(this.startX, this.startY, this.startX, this.graphHeigth + 5);
    line(this.startX - 5, this.graphHeigth, this.graphWidth, this.graphHeigth);
  }

  drawYears() {
    this.setupBeforeWritingText();

    for (let i = 0; i < this.data_length; i++) {
      let x = i * (this.real_sizeX / (this.data_length - 1)) + this.startX + 25;
      if (this.yearIsMoreThen2015(this.data[i].year)) {
        fill(150, 0, 0);
      }
      text(this.data[i].year, x, this.graphHeigth + 25);
      stroke(TEXT_COLOR);
      if (this.yearIsMoreThen2015(this.data[i].year)) {
        stroke(150, 0, 0);
      }
      line(x, this.graphHeigth + 5, x, this.graphHeigth - 5);
      noStroke();
    }

    textSize(14);
    text("each year", this.startX + this.graphWidth / 1.45, this.graphHeigth + 50);
    fill(TEXT_COLOR);
    text("each 5 years until 2015", this.startX + this.graphWidth / 4, this.graphHeigth + 50);
  }

  drawPopulation() {
    this.setupBeforeWritingText();
    textAlign(RIGHT);

    let yPos = this.graphHeigth - this.startY - 30;

    for (let i = 0; i < this.arrOfAxis.length; i++) {
      // let y = i * (yPos / (this.arrOfAxis.length - 1)) + this.startY + 25;
      let y = i * (yPos / (this.arrOfAxis.length - 1)) + this.startY + 33;
      text(this.arrOfAxis[i].toLocaleString().replaceAll(",", " "), this.startX - 15, y);

      stroke(TEXT_COLOR);

      if (i != this.arrOfAxis.length - 1) {
        line(this.startX - 5, y - 3, this.startX + 5, y - 3);
        stroke(0, 50);
        line(this.startX + 6, y - 3, this.graphWidth, y - 3);
      }

      noStroke();
    }
    push();
    angleMode(DEGREES);
    textSize(14);

    translate(this.startX - 80, this.startX + this.graphHeigth / 2);
    rotate(270);
    text("Population", 25, 0);

    pop();
  }

  yearIsMoreThen2015(data, equal = true) {
    if (data > 2016) {
      return true;
    } else if (data >= 2016 && equal) {
      return true;
    }
    return false;
  }

  setupBeforeWritingText(size = 10) {
    fill(TEXT_COLOR);
    textStyle(NORMAL);
    textAlign(CENTER);
    textSize(size);
    noStroke();
  }
}
