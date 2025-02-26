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
        v1beta1: (await import("./authz/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      bank: {
        v1beta1: (await import("./bank/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      distribution: {
        v1beta1: (await import("./distribution/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      gov: {
        v1: (await import("./gov/v1/query.rpc.query")).createRpcQueryExtension(client),
        v1beta1: (await import("./gov/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      staking: {
        v1beta1: (await import("./staking/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      },
      tx: {
        v1beta1: (await import("./tx/v1beta1/service.rpc.svc")).createRpcQueryExtension(client)
      },
      upgrade: {
        v1beta1: (await import("./upgrade/v1beta1/query.rpc.query")).createRpcQueryExtension(client)
      }
    }
  };
};