import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate";
export const createRPCQueryClient = async ({
  rpcEndpoint
}: {
  rpcEndpoint: string;
}) => {
  const tmClient = await Tendermint34Client.connect(rpcEndpoint);
  const client = new QueryClient(tmClient);
  return {
    cosmos: {
      authz: {
        v1beta1: (await import("../cosmos/authz/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      bank: {
        v1beta1: (await import("../cosmos/bank/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      distribution: {
        v1beta1: (await import("../cosmos/distribution/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      gov: {
        v1: (await import("../cosmos/gov/v1/query.rpc.query")).createRpcQueryExtension(client),
        v1beta1: (await import("../cosmos/gov/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      staking: {
        v1beta1: (await import("../cosmos/staking/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      tx: {
        v1beta1: (await import("../cosmos/tx/v1beta1/service.rpc.svc")).createRpcQueryExtension(client)
      },
      upgrade: {
        v1beta1: (await import("../cosmos/upgrade/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      }
    },
    ibc: {
      applications: {
        transfer: {
          v1: (await import("./applications/transfer/v1/query.rpc.query")).createRpcQueryExtension(client)
        }
      },
      core: {
        channel: {
          v1: (await import("./core/channel/v1/query.rpc.query")).createRpcQueryExtension(client)
        },
        client: {
          v1: (await import("./core/client/v1/query.rpc.query")).createRpcQueryExtension(client)
        },
        connection: {
          v1: (await import("./core/connection/v1/query.rpc.query")).createRpcQueryExtension(client)
        }
      }
    }
  };
};