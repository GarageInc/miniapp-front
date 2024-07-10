import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postEvent } from "@tma.js/sdk";
import { on } from "@tma.js/sdk";

export function useShowAppBackButton() {
  const navigate = useNavigate();
  useEffect(() => {
    postEvent("web_app_setup_back_button", { is_visible: true });

    return () => {
      postEvent("web_app_setup_back_button", { is_visible: false });
    };
  }, []);

  useEffect(() => {
    const unsub = on("back_button_pressed", () => {
      navigate(-1);
    });

    return unsub;
  }, [navigate]);
}
