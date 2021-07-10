import React, { Fragment } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { NavLink } from 'react-router-dom';
import StyledBadge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from "react-redux";
import * as CartDuck from "../../../features/cart/ducks/cart.duck";
import {useDispatch} from "react-redux";
import Typography from "@material-ui/core/Typography";



const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

}));

const useCustomStyles = makeStyles((theme) => ({
}));

export function Header() {
  const classes = useStyles();

  const customClasses = useCustomStyles();

  const numProducts = useSelector(CartDuck.selectNumProducts);

  const dispatch = useDispatch();
  const clearCart = (value) => dispatch(CartDuck.clearCart()); // сгенерируем функции для действий

  return (
    <Fragment>
      <div className={classes.offset} />
      <AppBar className={customClasses.header} position="fixed">
        <Toolbar>
          <Box>

            <Button color="inherit" to="/" exact component={NavLink}>Home</Button>
            <Button color="inherit" to="/catalog" exact component={NavLink}>Catalog</Button>
            <Button color="inherit" to="/about-us" exact component={NavLink}>About us</Button>
            <Button color="inherit" to="/delivery-and-pay" exact component={NavLink}>Pay & Delivery</Button>
            {(numProducts > 0) && <Button onClick={() => clearCart()} color="inherit" to="" exact component={NavLink}>Clean cart</Button>}
            <Button color="inherit" to="/cart" exact component={NavLink} aria-label="cart">
              <StyledBadge badgeContent={numProducts}>
              Cart
              </StyledBadge>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

