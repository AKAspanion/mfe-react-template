import { createBrowserHistory, Update } from "history";

import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("app1-root");
  const browserHistory = createBrowserHistory();

  mount({
    mountPoint: localRoot!,
    historyStrategy: browserHistory,
  });
});
