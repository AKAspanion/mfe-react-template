import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  StoreEnhancer,
} from "redux";
import thunk from "redux-thunk";
import { ReducerMap, ReduxAction, ShellStore } from "../../@types/shared-store";
import { reducers } from "./reducer";

const configureStore = (): ShellStore => {
  const enhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: unknown) => f
  );

  const store = createStore(
    combineReducers({}),
    enhancer as StoreEnhancer<unknown>
  ) as ShellStore;

  store.asyncReducers = {};

  const createRootReducer = (newReducers: ReducerMap) => {
    const appReducer = combineReducers(newReducers);

    return (
      state: ReturnType<typeof appReducer> | undefined,
      action: ReduxAction
    ) => {
      return appReducer(state, action);
    };
  };

  store.registerReducer = (newReducers: ReducerMap) => {
    store.asyncReducers = { ...store.asyncReducers, ...newReducers };

    store.replaceReducer(createRootReducer(store.asyncReducers));
  };

  return store;
};

export default configureStore;

export const store = configureStore();

store.registerReducer({ ...reducers });
