import { useEffect, useRef } from "react";
import { mount } from "app1/Bootstrap";
import { app1RoutingPrefix, shellBrowserHistory } from "../routing/constants";
import { useNavigate } from "react-router-dom";
import { store } from "../store";

const app1Basename = `/${app1RoutingPrefix}`;

export default () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to navigation events dispatched inside app1 mfe.
    const app1NavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname = `${app1Basename}${pathname}`;
      if (newPathname === shellBrowserHistory.location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener("[app1] navigated", app1NavigationEventHandler);

    // Listen to navigation events in shell app to notifify app1 mfe.
    const unlistenHistoryChanges = shellBrowserHistory.listen(
      ({ location }) => {
        if (location.pathname.startsWith(app1Basename)) {
          window.dispatchEvent(
            new CustomEvent("[shell] navigated", {
              detail: location.pathname.replace(app1Basename, ""),
            })
          );
        }
      }
    );

    mount({
      store,
      mountPoint: wrapperRef.current!,
      initialPathname: shellBrowserHistory.location.pathname.replace(
        app1Basename,
        ""
      ),
    });

    return () => {
      window.removeEventListener(
        "[app1] navigated",
        app1NavigationEventHandler
      );
      unlistenHistoryChanges();
    };
  }, []);

  return <div ref={wrapperRef} />;
};
