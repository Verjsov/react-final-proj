import { AboutUsPage } from './pages/AboutUsPage';
import { DeliveryPayPage } from './pages/DeliveryPayPage';
import { featureConf } from "./config";
import {HomePage} from "./pages/HomePage";

export const routes = [
  {
    key: `${featureConf}/home`,
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    key: `${featureConf}/about`,
    path: '/about-us',
    component: AboutUsPage,
    exact: true,
  },
  {
    key: `${featureConf}/delivery-and-pay`,
    path: '/delivery-and-pay',
    component: DeliveryPayPage,
    exact: true,
  },
];
