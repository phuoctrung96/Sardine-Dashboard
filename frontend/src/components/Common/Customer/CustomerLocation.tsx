import React from "react";
import DataCard, { CardAttribute } from "../DataCard";
import { Link } from "../Links";

const HEADER = "Location";

interface CustomerDetailsProps {
  address: string;
  city: string;
  postalCode: string;
  regionCode: string;
  countryCode: string;
  mapAddress?: string;
}

const CustomerLocation: React.FC<CustomerDetailsProps> = (props) => {
  const { address, city, countryCode, postalCode, regionCode, mapAddress } = props;

  const attributes: CardAttribute[] = [
    {
      key: "Address",
      value: (
        <Link id="address_link" href={mapAddress} rel="noreferrer" target="_blank">
          {address}
        </Link>
      ),
      toolTip: "Customer's address, provided by you",
    },
    {
      key: "City",
      value: city,
      toolTip: "Customer's city, provided by you",
    },
    {
      key: "Postal Code",
      value: postalCode,
      toolTip: "Customer's postal code, provided by you",
    },
    {
      key: "Region Code",
      value: regionCode,
      toolTip: "Customer's region code, provided by you",
    },
    {
      key: "Country Code",
      value: countryCode,
      toolTip: "Customer's country code, provided by you",
    },
  ];
  return <DataCard header={HEADER} attributes={attributes} />;
};

export default CustomerLocation;
