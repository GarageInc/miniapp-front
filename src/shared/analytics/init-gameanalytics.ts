import gameanalytics, { GameAnalytics } from "gameanalytics";

import { GA_BUILD, GA_KEY, GA_SECRET, IS_DEV } from "@/shared/config";
import { APP_START_PARAMS, getTelegramUserId } from "@/shared/utils/telegram";

import GameEvents from "./GameEvents";
import { SessionManager } from "./SessionManager";

const userId = getTelegramUserId();

if (GA_KEY && GA_SECRET) {
  gameanalytics.GameAnalytics.init();
  const ga = gameanalytics.GameAnalytics.gaCommand;
  if (IS_DEV) {
    ga("setEnabledInfoLog", true);
    ga("setEnabledVerboseLog", true);
  }
  if (GA_BUILD) {
    ga("configureBuild", GA_BUILD);
  }
  ga("configureUserId", userId.toString());

  //configure resource event params
  ga("configureAvailableResourceCurrencies", ["item"]);
  ga("configureAvailableResourceItemTypes", ["craft", "reward", "box"]);

  ga("initialize", GA_KEY, GA_SECRET);

  const source = APP_START_PARAMS.source;

  SessionManager.incrementSessionNumber(userId.toString());
  const sessionNumber = SessionManager.getSessionNumber(userId.toString());
  GameEvents.sessionStart(sessionNumber, source);

  if (sessionNumber === 1) {
    GameEvents.appFirstLaunch(source);
  }

  const handleUnload = () => {
    GameEvents.sessionEnd(sessionNumber);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("unload", handleUnload);
    window.Telegram.WebView.onEvent("web_app_close", handleUnload);
  }

  // listen all click on the page
  // data-ga-event - event name (can be split by ":")
  // data-ga-type - event type (design, progress, resource)
  // data-ga-value - event value (for design events)
  // data-ga-progression - ga.EGAProgressionStatus (Start | Complete | Fail)
  // data-ga-resource - ga.EGAResourceFlowType (Source | Sink)

  if (typeof window !== "undefined") {
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const gaTarget = target.closest("[data-ga-event]");
      if (!gaTarget) {
        return;
      }
      const eventType = gaTarget.getAttribute("data-ga-type") || "design";
      const eventName = gaTarget.getAttribute("data-ga-event");

      if (!eventName) {
        return;
      }

      console.log("Sending ga event from click", {
        eventType,
        eventName,
      });

      if (eventType === "design") {
        const eventValue = gaTarget.getAttribute("data-ga-value") || "1";
        GameAnalytics.addDesignEvent(eventName, parseInt(eventValue));
      }

      if (eventType === "progress") {
        const progression =
          gaTarget.getAttribute("data-ga-progression") || "Start";

        GameAnalytics.addProgressionEvent(
          gameanalytics.EGAProgressionStatus[progression],
          ...eventName.split(":")
        );
      }
      if (eventType === "resource") {
        const resourceType =
          gaTarget.getAttribute("data-ga-resource") || "Source";

        GameAnalytics.addResourceEvent(
          gameanalytics.EGAResourceFlowType[resourceType],
          ...eventName.split(":")
        );
      }
    });
  }
}
