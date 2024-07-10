import { useLayoutEffect } from "react";

export const useTgWebappScrollHack = () => {
  useLayoutEffect(() => {
    function ensureDocumentIsScrollable() {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight;
      if (!isScrollable) {
        document.documentElement.style.setProperty(
          "height",
          "calc(100vh + 1px)",
          "important"
        );
      }
    }

    function preventCollapse() {
      if (window.scrollY === 0) {
        window.scrollTo(0, 1);
      }
    }

    ensureDocumentIsScrollable();

    document.body.addEventListener("touchstart", preventCollapse, {
      passive: true,
    });

    return () => {
      document.body.removeEventListener("touchstart", preventCollapse);
    };
  }, []);
  return null;
};
