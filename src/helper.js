let string = "food: Beef Lasagne\nCalories: 625\nProtein: 38g\nCarbohydrates: 54g\nFat: 29g\nSodium: 1160mg\nSugars: 7g\nServings: 2\nHealth Rating (Out of 5): 3\n\n"

function convertToObj(str) {
  const map = {};
  const lines = str.trim().split('\n');
  lines.forEach(line => {
    const [key, value] = line.split(':').map(part => part.trim());
    map[key] = value;
  });
  return map;
}

let map = convertToObj(string)
console.log(map)