import React from "react";
import { Props } from "@components/TooltipBody/types";

export function TooltipBody({
  onMouseEnter,
  onMouseLeave,
  textInfo,
  onClick,
  setRef,
  isClicked,
}: Props): JSX.Element {
  return (
    <a
      href="#"
      data-for="tooltip"
      data-tip={textInfo}
      data-event="no-event"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      ref={(ref: HTMLAnchorElement | null) => setRef(ref)}
      datatype="info"
    >
      {isClicked ? (
        <i className="far fa-times-circle pl-2 text-black-50" />
      ) : (
        <i className="fas fa-info-circle pl-2 text-black-50" />
      )}
    </a>
  );
}
