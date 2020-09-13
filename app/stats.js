import document from "document";
import { me as appbit } from "appbit";
import { goals, today } from "user-activity";

import { colors } from "./common.js";

let tapEventCounter = 0;

// Get handles for different elements
const mainHandle = document.getElementById("main");

const stepsHandle = document.getElementById("steps");
const calsHandle = document.getElementById("cals");
const zoneMinsHandle = document.getElementById("zonemins");

const calsArcHandle = document.getElementById("cals").getElementById("stats");
const calsLabel = document.getElementById("cals").getElementById("stats-label");
const calsToGoalLabel = document
  .getElementById("cals")
  .getElementById("stats-to-goal-label");

const stepsArcHandle = document.getElementById("steps").getElementById("stats");
const stepsLabel = document
  .getElementById("steps")
  .getElementById("stats-label");
const stepsToGoalLabel = document
  .getElementById("steps")
  .getElementById("stats-to-goal-label");

const zoneMinsArcHandle = document
  .getElementById("zonemins")
  .getElementById("stats");
const zoneMinsLabel = document
  .getElementById("zonemins")
  .getElementById("stats-label");
const zoneMinsToGoalLabel = document
  .getElementById("zonemins")
  .getElementById("stats-to-goal-label");

const gradientRectHandle = document.getElementById("gradient");

// Set initial values
updateStats(
  goals.calories,
  today.adjusted.calories,
  calsArcHandle,
  calsLabel,
  calsToGoalLabel
);
updateStats(
  goals.steps,
  today.adjusted.steps,
  stepsArcHandle,
  stepsLabel,
  stepsToGoalLabel
);
updateStats(
  goals.activeZoneMinutes.total,
  today.adjusted.activeZoneMinutes.total,
  zoneMinsArcHandle,
  zoneMinsLabel,
  zoneMinsToGoalLabel
);

// Update stats
function updateStats(goal, current, arcHandle, label, toGoalLabel) {
  let statsGoal = 0;

  if (appbit.permissions.granted("access_activity")) {
    if (goal) {
      statsGoal = goal;
    }
  }

  let statsValue = current || 0;

  let sweep = Math.min(Math.max(statsValue / statsGoal, 0.003), 1) * 360;
  arcHandle.sweepAngle = sweep;

  label.text = statsValue;
  toGoalLabel.text = statsValue - statsGoal < 0 ? statsValue - statsGoal : "+" + (statsValue - statsGoal).toString();
}

// Change main view on tap
export function updateMainView() {
  mainHandle.onmouseup = function (evt) {
    if (tapEventCounter % 3 == 0) {
      // Update steps
      updateStats(
        goals.steps,
        today.adjusted.steps,
        stepsArcHandle,
        stepsLabel,
        stepsToGoalLabel
      );

      // display steps
      calsHandle.style.display = "none";
      stepsHandle.style.display = "inline";
      zoneMinsHandle.style.display = "none";

      gradientRectHandle.gradient.colors.c1 = colors.steps;
    } else if (tapEventCounter % 3 == 1) {
      // Update active zone minutes
      updateStats(
        goals.activeZoneMinutes.total,
        today.adjusted.activeZoneMinutes.total,
        zoneMinsArcHandle,
        zoneMinsLabel,
        zoneMinsToGoalLabel
      );
      // display active zone minutes
      calsHandle.style.display = "none";
      stepsHandle.style.display = "none";
      zoneMinsHandle.style.display = "inline";

      gradientRectHandle.gradient.colors.c1 = colors.zonemins;
    } else {
      // Update calories
      updateStats(
        goals.calories,
        today.adjusted.calories,
        calsArcHandle,
        calsLabel,
        calsToGoalLabel
      );

      // display calories
      calsHandle.style.display = "inline";
      stepsHandle.style.display = "none";
      zoneMinsHandle.style.display = "none";

      gradientRectHandle.gradient.colors.c1 = colors.cals;
    }
    tapEventCounter++;

    if (tapEventCounter == 3) {
      tapEventCounter = 0;
    }
  };
}
