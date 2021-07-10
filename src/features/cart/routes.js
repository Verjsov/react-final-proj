import { FeaturePage } from './pages/FeaturePage';
import { featureConf } from "./config";
import { CartPage } from "./pages/CartPage";

export const routes = [
  {
    key: `${featureConf}/cart`,
    path: '/cart',
    component: CartPage,
    exact: true,
  },

];
