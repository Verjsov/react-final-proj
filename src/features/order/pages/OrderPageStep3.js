import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from "react-router";


import { useSaveOrder } from "../hooks/useSaveOrder";

import {useDispatch, useSelector} from "react-redux";
//import * as CartDuck from "../../cart/ducks/cart.duck";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import * as CartDuck from "../../../features/cart/ducks/cart.duck";
import "../../../my_css.css";
import Box from "@material-ui/core/Box";
import * as OrderDuck from "../ducks/order.duck";

export function OrderPageStep3() {
    const { id } = useParams();
    const order_id = useSelector(OrderDuck.selectID);


  return (
    <div className="page">
      Order page step3
        {
            order_id == null ? (<div>Загрузка заказа...</div>) :
                    (<div>  Ваш заказ номер {order_id} оформлен. Наш менеджер с вами свяжется в ближайшее время </div>)
        }








        <Box mt={4}>
            <Button component={Link}  to="/catalog">Каталог товаров</Button>
        </Box>


    </div>
  );
}

OrderPageStep3.propTypes = {};
