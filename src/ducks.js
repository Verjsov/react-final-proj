
import { ducks as cart } from "./features/cart/ducks";
import { ducks as order } from "./features/order/ducks";
import { ducks as catalog } from "./features/catalog/ducks";
import { ducks as info } from "./features/info/ducks";

export const ducks = [
  ...order,
  ...cart,
  ...catalog,
  ...info,
];
