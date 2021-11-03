let dataFromJson;
let arrOfGraphs = [];
// let countrySlider;
let countrySelect;
let parsed_dataFromJson;
const TEXT_COLOR = 0;
const BACKGROUND_COLOR = 255;

function preload() {
  dataFromJson = loadJSON("data.json");
}

function setup() {
  textSize(15);
  createCanvas(900, 600);
  // createCountrySlider();
  createCountrySelect();
  createGraphs();
}

function draw() {
  background(BACKGROUND_COLOR);

  if (countrySelect) {
    //   arrOfBars[countrySlider.getSliderValue()].draw_mulltiple_bars();
    drawGraphOfCountry(countrySelect.getSelectValue());
  }
  drawTitle();
}

function drawTitle() {
  fill(TEXT_COLOR);
  textSize(35);
  textAlign(CENTER);
  text("Graph to show population by country from 50s", width / 2, 75);
}

function drawGraphOfCountry(numFromArr) {
  arrOfGraphs[numFromArr].drawCountryName();
  arrOfGraphs[numFromArr].drawAxis();
  arrOfGraphs[numFromArr].drawYears();
  arrOfGraphs[numFromArr].drawPopulation();
  arrOfGraphs[numFromArr].drawLines();
  arrOfGraphs[numFromArr].drawEllipses();
}

function createGraphs() {
  for (let [index, oneObject] of Object.entries(dataFromJson)) {
    arrOfGraphs[index] = new CountryLineGraph(
      100,
      150,
      undefined,
      350,
      oneObject.country_name,
      oneObject.country_data
    );
  }
}

function createCountrySlider() {
  let dataLen = Object.entries(dataFromJson);

  countrySlider = new Slider(windowWidth / 2, windowHeight / 2 + 75, 0, dataLen - 1, 800);
  countrySlider.drawSlider();
}

function createCountrySelect() {
  countrySelect = new Select(windowWidth / 5 - 150 / 2, 200, dataFromJson, 150);
  countrySelect.drawSelect();
  countrySelect.drawTitle();
}
