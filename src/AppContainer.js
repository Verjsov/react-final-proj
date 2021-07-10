import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Container from "@material-ui/core/Container";
import { Header } from "./shared/components/Header";
import { routes } from "./routes";
import { Page404 } from "./shared/components/Page404";
import * as CatalogDuck from  "./features/catalog/ducks/catalog.duck";
import {useDispatch} from "react-redux";


export function AppContainer(props) {
  const { history } = props;
  const dispatch = useDispatch();

    useEffect(() => {
       dispatch(CatalogDuck.load()); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    }, [])

  return (
    <ConnectedRouter history={history}>
        <Header/>
      <Container>

          <Switch>
              {routes.map(route => (
                  <Route key={route.key} path={route.path} exact={route.exact} component={route.component} />
              ))}
              <Route path="*" exact component={Page404} />
          </Switch>

      </Container>

    </ConnectedRouter>
  );
}

AppContainer.propTypes = {
  history: PropTypes.object,
};
