import { useMutation, useQueryClient } from "react-query";
import { create } from "../api/OrderAPI";
import {useDispatch, useSelector} from "react-redux";
import * as CartDuck from "../../cart/ducks/cart.duck";

export function useSaveOrder(event) {
    //event.preventDefault();
    let { target } = event;
    console.log(target);
    //cb = () => {}
    //const queryClient = useQueryClient();
    //const dispatch = useDispatch();
    //dispatch(CartDuck.saveOrder({firstName:'testName',lastName:'testLastName'}));
    /*
    return useMutation(({ firstName, lastName }) => {
        return create({
            firstName,
            lastName,
        });
    }, {
        onSuccess: () => {
            cb();
           // queryClient.invalidateQueries('posts');
        },
    })
     */
}

/*
export function useCreateOrder(cb = () => {}) {
    const queryClient = useQueryClient();
    return useMutation(({ firstName, lastName }) => {
        return create({
            firstName,
            lastName,
        });
    }, {
        onSuccess: () => {
            cb();
            // queryClient.invalidateQueries('posts');
        },
    })
}
 */