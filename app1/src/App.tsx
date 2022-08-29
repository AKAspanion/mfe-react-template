// App.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers,
  StoreEnhancer,
} from "redux";
import thunk from "redux-thunk";
import { HistoryStrategy } from "../../@types/shared-route";
import { ShellStore, StoreShape } from "../../@types/shared-store";
import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";
import { changeAppNameAction, reducers } from "./reducer";

const remoteAppScope = "app1";

export declare type AppProps = {
  history: HistoryStrategy;
  store?: ShellStore;
  children?: React.ReactNode;
};

const AppDefault: React.FC<AppProps> = (props) => {
  return <AppWithRoute {...props} />;
};

const AppWithRoute: React.FC<AppProps> = (props) => {
  const { history } = props;

  useEffect(() => {
    const unlistenHistoryChanges = history.listen(
      ({ location: { pathname } }) => {
        window.dispatchEvent(
          new CustomEvent("[app1] navigated", { detail: pathname })
        );
      }
    );

    const shellNavigationHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const { pathname: currentPathname } = history.location;
      if (currentPathname === pathname) {
        return;
      }
      history.push(pathname);
    };

    window.addEventListener("[shell] navigated", shellNavigationHandler);

    return () => {
      window.removeEventListener("[shell] navigated", shellNavigationHandler);
      unlistenHistoryChanges();
    };
  }, [history]);

  return (
    <AppWithStore {...props}>
      <div style={{ border: "1px solid red", padding: 16, margin: 16 }}>
        <h3 style={{ marginBottom: "10px" }}>RemoteApp's router</h3>
        <HistoryRouter history={history}>
          <Routes>
            <Route index element={<Page1 />} />
            <Route path="page-1" element={<Page1 />} />
            <Route path="page-2" element={<Page2 />} />
          </Routes>
        </HistoryRouter>
      </div>
    </AppWithStore>
  );
};

const AppWithStore: React.FC<AppProps> = (props) => {
  const { store, children } = props;

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
      {children}
    </Provider>
  );
};

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

export default AppDefault;

AppDefault.displayName = "App1";
