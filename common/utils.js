// app colors
export const colors = {
  white: "white",
  black: "black",
  green: "#31e981",
  red: "#d90429",
  cals: "#2275b9",
  steps: "#832cc5",
  zonemins: "#02c39a",
  peak: "#d7263d",
  cardio: "#e66227",
  fatBurn: "#ffc501",
};

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
