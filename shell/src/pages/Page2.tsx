import React from "react";
import { Link } from "react-router-dom";
import { app1RoutingPrefix } from "../routing/constants";

export function Page2() {
  return (
    <React.Fragment>
      <div>Page 2 from Shell</div>
      <Link to="/page-1">Go to Page 1</Link>
      <br />
      <Link to={`/${app1RoutingPrefix}/page-1`}>Go to App1 Page 1</Link>
    </React.Fragment>
  );
}
