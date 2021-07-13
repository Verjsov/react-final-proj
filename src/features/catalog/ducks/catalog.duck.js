
import { createSlice } from "@reduxjs/toolkit";
import { all, take, takeEvery, put, select, call } from 'redux-saga/effects';

export const namespace = 'catalog';

const slice = createSlice({
  name: namespace,
  initialState: {
    isOpen: false,
    isLoading: false,
    cats: [],
    catsNames: [],
    catsStates: [],
    error: null,
    categories:[]
  },
  reducers: {
    loadStart: (state, action) => {
      state.isLoading = true;
    },
    loadEnd: (state, action) => {
      let { payload: { cats = [],catsNames = [],catsStates= [] , error = null } } = action;
      state.isLoading = false;
      state.cats = cats;
      state.catsNames = catsNames;
      state.catsStates = catsStates;
      state.error = error;
    },
    load: (state, action)=>{},
    setIsOpen: (s, a) => {
      s.isOpen = a.payload.value;
    }
  },
});

export const { loadStart, loadEnd, setIsOpen, load } = slice.actions;


export const reducer = slice.reducer;

export const selectIsLoading = (s) => s[namespace].isLoading;
export const selectCats = (s) => s[namespace].cats;
export const selectCatsName = (s) => s[namespace].catsNames;
export const selectCatsState = (s) => s[namespace].catsStates;
export const selectError = (s) => s[namespace].error;
export const selectIsOpen = (s) => s[namespace].isOpen;

function* loadDataSaga() {
  yield put(loadStart());

  let error = null,
      cats = [],
      catsNames = [],
      catsStates = [];

  try {
    let response = yield call(fetch, "https://60bb880442e1d00017620c95.mockapi.io/category");
    const dataCat = yield call(() => response.json());

    dataCat.forEach(function(category){
      cats.push(category.id);
      catsNames.push(category.name);
    });
    cats.forEach(function(cat,i){
      let st = {
        id:cat,
        state: false,
      };
      catsStates.push(st);
    });


  } catch (e) {
    error = e.message;
  }

  yield put(loadEnd({
    cats,
    catsNames,
    catsStates,
    error,
  }));
}



export const sagas = function* () {

  console.log('----------------- saga started');
  yield all([
    takeEvery(load, loadDataSaga),
  ]);
};


/*
export function* saga() {
  console.log('----------------- saga started');
  yield takeEvery(load, loadDataSaga);

}
 */

