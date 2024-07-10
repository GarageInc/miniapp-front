import { createHash } from "crypto";

import * as BN from "bn.js";
import { Cell } from "@ton/core";
import { beginCell, Builder, Dictionary, DictionaryValue } from "@ton/ton";

const OFF_CHAIN_CONTENT_PREFIX = 0x01;
const ON_CHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;

export const sha256ToNumStr = (src: string) => {
  return new BN.BN(createHash("sha256").update(src).digest()).toString(10);
};

export function flattenSnakeCell(cell: Cell) {
  let c: Cell | null = cell;

  let res = Buffer.alloc(0);

  while (c) {
    const cs = c.beginParse();
    // const data = cs.readRemainingBytes()
    const data = cs.loadBuffer(cs.remainingBits / 8);
    res = Buffer.concat([res, data]);
    c = c.refs[0];
  }

  return res;
}

function bufferToChunks(buff: Buffer, chunkSize: number) {
  const chunks: Buffer[] = [];
  while (buff.byteLength > 0) {
    chunks.push(buff.slice(0, chunkSize));
    buff = buff.slice(chunkSize);
  }
  return chunks;
}

export function makeSnakeCell(data: Buffer) {
  const chunks = bufferToChunks(data, 127);
  const rootCell = beginCell();
  let curCell = rootCell;

  const refs = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    curCell.storeBuffer(chunk);

    if (chunks[i + 1]) {
      const nextCell = beginCell();
      refs.push(nextCell);
      curCell = nextCell;
    }
  }

  if (refs.length > 0) {
    let prev: Builder | null = null;
    while (refs.length > 0) {
      const c = refs.pop()!;
      if (prev) {
        c.storeRef(prev);
      }
      prev = c;
    }
    rootCell.storeRef(prev!);
  }

  return rootCell;
}

export function encodeOffChainContent(content: string) {
  let data = Buffer.from(content);
  const offChainPrefix = Buffer.from([OFF_CHAIN_CONTENT_PREFIX]);
  data = Buffer.concat([offChainPrefix, data]);
  return makeSnakeCell(data);
}

export function decodeOffChainContent(content: Cell) {
  const data = flattenSnakeCell(content);

  const prefix = data[0];
  if (prefix !== OFF_CHAIN_CONTENT_PREFIX) {
    throw new Error(`Unknown content prefix: ${prefix.toString(16)}`);
  }
  return data.slice(1).toString();
}

export function encodeTextSnake(text: string) {
  const data = Buffer.from(text);
  const snakePrefix = Buffer.from([SNAKE_PREFIX]);
  return makeSnakeCell(Buffer.concat([snakePrefix, data]));
}

// tail#_ {bn:#} b:(bits bn) = SnakeData ~0;
// cons#_ {bn:#} {n:#} b:(bits bn) next:^(SnakeData ~n) = SnakeData ~(n + 1);
// chunked_data#_ data:(HashMapE 32 ^(SnakeData ~0)) = ChunkedData;

// text#_ {n:#} data:(SnakeData ~n) = Text;
// snake#00 data:(SnakeData ~n) = ContentData;
// chunks#01 data:ChunkedData = ContentData;
// onchain#00 data:(HashMapE 256 ^ContentData) = FullContent;
// offchain#01 uri:Text = FullContent;

export function decodeContentData(content: Cell) {
  const ds = content.beginParse();
  const prefix = ds.loadUint(8);

  if (prefix === 0x0) {
    return flattenSnakeCell(ds.asCell());
  } else if (prefix === 0x01) {
    // const chunks = ds.readDict(32, (s) => s.readCell())
    const chunks = ds.loadDict(
      Dictionary.Keys.Uint(32),
      Dictionary.Values.Cell()
    );
    let data = Buffer.alloc(0);

    const keys = chunks.keys().sort((a, b) => a - b);

    for (const key of keys) {
      const value = chunks.get(key)!.beginParse();
      data = Buffer.concat([data, value!.loadBuffer(value.remainingBits / 8)]);
    }
    // const values = [...chunks.entries()].sort((a, b) => parseInt(a[0], 10) - parseInt(b[0], 10))
    //
    // for (const [key, value] of values) {
    //     data = Buffer.concat([data, value.beginParse().readRemainingBytes()])
    // }

    return data;
  } else {
    throw new Error("Unknown content data");
  }
}

export class OnChainContent {
  constructor(private map: Map<string, Buffer>) {}

  getString(key: string) {
    const value = this.map.get(sha256ToNumStr(key));
    if (!value) {
      return null;
    }

    return value.toString();
  }

  static decode() {
    throw new Error();
    // return new OnChainContent(decodeOnChainContent(content))
  }
}

function createContentDataValue(): DictionaryValue<Buffer> {
  return {
    serialize: () => {
      // buidler.storeSlice(src)
      throw new Error();
    },
    parse: (src) => {
      return decodeContentData(src.loadRef());
      // return src.loadIntBig(bits);
    },
  };
}

export function decodeOnChainContent(content: Cell) {
  const ds = content.beginParse();

  const prefix = ds.loadUint(8);

  if (prefix !== ON_CHAIN_CONTENT_PREFIX) {
    throw new Error(`Unknown content prefix: ${prefix}`);
  }

  // return ds.readDict(256, (s) => decodeContentData(s.readCell()))
  return ds.loadDict(Dictionary.Keys.BigUint(256), createContentDataValue());
}

// export function decodeTokenContent(content: Cell) {
//     const prefix = content.bits.buffer.readInt8(0)
//
//     if (prefix === ON_CHAIN_CONTENT_PREFIX) {
//         return decodeOnChainContent(content)
//     } else if (prefix === OFF_CHAIN_CONTENT_PREFIX) {
//         return decodeOffChainContent(content)
//     } else {
//         throw new Error('Unknown content prefix: ' + prefix)
//     }
// }
