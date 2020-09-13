import clock from "clock";
import { display } from "display";

import * as hr from "./hr.js";
import * as battery from "./battery.js";
import * as time from "./time.js";
import * as stats from "./stats.js";

// Update the clock every second
clock.granularity = "seconds";

display.onchange = changeState();

// Update elements every tick with the current time
clock.ontick = (evt) => {
  let newDate = evt.date;
  time.updateTime(newDate);
  stats.updateMainView();
  hr.updateHeartRate();
  battery.updateBatteryIndicator();
};

function changeState() {
  if (display.on) {
    hr.hrm.start();
    hr.hrHandle.style.display = "inline";
  } else {
    hr.hrm.stop();
    hr.hrHandle.style.display = "none";
  }
}
