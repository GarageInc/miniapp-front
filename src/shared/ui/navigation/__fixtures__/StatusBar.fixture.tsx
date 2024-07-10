import { StatusBar } from "@/shared/ui/navigation/StatusBar";

export default (
  <StatusBar
    className="w-full fixed top-0"
    user={{
      name: "John Doe",
      pictureUrl: "",
      level: 3,
    }}
    inventory={{ current: 10, total: 100 }}
  />
);
