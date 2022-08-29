import { compose, Store, Reducer } from "redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

export type ReduxAction = {
  type: string;
  payload?: unknown;
};

export type ShellState = {
  appName: string;
};

export type App1State = {
  appName: string;
};

export type ReducerMap = {
  shell?: Reducer;
  app1?: Reducer;
};

export type StoreShape = {
  shell?: ShellState;
  app1?: App1State;
};

export type ShellStore = Store<StoreShape> & {
  asyncReducers: ReducerMap;
  registerReducer: (reducers: ReducerMap) => void;
};
