import document from "document";
import * as util from "../common/utils";
import { preferences } from "user-settings";

const timeHandle = document.getElementById("time");
const dateHandle = document.getElementById("date");

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function updateTime(newDate) {
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

  let todayDate = util.zeroPad(newDate.getDate());
  dateHandle.text = `${days[newDate.getDay()]} ${todayDate}`;
}
