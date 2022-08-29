import React, { Suspense } from "react";

const App1 = React.lazy(() => import("app1/App"));

const App = () => (
  <>
    <h1>Hello from Shell</h1>
    <Suspense fallback={<div>Loading...</div>}>
      <App1 />
    </Suspense>
  </>
);

export default App;
