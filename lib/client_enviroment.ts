// lib/client_environment.ts
import { getRelaySerializedState } from "relay-nextjs";
import { withHydrateDatetime } from "relay-nextjs/date";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

export function createClientNetwork() {
  return Network.create(async (params, variables) => {
    const response = await fetch(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    const json = await response.text();
    return JSON.parse(json, withHydrateDatetime);
  });
}

let clientEnv: Environment | undefined;
export function getClientEnvironment() {
  if (typeof window === "undefined") return null;

  if (clientEnv == null) {
    clientEnv = new Environment({
      network: createClientNetwork(),
      store: new Store(new RecordSource(getRelaySerializedState()?.records), {
        gcReleaseBufferSize: 10,
      }),
      isServer: false,
    });
  }

  return clientEnv;
}
