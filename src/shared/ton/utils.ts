import { toNano } from "@ton/core";
import { Address } from "@ton/ton";

import { GAS_FEE, NFT_FORWARD_AMOUNT } from "@/shared/config";

import { createTonClient } from "./client";

export function verifyTonAddress(address: string): boolean {
  return Address.isFriendly(address);
}

export function convertAddressToRaw(address: string): string {
  return Address.parse(address).toString();
}

export function formatBalance(
  balance: bigint,
  locale: string = "en-US",
  decimalPlaces: number = 2
): string {
  const baseUnit = Number(balance) / 1e9;

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return formatter.format(baseUnit);
}

export async function getWalletBalance(address: string) {
  const balance = await createTonClient().getBalance(Address.parse(address));
  return formatBalance(balance);
}

export function calculateMintTransactionPrice(artifactPrice: string): bigint {
  return toNano(artifactPrice) + toNano(NFT_FORWARD_AMOUNT) + toNano(GAS_FEE);
}
