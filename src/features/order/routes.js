import { FeaturePage } from './pages/FeaturePage';
import { featureConf } from "./config";

import { CreateOrderPage } from "./pages/CreateOrderPage";
import { OrderPageStep2 } from "./pages/OrderPageStep2";
import { OrderPageStep3 } from "./pages/OrderPageStep3";


export const routes = [
  {
    key: `${featureConf}/order`,
    path: '/order',
    component: CreateOrderPage,
    exact: true,
  },
  {
    key: `${featureConf}/order`,
    path: '/order2',
    component: OrderPageStep2,
    exact: true,
  },
  {
    key: `${featureConf}/order`,
    path: '/order3',
    component: OrderPageStep3,
    exact: true,
  },

];
