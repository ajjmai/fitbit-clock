import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import userActivity from "user-activity";
import { me as appbit } from "appbit";
import { goals } from "user-activity";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const timeHandle = document.getElementById("time");
const dateHandle = document.getElementById("date");

// const stepsHandle = document.getElementById("steps").getElementsByClassName("stats-value");
// const calsHandle = document.getElementById("cals").getElementsByClassName("stats-value");
// const zoneMinsHandle = document.getElementById("zonemins").getElementsByClassName("stats-value");

// const mainHandle = document.getElementById("main");

// const stepsImg = document.getElementById("steps-img");
// const calsImg = document.getElementById("cals-img");
// const zoneMinsImg = document.getElementById("zonemins-img");

// const stepsLabel = document.getElementById("steps-label");
// const calsLabel = document.getElementById("cals-label");
// const zoneMinsLabel = document.getElementById("zonemins-label");

// const stepsToGoalLabel = document.getElementById("steps-to-goal-label");
// const calsToGoalLabel = document.getElementById("cals-to-goal-label");
// const zoneMinsToGoalLabel = document.getElementById("zonemins-to-goal-label");

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let touchEventCounter = 0;


// Update elements every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  timeHandle.text = `${hours}:${mins}`;
  
  
  const todayDate = today.getDate();
  dateHandle.text = `${days[today.getDay()]} ${todayDate}`
  
  // Update steps

  // let stepsGoal = 0;

  // if (appbit.permissions.granted("access_activity")) {
  //   if (goals.steps) {
  //     stepsGoal = goals.steps;
  //   }
  // }

  // let stepsValue = (userActivity.today.adjusted["steps"] || 0);
  // stepsHandle.forEach(function(element) {
  //   let sweep = Math.min(Math.max(stepsValue / stepsGoal, 0.01), 1) * 120;
  //   element.sweepAngle = sweep;
  // });
  
  // // Update calories

  // let calsGoal = 0;

  // if (appbit.permissions.granted("access_activity")) {
  //   if (goals.calories) {
  //     calsGoal = goals.calories;
  //   }
  // }

  // let calsValue = (userActivity.today.adjusted["calories"] || 0);
  // calsHandle.forEach(function(element) {
  //   let sweep = Math.min(Math.max(calsValue / calsGoal, 0.01), 1) * 120;
  //   element.sweepAngle = sweep;
  // });
  
  // // Update active zone minutes -- change to active zone minutes when available

  // let zoneGoal = 0;

  // if (appbit.permissions.granted("access_activity")) {
  //   if (goals.calories) {
  //     zoneGoal = goals.activeMinutes;
  //   }
  // }

  // let zoneValue = (userActivity.today.adjusted["activeMinutes"] || 0);
  // zoneMinsHandle.forEach(function(element) {
  //   let sweep = Math.min(Math.max(zoneValue / zoneGoal, 0.01), 1) * 120;
  //   element.sweepAngle = sweep;
  // });
    
  // mainHandle.onmouseup = function(evt) {
    
  //   if (touchEventCounter % 3 == 0) {
  //     stepsImg.style.display = "none";
  //     calsImg.style.display = "none";
  //     zoneMinsImg.style.display = "none";
      
  //     stepsLabel.text = stepsValue;
  //     calsLabel.text = calsValue;
  //     zoneMinsLabel.text = zoneValue;
      
  //     stepsLabel.style.display = "inline";
  //     calsLabel.style.display = "inline";
  //     zoneMinsLabel.style.display = "inline";
      
  //   } else if (touchEventCounter % 3 == 1 ) {
      
  //     stepsLabel.style.display = "none";
  //     calsLabel.style.display = "none";
  //     zoneMinsLabel.style.display = "none";
      
  //     console.log(stepsGoal);
  //     console.log(stepsValue);
      
  //     stepsToGoalLabel.text = stepsGoal - stepsValue;
  //     calsToGoalLabel.text = calsGoal - calsValue;
  //     zoneMinsToGoalLabel.text = zoneGoal - zoneValue;
      
  //     stepsToGoalLabel.style.display = "inline";
  //     calsToGoalLabel.style.display = "inline";
  //     zoneMinsToGoalLabel.style.display = "inline";
      
  //   } else {
      
  //     stepsToGoalLabel.style.display = "none";
  //     calsToGoalLabel.style.display = "none";
  //     zoneMinsToGoalLabel.style.display = "none";
      
  //     stepsImg.style.display = "inline";
  //     calsImg.style.display = "inline";
  //     zoneMinsImg.style.display = "inline";
      
  //   }
    
  //   touchEventCounter++;  
  // }
  
  
}

