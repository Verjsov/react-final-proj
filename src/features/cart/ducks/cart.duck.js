import { all } from "redux-saga/effects"
import { produce } from "immer";
import { featureConf } from "../config";

export const namespace = 'cart';

export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_FIELD = 'SET_FIELD';
export const CHECK_ITEM = 'CHECK_ITEM';
export const SAVE_PRODUCTS = 'SAVE_PRODUCTS';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';

// action creators
export function addItem(product) {
  console.log(product);
  return {
    type: ADD_ITEM,
    product,
  }
}

export function updateItem(id, qty) {
  return {
    type: UPDATE_ITEM,
    id,
    qty,
  }
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    id,
  }
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  }
}

export function checkItem() {
  return {
    type: CHECK_ITEM,
  }
}

export function setField(key, value) {
  return {
    type: SET_FIELD,
    key,
    value,
  }
}

// initial state
const initialState = {
  items: [],
  numProducts: 0,
  total: 0,
};

const reducerReactionsMap = {
  [ADD_ITEM]: (state, action) => state,
};

// reducer
export function reducer(state = initialState, action) {
  let { type, id, qty, product, key, value } = action;

  switch (type) {
    case ADD_ITEM:

      return produce(state, (s) => {
        let index = s.items.findIndex((el) => el.id == product.id);
        if (index > -1) {
          s.items[index].qty = s.items[index].qty + 1;
          s.items[index].amount = s.items[index].qty * s.items[index].price;
          s.total = parseFloat(s.total) + parseFloat(s.items[index].price);
        } else {
          let prod = {
            id:product.id,
            price:product.price,
            qty:1,
            amount:product.price,
          };
          s.items.push(prod);
          s.total = parseFloat(s.total) + parseFloat(product.price);
        }
        s.numProducts = s.numProducts + 1;
      });


    case UPDATE_ITEM:

      return produce(state, (s) => {
        let index = s.items.findIndex(el => el.id === id);
        if (index > -1) {
          let old_qty = s.items[index].qty;
          let old_amount = s.items[index].amount;

          s.items[index].qty = qty;
          s.items[index].amount = s.items[index].price * qty;
          s.numProducts = parseFloat(s.numProducts) - parseFloat(old_qty) + parseFloat(qty);
          s.total = s.total - old_amount + s.items[index].amount;
        }
      });


    case REMOVE_ITEM:
      return produce(state, (s) => {
        let index = s.items.findIndex(el => el.id === id);
        if (index > -1) {
          s.numProducts = s.numProducts - s.items[index].qty;
          s.total = s.total - s.items[index].qty * s.items[index].price;
          s.items.splice(index, 1);

        }
      });

    case CLEAR_CART:
      return produce(state, (s) => {
        s.items = [];
        s.numProducts = 0;
        s.total = 0;

      });

    case SET_FIELD:
      return produce(state, s => {
        s[key] = value;
      });

    default:
      return state;
  }
}

// selectors
export const selectField = (s,key) => s[namespace][key];
export const selectNumProducts = (s) => selectField(s,'numProducts');
export const selectItems = state => state[namespace].items;
export const selectTotal = state => state[namespace].total;












