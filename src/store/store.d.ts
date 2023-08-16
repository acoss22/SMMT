import { RootState } from "./store";

declare module "store" {
  const store: RootState;
  export default store;
}
