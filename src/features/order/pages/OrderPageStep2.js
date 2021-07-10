import React, {useState} from 'react';
import PropTypes from 'prop-types';


import { useSaveOrder } from "../hooks/useSaveOrder";
import { useHistory } from "react-router";
import {useDispatch, useSelector} from "react-redux";
//import * as CartDuck from "../../cart/ducks/cart.duck";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import * as CartDuck from "../../../features/cart/ducks/cart.duck";
import * as OrderDuck from "../ducks/order.duck";
import "../../../my_css.css";
import Box from "@material-ui/core/Box";
import axios from 'axios';
import {useQuery} from "react-query";
import {getList} from "../../catalog/api/CatalogAPI";
import {create} from "../api/OrderAPI";

export function OrderPageStep2() {
    const [catalog,setCatalog] = useState([]);
    const [isLoadingProducts,setIsLoadingProducts] = useState(false);
    const [isLoadingOrder,setIsLoadingOrder] = useState(true);
    const [id,setId] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    //достаем id выбранных товаров
    const selectItems = useSelector(CartDuck.selectItems);

    let products_id = [];
    let cart = [];
    selectItems.forEach(function(el){
        products_id.push(el.id);
        cart.push({product:el.id,amount:el.qty});
    });
    //загружаем товары
    const { data,error,isLoading } = useQuery("products", async () => {
        let { data } = await getList();
        setCatalog(data);
        setIsLoadingProducts(isLoading);
    });
    //выбираем выбранные товары
    let selectedProducts = catalog.filter(product => products_id.includes(product.id));
    //достаем количество выбранных товаров и общую стоимость
    const numProducts = useSelector(CartDuck.selectNumProducts);
    const total = useSelector(CartDuck.selectTotal);
    const order = useSelector(OrderDuck.selectOrder);

    const useSendOrder = () => {
        let newOrder = {
            firstName:    order.firstName,
            lastName:     order.lastName,
            country:      order.country,
            phone:        order.phone,
            city:         order.city,
            address:      order.address,
            address2:     order.address2,
            email:        order.email,
            deliveryType: order.deliveryType,
            dontCallMe:   order.dontCallMe,
            comment:      order.comment,
            cart:         cart,
        }
        //console.log('order');
        //console.log(newOrder);

        axios.post("https://60bb880442e1d00017620c95.mockapi.io/order", newOrder)
            .then( (response) => {
                dispatch(OrderDuck.saveId(response.data.id));
                setId(response.data.id);
                setIsLoadingOrder(false);
            })
            .catch((error) => {
                setIsLoadingOrder(false);
            });


        /*
        const { data,error,isLoading } = useQuery("order", async () => {
            let result = await create(newOrder);
        });
         */
    }



  return (
    <div className="page">
      Order page step2
        {
            isLoadingProducts ? (<div>Загрузка...</div>) :

            (
                <div>
                    <div className="title">Содержимое корзины</div>

                    <div className="item w-50 bw">Фото</div>
                    <div className="item w-300 bw">Название</div>
                    <div className="item w-100 bw">Цена</div>
                    <div className="item w-100 bw">Количество</div>
                    <div className="item w-100 bw">Стоимость</div>
                    <div style={{clear:'both'}}></div>
                    {
                        selectedProducts.map((product,i) => (
                        <div key={i}>

                        <div className="item w-50"><img width="50px" height="50px" src={product.photo}/></div>
                        <div className="item w-300">{product.title}</div>
                        <div className="item w-100">{product.price}</div>
                        <div className="item w-100">{selectItems[i].qty}</div>
                        <div className="item w-100">{product.price * selectItems[i].qty }</div>

                        <div style={{clear:'both'}}></div>


                        </div>
                        ))
                    }
                    <div className="item w-50"></div>
                    <div className="item w-300 bw">ИТОГО</div>
                    <div className="item w-100"></div>
                    <div className="item w-100 bw">{numProducts}</div>
                    <div className="item w-100 bw">{total}</div>
                    <div style={{clear:'both'}}></div>

                    <table>
                    <tr className="w-300">
                    <td>firstName</td>
                    <td>{ order.firstName }</td>
                    </tr>
                    <tr className="w-300">
                    <td>lastName</td>
                    <td>{ order.lastName }</td>
                    </tr>
                    <tr className="w-300">
                    <td>country</td>
                    <td>{ order.country }</td>
                    </tr>
                    <tr className="w-300">
                    <td>phone</td>
                    <td>{ order.phone }</td>
                    </tr>
                    <tr className="w-300">
                    <td>city</td>
                    <td>{ order.city }</td>
                    </tr>
                    <tr className="w-300">
                    <td>address</td>
                    <td>{ order.address }</td>
                    </tr>
                    <tr className="w-300">
                    <td>address2</td>
                    <td>{ order.address2 }</td>
                    </tr>
                    <tr className="w-150">
                    <td>email</td>
                    <td>{ order.email }</td>
                    </tr>
                    <tr className="w-150">
                    <td>delivery</td>
                    <td>{ order.deliveryType == 'post'? 'Почтовая служба' : 'Самовывоз' }</td>
                    </tr>
                    <tr className="w-150">
                    <td>Подтверждающий звонок</td>
                    <td>{ order.dontCallMe == true? 'Да' : 'Нет' }</td>
                    </tr>
                    <tr className="w-150">
                    <td>Comment</td>
                    <td>{ order.comment }</td>
                    </tr>
                    </table>

                    <Box mt={4}>
                    <Button component={Link} onClick={useSendOrder} to="/order3">Оформить заказ</Button>
                    <Button component={Link}  to="/order">Отредактировать заказ</Button>
                    </Box>
                </div>
            )
        }




    </div>
  );
}

OrderPageStep2.propTypes = {};
