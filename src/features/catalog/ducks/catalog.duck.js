
import { createSlice } from "@reduxjs/toolkit";
import { all, take, takeEvery, put, select, call } from 'redux-saga/effects';

export const namespace = 'catalog';

const slice = createSlice({
  name: namespace,
  initialState: {
    isOpen: false,
    isLoading: false,
    data: null,
    error: null,
    categories:[]
  },
  reducers: {
    loadStart: (state, action) => {
      state.isLoading = true;
    },
    loadEnd: (state, action) => {
      let { payload: { data = [], error = null } } = action;
      state.isLoading = false;
      state.data = data;
      state.error = error;
    },
    loadOld: () => {},
    load: (state, action)=>{},
    setIsOpen: (s, a) => {
      s.isOpen = a.payload.value;
    }
  },
});

export const { loadStart, loadEnd, setIsOpen, load } = slice.actions;


export const reducer = slice.reducer;

export const selectIsLoading = (s) => s[namespace].isLoading;
export const selectData = (s) => s[namespace].data;
export const selectError = (s) => s[namespace].error;
export const selectIsOpen = (s) => s[namespace].isOpen;

function* loadDataSaga() {
  yield put(loadStart());

  let error = null,
      data = [];

  try {
    let response = yield call(fetch, "https://60bb880442e1d00017620c95.mockapi.io/category");
    data = yield call(() => response.json());
  } catch (e) {
    error = e.message;
  }

  yield put(loadEnd({
    data,
    error,
  }));
}



export const sagas = function* () {


  yield all([
    // put your sagas here
    takeEvery(load, loadDataSaga),

  ]);
};


/*
export function* saga() {
  console.log('----------------- saga started');
  yield takeEvery(load, loadDataSaga);

}
 */

