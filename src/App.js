import React from 'react';
import { Provider } from 'react-redux';
import store from "./services/store";
import history from "./services/history";
import { AppContainer } from "./AppContainer";
import { queryClient} from "./services/queryClient";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { QueryClientProvider} from "react-query";

function App() {
  return (
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <QueryClientProvider client={queryClient} >
                  <CssBaseline/>
                  <AppContainer history={history} />
              </QueryClientProvider>
          </Provider>
      </ThemeProvider>

  );
}

export default App;
