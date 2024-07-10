import { CopyIcon } from "@/shared/ui/icons";

import { Button } from "../Button";

export default (
  <div className="container mx-auto p-4 ">
    <div className="font-display font-bold text-xl mb-3">Colors & States</div>
    <div className="grid grid-cols-3 gap-4 justify-items-start align-items-start">
      <Button>Craft</Button>
      <Button active>Craft</Button>
      <Button disabled>Craft</Button>
      <Button color="green">Craft</Button>
      <Button color="green" active>
        Craft
      </Button>
      <Button color="green" disabled>
        Craft
      </Button>
      <Button color="red">Craft</Button>
      <Button color="red" active>
        Craft
      </Button>
      <Button color="red" disabled>
        Craft
      </Button>
      <Button color="yellow">Craft</Button>
      <Button color="yellow" active>
        Craft
      </Button>
      <Button color="yellow" disabled>
        Craft
      </Button>
      <Button color="gray">Craft</Button>
      <Button color="gray" active>
        Craft
      </Button>
      <Button color="gray" disabled>
        Craft
      </Button>
    </div>
    <div className="mt-8">
      <div className="font-display font-bold text-xl mb-3">Sizes</div>
      <div className="grid grid-cols-2 gap-4 justify-items-start align-items-start">
        <div className="flex flex-col space-y-4 items-start">
          <Button size="lg">Craft</Button>
          <Button size="md">Craft</Button>
          <Button size="sm">Craft</Button>
        </div>
        <div>
          <div className="flex flex-col space-y-4 items-start">
            <Button icon={<CopyIcon />} />
            <Button size="md" icon={<CopyIcon />} />
            <Button size="sm" icon={<CopyIcon />} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
