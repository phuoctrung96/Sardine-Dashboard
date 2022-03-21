import { AnyTodo } from "sardine-dashboard-typescript-definitions";

const allowListAttributes = (payload: { [key: string]: AnyTodo }, attributes: Array<string>): { [key: string]: AnyTodo } => {
  if (payload === null || payload === undefined) {
    return {};
  }

  const allowlistedPayload: { [key: string]: AnyTodo } = {};

  attributes.forEach((attr: string) => {
    if (payload[attr] !== undefined) {
      allowlistedPayload[attr] = payload[attr];
    }
  });

  return allowlistedPayload;
};

export { allowListAttributes };
