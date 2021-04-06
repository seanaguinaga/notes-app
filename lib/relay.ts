import { useMemo } from "react";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

let relayEnvironment: Environment | undefined;

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise
async function fetchQuery(
  operation: any,
  variables: any,
  _cacheConfig: any,
  _uploadables: any
) {
  const response = await fetch(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "x-hasura-role": "anonymous",
      "Content-Type": "application/json",
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  });

  // Get the response as JSON
  const json = await response.json();

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    console.log(json.errors);
    throw new Error(
      `Error fetching GraphQL query '${
        operation.name
      }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors
      )}`
    );
  }

  // Otherwise, return the full payload.
  return json;
}

function createEnvironment() {
  return new Environment({
    // Create a network layer from the fetch function
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
}

export function initEnvironment(initialRecords?: any) {
  // Create a network layer from the fetch function
  const environment = relayEnvironment ?? createEnvironment();

  // If your page has Next.js data fetching methods that use Relay, the initial records
  // will get hydrated here
  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords));
  }
  // For SSG and SSR always create a new Relay environment
  if (typeof window === "undefined") return environment;
  // Create the Relay environment once in the client
  if (!relayEnvironment) relayEnvironment = environment;

  return relayEnvironment;
}

export function useEnvironment(initialRecords: any) {
  const store = useMemo(() => initEnvironment(initialRecords), [
    initialRecords,
  ]);
  return store;
}
