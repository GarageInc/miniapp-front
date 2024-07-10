import { ForwardIcon } from "@/shared/ui/icons";

import { Button } from "../Button";

export default (
  <div className="container mx-auto p-4 ">
    <div className="space-y-2">
      <Button color="purple" icon={<ForwardIcon />}>
        Next reward
      </Button>
      <Button color="purple" icon={<ForwardIcon />} size="md">
        Next reward
      </Button>
      <Button color="purple" icon={<ForwardIcon />} size="sm">
        Next reward
      </Button>
    </div>
  </div>
);
