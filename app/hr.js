import document from "document";
import { me as appbit } from "appbit";
import { user } from "user-profile";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import { colors } from "../common/utils";

export const hrHandle = document.getElementById("hr");
const body = new BodyPresenceSensor();
const hrLabelHandle = document.getElementById("hr-label");
const hrImgHandle = document.getElementById("hr-img");
const hrAnimationHandle = document.getElementById("hr-animation");

export const hrm = new HeartRateSensor();

// Update heartrate
export function updateHeartRate() {
  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
    hrm.addEventListener("reading", () => {
      if (hrm.heartRate && appbit.permissions.granted("access_user_profile")) {
        let heartRate = hrm.heartRate;
        hrLabelHandle.text = heartRate;
        hrAnimationHandle.animate("enable");

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
        hrImgHandle.style.fill = colors.white;
        hrLabelHandle.style.fill = colors.black;
        hrLabelHandle.text = "--";

      }
    });

    if (BodyPresenceSensor) {
      body.addEventListener("reading", () => {
        if (!body.present) {
          hideHr();
        } else {
          showHr();
        }
      });
      body.start();
    }

    display.addEventListener("change", () => {
      if (display.on) {
        showHr();
      } else {
        hideHr();
      }
    });
    showHr();
  }
}

export function hideHr() {
  hrm.stop();
  hrAnimationHandle.animate("disable");
  hrHandle.style.display = "none";
}

export function showHr() {
  hrm.start();
  hrHandle.style.display = "inline";
}
