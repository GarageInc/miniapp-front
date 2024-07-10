declare interface Window {
  Telegram: {
    WebApp: {
      ready: () => void;
      initData: string;
      initDataUnsafe: string;
      themeParams: string;
      colorScheme: string;
      viewportHeight: string;
      close: () => void;
      expand: () => void;
    };
    WebView: {
      onEvent: (event: string, handler: () => void) => void;
    };
  };
}
