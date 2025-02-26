import * as _m0 from "protobufjs/minimal";
import { bytesFromBase64, base64FromBytes, DeepPartial } from "@osmonauts/helpers";

/** GenesisState defines the raw genesis transaction in JSON. */
export interface GenesisState {
  /** gen_txs defines the genesis transactions. */
  gen_txs: Uint8Array[];
}

function createBaseGenesisState(): GenesisState {
  return {
    gen_txs: []
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.gen_txs) {
      writer.uint32(10).bytes(v!);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.gen_txs.push(reader.bytes());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      gen_txs: Array.isArray(object?.gen_txs) ? object.gen_txs.map((e: any) => bytesFromBase64(e)) : []
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};

    if (message.gen_txs) {
      obj.gen_txs = message.gen_txs.map(e => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.gen_txs = [];
    }

    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.gen_txs = object.gen_txs?.map(e => e) || [];
    return message;
  }

};