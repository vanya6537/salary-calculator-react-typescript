import React from "react";
import { Props } from "@components/NDFLSwitcher/types";
import { Field } from "redux-form";

export const NDFLSwitcher = ({ withNDFL, onChange }: Props): JSX.Element => {
  return (
    <div className="custom-control-inline pl-4">
      <div className="inline-block">
        <span
          className={
            !withNDFL
              ? "small font-weight-bold pr-2 text-black-50"
              : "small font-weight-bold pr-2"
          }
        >
          Указать с НДФЛ
        </span>
      </div>
      <div className="custom-control custom-switch">
        <Field
          type="checkbox"
          component="input"
          className="custom-control-input"
          id="switch1"
          checked={!withNDFL}
          onChange={onChange}
          name="switch1"
        />
        <label className="custom-control-label" htmlFor="switch1">
          <span
            className={
              withNDFL
                ? "small font-weight-bold text-black-50"
                : "small font-weight-bold"
            }
          >
            Без НДФЛ
          </span>
        </label>
      </div>
    </div>
  );
};
