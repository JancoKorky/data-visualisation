class Slider {
  constructor(positionX, positionY, min, max, size_width, value = 0) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.min = min;
    this.max = max;
    this.value = value;
    this.size_width = size_width;
    this.half_size = size_width / 2;
    this.size_of_slider = this.size_width.toString().concat("px");
    this.newSlider = null;
  }

  drawSlider() {
    let createS = createSlider(this.min, this.max, this.value);
    createS.position(this.positionX - this.half_size, this.positionY);
    createS.style("width", this.size_of_slider);
    this.newSlider = createS;
  }

  getSliderValue() {
    return this.newSlider.value();
  }
}
