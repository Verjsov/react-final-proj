import React from 'react';
import PropTypes from 'prop-types';

import { OrderForm } from "../components/OrderForm";
import { useHistory } from "react-router";
import {useDispatch, useSelector} from "react-redux";
import * as OrderDuck from "../ducks/order.duck";

export function CreateOrderPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const order = useSelector(OrderDuck.selectOrder);

    const onSubmit = (values) => {
        dispatch(OrderDuck.saveOrder({
            firstName:    values.firstName,
            lastName:     values.lastName,
            country:      values.country,
            phone:        values.phone,
            city:         values.city,
            address:      values.address,
            address2:     values.address2,
            email:        values.email,
            deliveryType: values.deliveryType,
            dontCallMe:   values.dontCallMe,
            comment:      "",
                }));
        history.push("/order2");
    }

  return (
    <div className="page">
      Create Order page
        <OrderForm
            onSubmit={onSubmit}
            editOrder={order}
        />

    </div>
  );
}

CreateOrderPage.propTypes = {};
