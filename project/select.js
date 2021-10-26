class Select {
  constructor(positionX, positionY, countries_data, size) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.countries_data = countries_data;
    this.size = size.toString().concat("px");

    this.sel = undefined;
    this.parsed_data = [];
    this.sortData();
  }

  sortData() {
    this.parsed_data = Object.entries(this.countries_data).sort((a, b) => {
      let fa = a[1].country_name.toLowerCase(),
        fb = b[1].country_name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }

  drawSelect() {
    this.sel = createSelect();
    this.sel.position(this.positionX, this.positionY);
    this.sel.style("width", this.size);
    for (const [iterator, data] of this.parsed_data) {
      this.sel.option(data.country_name, iterator);
    }
    this.sel.changed(this.getSelectValue);
  }

  drawTitle() {
    fill(0)
    let title = createP("Choose country:")
    title.style('font-size', '20px');
    title.style('font-weight', 'bold');
    title.style('font-family', 'arial')

    title.position(this.positionX, this.positionY-55)
  }

  getSelectValue() {
    if (this.sel) {
      // console.log(this.sel.value());
      // console.log(this.countries_data[this.sel.value()].country_name);
      return this.sel.value();
    }
  }
}
