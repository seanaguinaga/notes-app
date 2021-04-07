import { withHydrateDatetime } from "relay-nextjs/date";
import {
  Environment,
  GraphQLResponse,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";
import { fetchQuery } from "./relay";

export function createServerNetwork() {
  return Network.create(async (text, variables) => {
    const results = await fetchQuery(text, variables);

    const data = JSON.parse(
      JSON.stringify(results),
      withHydrateDatetime
    ) as GraphQLResponse;

    return data;
  });
}

// Optional: this function can take a token used for authentication and pass it into `createServerNetwork`.
export function createServerEnvironment() {
  return new Environment({
    network: createServerNetwork(),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
