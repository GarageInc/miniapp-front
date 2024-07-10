import { create } from "zustand";

type ArtifactId = string;
type CraftSelection = [ArtifactId | null, ArtifactId | null];
type LossChances = Record<string, number>;

type CraftErrorReason = "require-inventory-space" | "server-error";

export type InventoryItem = {
  artifact: API.Artifact;
  count: number;
  isDiscovered: boolean;
};

type InventoryState = {
  items: InventoryItem[];
  selection: CraftSelection;
  craftResult: CraftResult | null;
  craftError: CraftErrorReason | null;
  lossChances: LossChances | null;
  hasNoRecipe: boolean;
};

type InventoryActions = {
  reset: () => void;
  setItems: (
    inventory: API.InventoryItem[],
    allArtifacts: API.Artifact[]
  ) => void;
  select: (id: string) => void;
  deselectLeft: () => void;
  deselectRight: () => void;
  resetSelection: () => void;
  setCrafted: (result: CraftResult | null) => void;
  setError: (reason: CraftErrorReason | null) => void;
  setLossChances: (chances: LossChances | null) => void;
  setHasNoRecipe: () => void;
  resetHasNoRecipe: () => void;
};

const initialState: InventoryState = {
  items: [],
  selection: [null, null],
  craftResult: null,
  craftError: null,
  lossChances: null,
  hasNoRecipe: false,
};

export const useInventoryStore = create<InventoryState & InventoryActions>()(
  (set) => ({
    ...initialState,
    reset: () => set(initialState),
    setItems: (items: API.InventoryItem[], allArtifacts: API.Artifact[]) =>
      set((state) => {
        const fullItems = items
          .map((inv) => ({
            artifact: inv.artifact,
            count: inv.count,
            isDiscovered: true,
          }))
          .concat(
            allArtifacts
              .filter((art) => !items.some((inv) => inv.artifact.id === art.id))
              .map((artifact) => ({
                artifact,
                count: 0,
                openedDate: null,
                isDiscovered: false,
              }))
          );
        return {
          ...state,
          items: fullItems,
          selection: invalidateSelection(fullItems, state.selection),
        };
      }),
    setLossChances: (chances: LossChances | null) =>
      set({ lossChances: chances }),
    setCrafted: (result: CraftResult | null) =>
      set({ craftResult: result, hasNoRecipe: false }),
    setError: (reason: CraftErrorReason | null) => set({ craftError: reason }),
    select: (id: string) =>
      set((state) => ({
        ...state,
        selection: trySelectItem(state.items, state.selection, id),
      })),
    deselectLeft: () =>
      set((state) => ({
        ...state,
        selection: deselectLeftItem(state.selection),
      })),
    deselectRight: () =>
      set((state) => ({
        ...state,
        selection: deselectRightItem(state.selection),
      })),
    resetSelection: () => set({ selection: [null, null] }),
    setHasNoRecipe: () => set({ hasNoRecipe: true }),
    resetHasNoRecipe: () => set({ hasNoRecipe: false }),
  })
);

export const useInventorySelector = () =>
  useInventoryStore(({ items, selection, ...state }) => ({
    items: applySelection(items, selection),
    selection,
    leftItem: items.find((item) => item.artifact.id === selection[0]),
    rightItem: items.find((item) => item.artifact.id === selection[1]),
    isAllSelected: selection[0] != null && selection[1] != null,
    ...state,
  }));

function trySelectItem(
  items: InventoryItem[],
  selection: CraftSelection,
  id: string
): CraftSelection {
  // if there is a free slot
  // - occupy it if quantity is available
  // - do nothing if quantity is not available
  // if there is both slots with the same item - free all slots
  // if there is a slot with the same item - free it

  // positive selection logic
  if (selection.includes(null)) {
    // check if there is enough quantity of the item
    const availableQuantity =
      items.find((x) => x.artifact.id === id)?.count ?? 0;
    const selectedQuantity = selection.filter((x) => x === id).length;

    if (availableQuantity <= selectedQuantity) {
      // if item is in the selection, deselect it
      if (selection.includes(id)) {
        return selection.map((x) => (x === id ? null : x)) as CraftSelection;
      }
      return selection;
    }

    if (selection[0] === null) {
      return [id, selection[1]];
    } else if (selection[1] === null) {
      return [selection[0], id];
    }
  }

  // negative selection logic
  if (selection[0] === id && selection[1] === id) {
    return [null, null];
  } else if (selection[0] === id) {
    return [null, selection[1]];
  } else if (selection[1] === id) {
    return [selection[0], null];
  }

  return selection;
}

function deselectLeftItem(arr: CraftSelection): CraftSelection {
  return [null, arr[1]];
}

function deselectRightItem(arr: CraftSelection): CraftSelection {
  return [arr[0], null];
}

function invalidateSelection(
  items: InventoryItem[],
  selection: CraftSelection
): CraftSelection {
  // check if selected items are still in the inventory
  // also ensure that there is enough quantity of the item
  // one item can be selected multiple times
  const countsById = items.reduce(
    (acc, item) => {
      acc[item.artifact.id] = item.count;
      return acc;
    },
    {} as Record<string, number>
  );

  return selection.reduce(
    (acc, id, idx) => {
      if (id && countsById[id] > 0) {
        acc[idx] = id;
        countsById[id]--;
      }
      return acc;
    },
    [null, null] as CraftSelection
  );
}

// update inventory items count after selection
function applySelection(
  items: InventoryItem[],
  selected: CraftSelection
): InventoryItem[] {
  return items.map((item) => ({
    ...item,
    count: item.count - selected.filter((id) => id === item.artifact.id).length,
  }));
}
