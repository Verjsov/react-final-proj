import { routes as info } from "./features/info/routes";
import { routes as catalog } from "./features/catalog/routes";
import { routes as order } from "./features/order/routes";
import { routes as cart } from "./features/cart/routes";

export const routes = [
  ...info,
  ...catalog,
  ...order,
  ...cart
];
