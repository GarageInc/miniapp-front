import {
  Cell,
  Contract,
  ContractProvider,
  Sender,
  SendMode,
  StateInit,
  toNano,
} from "@ton/core";
import { Address, beginCell, Builder } from "@ton/ton";

import { NFT_FORWARD_AMOUNT } from "@/shared/config";

import { NFT_TRANSFER_OPCODE } from "./opcodes";

type NftTransferMessage = {
  queryId: bigint;
  newOwner: Address;
  responseDestination: Address | null;
  customPayload: Cell | null;
  forwardAmount: bigint;
  forwardPayload: Cell | null;
};

function storeNftTransferMessage(
  message: NftTransferMessage
): (builder: Builder) => void {
  return (builder) => {
    const {
      queryId,
      newOwner,
      responseDestination,
      customPayload,
      forwardAmount,
      forwardPayload,
    } = message;
    builder
      .storeUint(NFT_TRANSFER_OPCODE, 32)
      .storeUint(queryId, 64)
      .storeAddress(newOwner)
      .storeAddress(responseDestination)
      .storeMaybeRef(customPayload)
      .storeCoins(forwardAmount)
      .storeMaybeRef(forwardPayload);
  };
}

export class NftItem implements Contract {
  static createFromAddress(address: Address) {
    return new NftItem(address, undefined);
  }

  constructor(
    public readonly address: Address,
    public readonly init?: StateInit
  ) {}

  async send(provider: ContractProvider, sender: Sender, newOwner: Address) {
    await provider.internal(sender, {
      value: toNano(NFT_FORWARD_AMOUNT),
      bounce: true,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .store(
          storeNftTransferMessage({
            queryId: 0n,
            newOwner,
            responseDestination: null,
            customPayload: null,
            forwardAmount: 0n,
            forwardPayload: null,
          })
        )
        .endCell(),
    });
  }
}
