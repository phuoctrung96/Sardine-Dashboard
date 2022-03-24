import React from "react";
import ReasonCodeList from "components/ReasonCodeList";
import { dedupeArrayObject } from "sardine-dashboard-typescript-definitions";
import { AllReasonCodes } from "./reasoncodes";

export const ReasonCodesFromArray = ({ reasonCodeArray }: { reasonCodeArray: Array<string> }): JSX.Element => {
  const reasonCodes = reasonCodeArray.map((code) => ({
    code,
    description: AllReasonCodes[code],
  }));
  return <ReasonCodeList reason_codes={dedupeArrayObject(reasonCodes)} />;
};

export const renderReasonCodes = (reasonCodesArg: string): JSX.Element | "-" => {
  const reasonCodesStr = reasonCodesArg.replace(/ /g, "");
  if (reasonCodesStr.length === 0) {
    return "-";
  }
  return <ReasonCodesFromArray reasonCodeArray={reasonCodesStr.split(",").map((v) => v.replace(/"/, ""))} />;
};
