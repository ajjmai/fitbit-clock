import clock from "clock";
import document from "document";
import * as util from "../common/utils";
import { me as appbit } from "appbit";
import { preferences } from "user-settings";
import { goals, today } from "user-activity";
import { user } from "user-profile";
import { battery } from "power";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";

// Update the clock every second
clock.granularity = "seconds";

// Get handles for different elements
const mainHandle = document.getElementById("main");

const timeHandle = document.getElementById("time");
const dateHandle = document.getElementById("date");

const batteryHandle = document.getElementById("battery-indicator");

const hrLabelHandle = document.getElementById("hr-label");
const hrImgHandle = document.getElementById("hr-img");

const stepsHandle = document.getElementById("steps");
const calsHandle = document.getElementById("cals");
const zoneMinsHandle = document.getElementById("zonemins");

const stepsArcHandle = document
  .getElementById("steps")
  .getElementById("stats");
const calsArcHandle = document
  .getElementById("cals")
  .getElementById("stats");
const zoneMinsArcHandle = document
  .getElementById("zonemins")
  .getElementById("stats");

const stepsLabel = document
  .getElementById("steps").getElementById("stats-label");
const calsLabel = document
  .getElementById("cals").getElementById("stats-label");
const zoneMinsLabel = document
  .getElementById("zonemins").getElementById("stats-label");

const stepsToGoalLabel = document
  .getElementById("steps").getElementById("stats-to-goal-label");
const calsToGoalLabel = document
  .getElementById("cals").getElementById("stats-to-goal-label");
const zoneMinsToGoalLabel = document
  .getElementById("zonemins").getElementById("stats-to-goal-label");

const gradientRectHandle = document
.getElementById("gradient");

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const colors = {
  white: "white",
  black: "black",
  green: "#31e981",
  red: "#d90429",
  cals: "#2275b9",
  steps: "#832cc5",
  zonemins: "#02c39a",
  peak: "#d7263d",
  cardio: "#e66227",
  fatBurn: "#ffc501"
}

let tapEventCounter = 0;

// Update elements every tick with the current time
clock.ontick = (evt) => {
  let newDate = evt.date;
  let hours = newDate.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(newDate.getMinutes());
  timeHandle.text = `${hours}:${mins}`;

  let todayDate = newDate.getDate();
  dateHandle.text = `${days[newDate.getDay()]} ${todayDate}`;

  // Update steps
    updateStats(goals.steps, today.adjusted.steps, stepsArcHandle, stepsLabel, stepsToGoalLabel)
  
  // Update calories
    updateStats(goals.calories, today.adjusted.calories, calsArcHandle, calsLabel, calsToGoalLabel)
  
  // Update active zone minutes
    updateStats(goals.activeZoneMinutes.total, today.adjusted.activeZoneMinutes.total, zoneMinsArcHandle, zoneMinsLabel, zoneMinsToGoalLabel)
  
  updateMainView();
  updateHeartRate();
  updateBatteryIndicator();
};

// Update stats
function updateStats(goal, current, arcHandle, label, toGoalLabel) {
    let statsGoal = 0;

    if (appbit.permissions.granted("access_activity")) {
      if (goal) {
        statsGoal = goal;
      }
    }

    let statsValue = current || 0;

    let sweep =
      Math.min(Math.max(statsValue / statsGoal, 0.003), 1) * 360;
    arcHandle.sweepAngle = sweep;

    label.text = statsValue;
    toGoalLabel.text = statsValue - statsGoal;
}

// Change main view on tap
function updateMainView() {
  mainHandle.onmouseup = function (evt) {
    if (tapEventCounter % 3 == 0) {
      // display steps
      calsHandle.style.display = "none";
      stepsHandle.style.display = "inline";
      zoneMinsHandle.style.display = "none";

      gradientRectHandle.gradient.colors.c1 = colors.steps;

    } else if (tapEventCounter % 3 == 1) {
      // display active zone minutes
      calsHandle.style.display = "none";
      stepsHandle.style.display = "none";
      zoneMinsHandle.style.display = "inline";

      gradientRectHandle.gradient.colors.c1 = colors.zonemins;

    } else {
      // display calories
      calsHandle.style.display = "inline";
      stepsHandle.style.display = "none";
      zoneMinsHandle.style.display = "none";

      gradientRectHandle.gradient.colors.c1 = colors.cals;
    }
    tapEventCounter++;
    
    if (tapEventCounter == 3 ) {
      tapEventCounter = 0
    }
  };
}

// Update heartrate 
function updateHeartRate() {
  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
    const hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
      if ( hrm.heartRate && appbit.permissions.granted("access_user_profile") ) {
        let heartRate = hrm.heartRate;
        hrLabelHandle.text = heartRate;

        if ( user.heartRateZone(heartRate) == "out-of-range" ) {
          hrImgHandle.style.fill = colors.white;
          hrLabelHandle.style.fill = colors.black;
        } else if ( user.heartRateZone(heartRate) == "fat-burn" ) {
          hrImgHandle.style.fill = colors.fatBurn;
          hrLabelHandle.style.fill = colors.white;
        } else if  ( user.heartRateZone(heartRate) == "cardio" ) {
          hrImgHandle.style.fill = colors.cardio;
          hrLabelHandle.style.fill = colors.white;
        } else if  ( user.heartRateZone(heartRate) == "peak" ) {
          hrImgHandle.style.fill = colors.peak;
          hrLabelHandle.style.fill = colors.white;
        }
      } else {
        hrLabelHandle.text = "--";
        hrImgHandle.style.fill = colors.white;
        hrLabelHandle.style.fill = colors.black;
      }
    });

    display.addEventListener("change", () => {
      if ( display.on ) {
        hrm.start();
      } else {
        hrm.stop();
      }
    })
    hrm.start();
 }
}

function updateBatteryIndicator() {
  // Update battery indicator
  let batteryChargeLevel = battery.chargeLevel;

  batteryHandle.width = Math.floor(batteryChargeLevel) / 100 * 300;

  if ( batteryChargeLevel < 15 ) {
    batteryHandle.style.fill = colors.red;
  } else if (battery.charging) {
    batteryHandle.style.fill = colors.green;
  } else {
    batteryHandle.style.fill = colors.white;
  }
}
