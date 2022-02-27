/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DataCard, { CardAttribute } from "components/Common/DataCard";
import Badge from "components/Common/Badge";
import { MOCK_NETWORK_DETAILS } from "./mockData";
import networkDetailsIcon from "../../utils/logo/network-details.svg";
import usFlagIcon from "../../utils/logo/usFlag.svg";

export const NetworkDetails = (): JSX.Element => {
  const { ipAddress, ipType, vpn, proxy, city, region, country, location } = MOCK_NETWORK_DETAILS;

  const attributes: CardAttribute[] = [
    {
      key: "IP Address",
      value: ipAddress,
    },
    {
      key: "IP Type",
      value: ipType,
    },
    {
      key: "VPN",
      value: <Badge title={vpn} />,
    },
    {
      key: "Proxy",
      value: <Badge title={proxy} />,
    },
    {
      key: "City",
      value: city,
    },
    {
      key: "Region",
      value: region,
    },
    {
      key: "Country",
      value: (
        <>
          <img src={usFlagIcon} alt="" />
          <span style={{ marginLeft: 8 }}>{country}</span>
        </>
      ),
    },
    {
      key: "Location",
      value: location,
    },
  ];

  return <DataCard header="Network details" attributes={attributes} icon={<img src={networkDetailsIcon} alt="" />} />;
};
