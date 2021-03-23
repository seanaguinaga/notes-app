/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />

declare module "*.jpg";

declare module "*.svg" {
  let content: any;
  export let ReactComponent: any;
  export default content;
}
