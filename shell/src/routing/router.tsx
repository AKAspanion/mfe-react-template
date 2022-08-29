import React, { lazy } from "react";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
} from "react-router-dom";
import { Layout } from "../layout/layout";
import { Page1 } from "../pages/Page1";
import { Page2 } from "../pages/Page2";
import { app1RoutingPrefix, shellBrowserHistory } from "./constants";

const App1Lazy = lazy(() => import("../remotes/App1"));

export function Router() {
  return (
    <HistoryRouter history={shellBrowserHistory}>
      <div style={{ border: "1px solid blue", padding: 16, margin: 16 }}>
        <h3 style={{ marginBottom: "10px" }}>Shells's router</h3>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={`/${app1RoutingPrefix}`} />} />
            <Route path={`/${app1RoutingPrefix}/*`} element={<App1Lazy />} />
            <Route path="page-1" element={<Page1 />} />
            <Route path="page-2" element={<Page2 />} />
          </Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}
