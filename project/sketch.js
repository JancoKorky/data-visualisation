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
      undefined,
      undefined,
      250,
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
  countrySelect = new Select(windowWidth/2-150/2, 50, dataFromJson, 150);
  countrySelect.drawSelect();
}
