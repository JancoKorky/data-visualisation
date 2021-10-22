function roundLeadingNumUp(num) {
  if (String(num).length > 2) {
    var d = Math.pow(10, String(num).length - 1);
    num = Math.ceil(num / d) * d;
  }
  return num;
}

function pushPopulationToArr(data) {
  let newArr = [];
  for (let [index, obj] of Object.entries(data)) {
    newArr.push(obj.population);
  }
  return newArr;
}

function convertNumberToQuarters(number) {
  let half = number / 2;
  let quarter = number / 4;

  return [number, half + quarter, half, quarter, 0];
}