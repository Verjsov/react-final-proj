import { createBrowserHistory, createHashHistory } from "history";
import { appConf, ROUTER_TYPE_HASH } from "../config";

const history =
  module.hot?.data?.history || appConf.router.type === ROUTER_TYPE_HASH
    ? createHashHistory()
    : createBrowserHistory();

// handle hot reloading
if (module.hot) {
  module.hot.dispose((data) => {
    /* eslint no-param-reassign: 0 */
    data.history = history;
  });
}

export default history;
