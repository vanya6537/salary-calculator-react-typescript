import React from "react";
import CurrencyFormat from "react-currency-format";
import { Props } from "@components/InfoBoard/types";

export const InfoBoard = ({
  withNDFL,
  monthlyAmount,
  ...rest
}: Props): JSX.Element => {
  const getAmountSummary = (): string =>
    withNDFL ? monthlyAmount : (Number(monthlyAmount) / 0.87).toFixed(0);

  const getAmountNDFL = (): string =>
    (Number(getAmountSummary()) * 0.13).toFixed(0);

  const getAmountNetSalary = (): number | string =>
    (Number(getAmountSummary()) - Number(getAmountNDFL())).toFixed(0);

  return (
    <div {...rest}>
      <div className="pl-4 pt-4">
        <span>
          <span className="font-weight-bold">
            <CurrencyFormat
              value={getAmountNetSalary()}
              displayType={"text"}
              thousandSeparator={" "}
            />{" "}
            &#8381;
          </span>{" "}
          сотрудник будет получать на руки
        </span>
      </div>
      <div className="p-2 pl-4">
        <span>
          <span className="font-weight-bold">
            <CurrencyFormat
              value={getAmountNDFL()}
              displayType={"text"}
              thousandSeparator={" "}
            />{" "}
            &#8381;
          </span>{" "}
          НДФЛ, 13% от оклада
        </span>
      </div>
      <div className="pl-4 pb-4">
        <span>
          <span className="font-weight-bold">
            <CurrencyFormat
              value={getAmountSummary()}
              displayType={"text"}
              thousandSeparator={" "}
            />{" "}
            &#8381;
          </span>{" "}
          за сотрудника в месяц
        </span>
      </div>
    </div>
  );
};
