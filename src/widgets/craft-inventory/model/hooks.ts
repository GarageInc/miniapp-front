import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  useCheckFailedOnceCraft,
  useListAllArtifacts,
  useMatchArtifacts,
  useUser,
} from "@/shared/api";
import { preloadSequenceSalute } from "@/shared/ui/animations/SequenceSalute";
import { loadImg } from "@/shared/utils/media";

import { mapCraftResult } from "../lib/adapters";

import { InventoryItem, useInventorySelector } from "./store";

export function useInventory() {
  const queryClient = useQueryClient();
  const { mutateAsync: combineArtifacts } = useMatchArtifacts();
  const [isCrafting, setIsCrafting] = useState(false);
  const [detailItem, setDetailItem] = useState<InventoryItem | null>(null);
  const { data: user, isSuccess } = useUser();
  const { data: allArtifacts } = useListAllArtifacts();
  // keep user state after craft and update only after dialog closed
  const craftResponseRef = useRef<API.MatchArtifactsResult | null>(null);

  const $inventory = useInventorySelector();

  const { data: failCheckData, isPending: isCheckPending } =
    useCheckFailedOnceCraft({
      firstId: $inventory.selection[0],
      secondId: $inventory.selection[1],
      disable: !user?.canSeeFailedCrafts,
    });

  useEffect(() => {
    if (user && allArtifacts) {
      $inventory.setItems(user.inventory, allArtifacts);
    }
  }, [user, allArtifacts]);

  useEffect(() => {
    $inventory.resetHasNoRecipe();
  }, [isCheckPending, $inventory.selection[0], $inventory.selection[1]]);

  useEffect(() => {
    if (failCheckData?.isFailedInPast) {
      $inventory.setHasNoRecipe();
    }
  }, [failCheckData, isCheckPending]);

  return {
    isLoaded: isSuccess,
    isCrafting,
    selectionHasNoRecipe: $inventory.hasNoRecipe,
    inventory: $inventory.items,
    selectedItems: $inventory.selection,
    firstItem: $inventory.leftItem,
    secondItem: $inventory.rightItem,
    selectItem: $inventory.select,
    deselectLeft: $inventory.deselectLeft,
    deselectRight: $inventory.deselectRight,
    checkSelected(id: string) {
      return $inventory.selection.includes(id);
    },
    craftResult: $inventory.craftResult,
    isCrafted: !!$inventory.craftResult,
    async beginCrafting() {
      const { selection: selection } = $inventory;

      if (selection[0] && selection[1]) {
        try {
          setIsCrafting(true);
          const [data] = await Promise.all([
            combineArtifacts({
              firstId: selection[0],
              secondId: selection[1],
            }).then(async (d) => {
              await loadImg((d?.crafted || d?.lost)!.gifUrl).catch(() => {});
              return d;
            }),
            // loadVideo(getSaluteSrc()),
            preloadSequenceSalute(),
            new Promise((res) => setTimeout(res, 1500)),
          ]);

          craftResponseRef.current = data;
          // if (data.error) {
          //   $inventory.setError("require-inventory-space");
          //   return;
          // }
          const left = $inventory.items.find(
            (x) => x.artifact.id === selection[0]
          );
          const right = $inventory.items.find(
            (x) => x.artifact.id === selection[1]
          );
          $inventory.setCrafted(
            mapCraftResult(data, [left!.artifact, right!.artifact])
          );
        } finally {
          setIsCrafting(false);
        }
        // .catch(() => {
        //   // $inventory.setError("server-error");
        // });
      }
    },
    dismissCraftResult() {
      $inventory.setCrafted(null);
      $inventory.setError(null);
      $inventory.resetSelection();
      // update user data only after dialog closed to prevent flickering
      if (craftResponseRef.current) {
        queryClient.setQueryData(["useUser"], craftResponseRef.current.user);
        craftResponseRef.current = null;
      }
    },
    resetSelection: $inventory.resetSelection,
    canCraft: $inventory.isAllSelected,
    detail:
      (detailItem && {
        item: detailItem,
      }) ??
      null,
    openDetail(itemId: string) {
      setDetailItem(
        $inventory.items.find((x) => x.artifact.id === itemId) ?? null
      );
    },
    closeDetail() {
      setDetailItem(null);
    },
  };
}
