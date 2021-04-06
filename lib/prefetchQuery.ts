import { fetchQuery } from "react-relay/hooks";
import { createOperationDescriptor, getRequest } from "relay-runtime";

const prefetchQuery = async (environment, query) => {
  const operation = createOperationDescriptor(getRequest(query), {});

  const data = await fetchQuery(environment, query, {}).toPromise();
  // this will retain the result in the relay store so it's not garbage collected
  // so it can pull the data from here when we try and fetch it later
  environment.retain(operation);
  return data;
};

export default prefetchQuery;
