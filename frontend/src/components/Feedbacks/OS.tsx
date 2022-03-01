/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DataCard, { CardAttribute } from "components/Common/DataCard";
import Badge from "components/Common/Badge";
import { MOCK_OS } from "./mockData";
import osIcon from "../../utils/logo/os.svg";

export const OS = (): JSX.Element => {
  const { os, trueOS, osAnomally } = MOCK_OS;

  const attributes: CardAttribute[] = [
    {
      key: "OS",
      value: os,
    },
    {
      key: "True OS",
      value: trueOS,
    },
    {
      key: "OS Anomally",
      value: <Badge title={osAnomally} />,
    },
  ];

  return <DataCard header="OS" attributes={attributes} icon={<img src={osIcon} alt="" />} />;
};
