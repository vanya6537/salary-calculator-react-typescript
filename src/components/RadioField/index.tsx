import React from "react";
import { Props } from "@components/RadioField/types";
import { Field } from "redux-form";

export function RadioField({
  name,
  isChecked,
  onClick,
  labelText,
}: Props): JSX.Element {
  return (
    <>
      <Field
        type="radio"
        component="input"
        id={name}
        checked={isChecked}
        onClick={onClick}
        name={name}
        value={name}
        className="form-control custom-control-input shadow-none "
      />
      <label
        htmlFor={name}
        className="pl-2 font-weight-bold custom-control-label shadow-none "
      >
        {labelText}
      </label>
    </>
  );
}
