import { YMInitializer } from "react-yandex-metrika";

import { YANDEX_METRIKA_ID } from "@/shared/config";

export function InitAnalytics() {
  if (!YANDEX_METRIKA_ID) {
    return null;
  }

  return <YMInitializer accounts={[YANDEX_METRIKA_ID]} />;
}
