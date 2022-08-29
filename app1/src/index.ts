import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("app1-root");

  if (localRoot) {
    mount({ mountPoint: localRoot! });
  }
});

export {};
