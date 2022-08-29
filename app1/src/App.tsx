// App.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers,
  StoreEnhancer,
} from "redux";
import thunk from "redux-thunk";
import { ShellStore, StoreShape } from "../../@types/shared-store";
import { changeAppNameAction, reducers } from "./reducer";

const AppWithStore: React.FC<{ store?: ShellStore }> = (props) => {
  const { store } = props;

  useEffect(() => {
    if (store) {
      store.registerReducer({ ...reducers });
    }
  }, []);

  const getLocalStore = useCallback(
    () =>
      createStore(
        combineReducers({ ...reducers }),
        undefined,
        compose(
          applyMiddleware(thunk),
          window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f: unknown) => f
        ) as StoreEnhancer<unknown>
      ),
    []
  );

  return (
    <Provider store={store || getLocalStore()}>
      <App />
    </Provider>
  );
};

const remoteAppScope = "app1";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: StoreShape) => state[remoteAppScope]);
  const [remoteAppInput, setRemoteAppInput] = useState("");

  return (
    <div style={{ border: "1px solid red", padding: 16, margin: 16 }}>
      <h1>Hello from Apptication 1</h1>
      <div style={{ marginBottom: "10px" }}>
        RemoteApp's name from the redux store :{" "}
        <strong>{state && state?.appName}</strong>
      </div>

      <div>
        <input
          style={{ marginRight: "10px" }}
          type="text"
          onChange={(e) => {
            setRemoteAppInput(e.target.value);
          }}
        />
        <button onClick={() => dispatch(changeAppNameAction(remoteAppInput))}>
          Dispatch app1 new name
        </button>
      </div>
    </div>
  );
};

export default AppWithStore;
