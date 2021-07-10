
import { featureConf } from "./config";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";

export const routes = [
  {
    key: `${featureConf}/catalog`,
    path: '/catalog',
    component: CatalogPage,
    exact: true,
  },

  {
    key: `${featureConf}/products`,
    path: '/products/:id',
    component: ProductPage,
    exact: true,
  },

];
