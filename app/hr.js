import document from "document";
import { me as appbit } from "appbit";
import { user } from "user-profile";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";

export const hrHandle = document.getElementById("hr");
const hrLabelHandle = document.getElementById("hr-label");
const hrImgHandle = document.getElementById("hr-img");

export const hrm = new HeartRateSensor();

const colors = {
  white: "white",
  black: "black",
  zonemins: "#02c39a",
  peak: "#d7263d",
  cardio: "#e66227",
  fatBurn: "#ffc501",
};

// Update heartrate
export function updateHeartRate() {
  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
    hrm.addEventListener("reading", () => {
      if (hrm.heartRate && appbit.permissions.granted("access_user_profile")) {
        let heartRate = hrm.heartRate;
        hrLabelHandle.text = heartRate;

        if (user.heartRateZone(heartRate) == "out-of-range") {
          hrImgHandle.style.fill = colors.white;
          hrLabelHandle.style.fill = colors.black;
        } else if (user.heartRateZone(heartRate) == "fat-burn") {
          hrImgHandle.style.fill = colors.fatBurn;
          hrLabelHandle.style.fill = colors.white;
        } else if (user.heartRateZone(heartRate) == "cardio") {
          hrImgHandle.style.fill = colors.cardio;
          hrLabelHandle.style.fill = colors.white;
        } else if (user.heartRateZone(heartRate) == "peak") {
          hrImgHandle.style.fill = colors.peak;
          hrLabelHandle.style.fill = colors.white;
        }
      } else {
        hrHandle.style.display = "none";
      }
    });

    display.addEventListener("change", () => {
      if (display.on) {
        hrm.start();
        hrHandle.style.display = "inline";
      } else {
        hrm.stop();
        hrHandle.style.display = "none";
      }
    });
    hrm.start();
    hrHandle.style.display = "inline";
  }
}
