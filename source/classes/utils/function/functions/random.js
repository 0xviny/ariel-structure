export default async function random(num1, num2, parsed = false) {
  let value = Math.random() * (num1 - num2) + num2;
  if (parsed) return parseInt(value);
  else return value;
}
