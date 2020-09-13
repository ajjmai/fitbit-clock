import document from "document";
import { battery } from "power";

import { colors } from "./common.js";

const batteryHandle = document.getElementById("battery-indicator");

export function updateBatteryIndicator() {
  // Update battery indicator
  let batteryChargeLevel = battery.chargeLevel;

  batteryHandle.width = (Math.floor(batteryChargeLevel) / 100) * 300;

  if (batteryChargeLevel < 15) {
    batteryHandle.style.fill = colors.red;
  } else if (battery.charging) {
    batteryHandle.style.fill = colors.green;
  } else {
    batteryHandle.style.fill = colors.white;
  }
}
