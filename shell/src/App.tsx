import React, { Suspense, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { StoreShape } from "../../@types/shared-store";
import { changeAppNameAction } from "./reducer";
import { Router } from "./routing/router";

import { store } from "./store";

const App1 = React.lazy(() => import("app1/App"));

const AppWithRoute = () => (
  <Provider store={store}>
    <App />
    <Suspense fallback={<div>Loading...</div>}>
      <Router />
    </Suspense>
  </Provider>
);

const appScope = "shell";
const remoteAppScope = "app1";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: StoreShape) => state[appScope]);
  const remoteState = useSelector((state: StoreShape) => state[remoteAppScope]);
  const [shellAppInput, setShellAppInput] = useState("");

  return (
    <div style={{ border: "1px solid blue", padding: 16, margin: 16 }}>
      <h1>Hello from Shell</h1>
      <div style={{ marginBottom: "10px" }}>
        Shell App's name from the redux store :{" "}
        <strong>{state && state.appName}</strong>
      </div>
      <div style={{ marginBottom: "10px" }}>
        Remote App's name from the redux store :{" "}
        <strong>{remoteState && remoteState.appName}</strong>
      </div>

      <div>
        <input
          style={{ marginRight: "10px" }}
          type="text"
          onChange={(e) => {
            setShellAppInput(e.target.value);
          }}
        />
        <button onClick={() => dispatch(changeAppNameAction(shellAppInput))}>
          Dispatch shell new name
        </button>
      </div>
    </div>
  );
};

export default AppWithRoute;

AppWithRoute.displayName = "Shell";
