import React, { useCallback, useState } from "react";
import { Provider } from "react-redux";
import { Form } from "@components/Form";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "@assets/scss/App.sass";
import { hot } from "react-hot-loader";

function SalaryApp() {
  const [theme, setTheme] = useState<string>("default");
  const toggleTheme = useCallback(() => {
    setTheme(theme === "default" ? "redesign" : "default");
  }, [setTheme, theme]);

  return (
    <Provider store={store}>
      <div
        className={
          theme == "default"
            ? "container-fluid app-wrapper"
            : "container-fluid app-wrapper redesign"
        }
      >
        <div className="app pt-lg-5">
          <div className="pb-2 mx-auto">
            <span
              className="small text-black-50 font-weight-bold"
              id="form-title"
            >
              Сумма
            </span>
          </div>
          <div className="pl-sm-1">
            <Form />
          </div>
          <div>
            <button
              id="color-changer"
              className="btn-lg btn-primary w-100 font-weight-bold"
              onClick={toggleTheme}
            >
              Change colors
            </button>
          </div>
        </div>
      </div>
    </Provider>
  );
}

declare let module: Record<string, unknown>;

export const App = hot(module)(SalaryApp);
