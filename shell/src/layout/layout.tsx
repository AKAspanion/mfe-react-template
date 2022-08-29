import React from "react";
import { Link, Outlet } from "react-router-dom";
import { app1RoutingPrefix } from "../routing/constants";

export function Layout() {
  return (
    <>
      <nav style={{ marginBottom: "3rem" }}>
        <Link
          to={`/${app1RoutingPrefix}/page-1`}
          style={{ marginRight: "1rem" }}
        >
          App1 Page1
        </Link>
        <Link
          to={`/${app1RoutingPrefix}/page-2`}
          style={{ marginRight: "1rem" }}
        >
          App1 Page2
        </Link>
        <Link to={`/page-1`} style={{ marginRight: "1rem" }}>
          Shell Page1
        </Link>
        <Link to={`/page-2`}>Shell Page2</Link>
      </nav>
      <Outlet />
    </>
  );
}
