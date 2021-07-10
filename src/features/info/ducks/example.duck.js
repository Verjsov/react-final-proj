import { all } from "redux-saga/effects"
import { featureConf } from "../config";

export const namespace = `${featureConf.name}/example`;

export function reducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const sagas = function* () {
  yield all([
    // put your sagas here
  ]);
};
