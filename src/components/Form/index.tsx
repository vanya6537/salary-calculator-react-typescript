import React, { useCallback, useState } from "react";
import { change, InjectedFormProps, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import { Multiplier, PaymentType } from "@components/Form/types";

import ReactTooltip from "react-tooltip";
import { InfoBoard } from "@components/InfoBoard";
import { NDFLSwitcher } from "@components/NDFLSwitcher";
import { AmountInputField } from "@components/AmountInputField";
import { TooltipBody } from "@components/TooltipBody";
import { RadioField } from "@components/RadioField";

const initialValues = {
  monthlyAmount: "40000",
  tooltipIsPresent: false,
  tooltipRef: null,
  withNDFL: false,
};

const getAmountLabel = (paymentType: PaymentType): JSX.Element | undefined => {
  switch (paymentType) {
    case PaymentType.DAILY:
      return <span>&#8381; в день</span>;
    case PaymentType.HOURLY:
      return <span>&#8381; в час</span>;
    case PaymentType.MONTHLY:
      return <span>&#8381;</span>;
    case PaymentType.MROT:
      return undefined;
  }
};

const paymentFields = [
  {
    text: "Оклад за месяц",
    key: PaymentType.MONTHLY,
  },
  {
    text: "МРОТ",
    key: PaymentType.MROT,
    additionalInfo:
      "МРОТ - минимальный размер<br/>оплаты труда. Разный для<br/> разных регионов.",
  },
  {
    text: "Оплата за день",
    key: PaymentType.DAILY,
  },

  {
    text: "Оплата за час",
    key: PaymentType.HOURLY,
  },
];

// const amountInputLabels: { [key: string]: string } = {};
const SalaryForm = ({ handleSubmit }: InjectedFormProps): JSX.Element => {
  const dispatch = useDispatch();
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PaymentType.MONTHLY
  );
  const [withNDFL, setNDFL] = useState<boolean>(initialValues.withNDFL);
  const [tooltipRef, setTooltipRef] = useState<HTMLAnchorElement | null>(
    initialValues.tooltipRef
  );
  const [tooltipIsVisible, setTooltipVisibility] = useState<boolean>(
    initialValues.tooltipIsPresent
  );
  const [tooltipIsClicked, setTooltipClickState] = useState<boolean>(
    initialValues.tooltipIsPresent
  );
  const [monthlyAmount, setMonthlyAmount] = useState<string>(
    initialValues.monthlyAmount
  );
  const toggleNDFL = useCallback(() => {
    setNDFL(!withNDFL);
  }, [withNDFL, setNDFL]);

  const onClickRadio = useCallback(
    (e) => {
      const newType = e.target.value.toString();
      if (newType !== PaymentType.MROT) {
        const visibleAmount = Number(
          +monthlyAmount / Multiplier[newType as PaymentType]
        );
        dispatch(
          change("salary", "monthlyAmount", visibleAmount.toFixed(0).toString())
        );
      }
      setPaymentType(newType);
    },
    [
      setPaymentType,
      change,
      dispatch,
      monthlyAmount,
      PaymentType,
      paymentType,
      Multiplier,
    ]
  );
  const radioFieldsInfo = paymentFields.map(
    ({ text, key, additionalInfo }) => ({
      labelText: text,
      name: key,
      checked: paymentType === key,
      onClick: onClickRadio,
      additionalInfo,
    })
  );
  const onChangeAmount = useCallback(
    (e) => {
      const newMonthlyAmount = Number(e.target.value) * Multiplier[paymentType];
      setMonthlyAmount(newMonthlyAmount.toString());
    },
    [setMonthlyAmount, paymentType, Multiplier]
  );

  const onClickTooltip = useCallback(() => {
    if (tooltipRef) {
      if (tooltipIsVisible) {
        if (tooltipIsClicked) {
          ReactTooltip.hide(tooltipRef);
          setTooltipVisibility(false);
          setTooltipClickState(false);
        } else {
          setTooltipClickState(true);
        }
      } else {
        ReactTooltip.show(tooltipRef);
        setTooltipVisibility(true);
        setTooltipClickState(true);
      }
    }
  }, [
    tooltipRef,
    ReactTooltip,
    tooltipIsVisible,
    tooltipIsClicked,
    setTooltipVisibility,
    setTooltipClickState,
  ]);

  const onMouseLeaveTooltip = useCallback(() => {
    if (tooltipRef) {
      if (tooltipIsVisible && !tooltipIsClicked) {
        ReactTooltip.hide(tooltipRef);
        setTooltipVisibility(false);
      }
    }
  }, [
    tooltipRef,
    ReactTooltip,
    tooltipIsVisible,
    tooltipIsClicked,
    setTooltipVisibility,
  ]);

  const onMouseEnterTooltip = useCallback(() => {
    if (tooltipRef && !tooltipIsVisible) {
      setTooltipVisibility(true);
      ReactTooltip.show(tooltipRef);
    }
  }, [tooltipRef, ReactTooltip, tooltipIsVisible, setTooltipVisibility]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {radioFieldsInfo.map(
          ({ labelText, name, checked, onClick, additionalInfo }) => (
            <div key={`radio-${name}`} className="custom-control custom-radio">
              <RadioField
                name={name}
                isChecked={checked}
                labelText={labelText}
                onClick={onClick}
              />
              {additionalInfo && (
                <TooltipBody
                  onMouseEnter={onMouseEnterTooltip}
                  onMouseLeave={onMouseLeaveTooltip}
                  textInfo={additionalInfo}
                  onClick={onClickTooltip}
                  setRef={setTooltipRef}
                  isClicked={tooltipIsClicked}
                />
              )}
            </div>
          )
        )}
        <NDFLSwitcher onChange={toggleNDFL} withNDFL={withNDFL} />
        <AmountInputField
          amountLabel={getAmountLabel(paymentType)}
          onChangeAmount={onChangeAmount}
        />
      </form>
      {paymentType === PaymentType.MONTHLY && (
        <InfoBoard
          className="mt-4 rounded shadow-sm d-flex flex-column"
          id="info-board"
          withNDFL={withNDFL}
          monthlyAmount={monthlyAmount}
        />
      )}
      <div className="pt-5">
        <pre>
          {JSON.stringify(
            {
              paymentType,
              withNDFL,
              tooltipIsVisible,
              tooltipIsClicked,
              monthlyAmount: monthlyAmount,
            },
            undefined,
            2
          )}
        </pre>
      </div>
      <ReactTooltip
        id="tooltip"
        multiline
        effect="solid"
        place="right"
        clickable
      />
    </>
  );
};
export const Form = reduxForm({
  form: "salary",
  initialValues,

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
})(SalaryForm);
