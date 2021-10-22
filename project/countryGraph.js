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
  }

  drawEllipses() {
    noStroke();

    for (let i = 0; i < this.data_length; i++) {
      let x = i * (this.real_sizeX / (this.data_length - 1)) + this.startX + 25;
      let y = this.graphHeigth - map(this.helperArr[i], 0, this.roundLeadUp, 0, this.graphHeigth - this.startY - 30);
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
        line(px, py, x, y);
      }
      //store the last position
      px = x;
      py = y;
    }
  }

  drawCountryName() {
    this.setupBeforeWritingText(60);
    text(this.country, width / 2, this.graphHeigth + 100);
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
      text(this.data[i].year, x, this.graphHeigth + 25);
      stroke(TEXT_COLOR);
      line(x, this.graphHeigth + 5, x, this.graphHeigth - 5);
      noStroke();
    }
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
  }

  setupBeforeWritingText(size = 10) {
    fill(TEXT_COLOR);
    textStyle(NORMAL);
    textAlign(CENTER);
    textSize(size);
    noStroke();
  }
}
