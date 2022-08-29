import("./bootstrap").then(({ mount }) => {
  const localRoot = document.getElementById("shell-root");

  if (localRoot) {
    mount({ mountPoint: localRoot! });
  }
});

export {};
