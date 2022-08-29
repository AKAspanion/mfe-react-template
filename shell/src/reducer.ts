import { ReduxAction } from "../../@types/shared-store";

export const initialState = {
  appName: "shell",
};

export const CHANGE_SHELL_APP_NAME = "CHANGE_SHELL_APP_NAME";

export const changeAppNameAction = (appName: string) => {
  return { type: CHANGE_SHELL_APP_NAME, payload: appName };
};

const reducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case CHANGE_SHELL_APP_NAME: {
      return {
        ...state,
        appName: action.payload,
      };
    }
  }
  return state;
};

export const reducers = { shell: reducer };
