
import { produce } from "immer";
import { featureConf } from "../config";
//import {ADD_ITEM} from "../../cart/ducks/cart.duck";

export const namespace = 'order';

// action types
//export const SAVE_ORDER = `${namespace}/SAVE_ORDER`;
export const SAVE_ORDER = 'SAVE_ORDER';
export const SAVE_ID = 'SAVE_ID';
export const SAVE_IS_LOADING = 'SAVE_IS_LOADING';

// action creators
/*
export function addItem(product) {
  console.log(product);
  return {
    type: ADD_ITEM,
    product,
  }
}
 */

export function saveOrder(order) {
  return {
    type: SAVE_ORDER,
    order,
  }
}
export function saveId(id) {
  return {
    type: SAVE_ID,
    id,
  }
}
export function saveIsLoading(isLoading) {
  return {
    type: SAVE_IS_LOADING,
    isLoading,
  }
}


// initial state
const initialState = {
  order:{},
  id:null,
  isLoading:true
};

/*
const reducerReactionsMap = {
  [ADD_ITEM]: (state, action) => state,
};
 */

// reducer
export function reducer(state = initialState, action) {
  let { type, order, id, isLoading } = action;

  switch (type) {


    case SAVE_ORDER:
      return produce(state, (s) => {
        s.order = order;
      });
    case SAVE_ID:
      return produce(state, (s) => {
        s.id = id;
      });
    case SAVE_IS_LOADING:
      return produce(state, (s) => {
        s.isLoading = isLoading;
      });

    default:
      return state;
  }
}

// selectors
export const selectOrder = state => state[namespace].order;
export const selectID = state => state[namespace].id;
export const selectIsLoading = state => state[namespace].isLoading;



