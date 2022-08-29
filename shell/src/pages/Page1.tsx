import React from "react";
import { Link } from "react-router-dom";
import { app1RoutingPrefix } from "../routing/constants";

export function Page1() {
  return (
    <React.Fragment>
      <div>Page 1 from Shell</div>
      <Link to="/page-2">Go to Page 2</Link>
      <br />
      <Link to={`/${app1RoutingPrefix}/page-2`}>Go to App1 Page 2</Link>
    </React.Fragment>
  );
}
