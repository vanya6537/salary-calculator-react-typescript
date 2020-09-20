import React from "react";
import { Props } from "@components/AmountInputField/types";
import { Field } from "redux-form";

export const AmountInputField = ({
  amountLabel,
  onChangeAmount,
}: Props): JSX.Element => {
  return (
    <>
      {amountLabel && (
        <div className="pl-4 pt-3 form-inline form-row">
          <div className="form-group">
            <Field
              type="text"
              component="input"
              id="monthlyAmount"
              onChange={onChangeAmount}
              name="monthlyAmount"
              className="form-control-sm col-8"
            />
            <label htmlFor="monthlyAmount" className="pl-2 font-weight-bold">
              {amountLabel}
            </label>
          </div>
        </div>
      )}
    </>
  );
};
