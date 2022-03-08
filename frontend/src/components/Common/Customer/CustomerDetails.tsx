import React from "react";
import { BiUserCircle } from "react-icons/bi";
import DataCard, { CardAttribute } from "../DataCard";
import { Link } from "../Links";

const HEADER = "Customer Details";

interface CustomerDetailsProps {
  firstName: string;
  lastName: string;
  customerScore: string;
  emailAddress: string;
  city: string;
  phone: string;
  carrier: string;
  phoneCountry: string;
  dateOfBirth: string;
  timestamp: string;
  flow: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  facebookLink: string;
  twitterLink: string;
  linkedInLink: string;
}

const CustomerDetails = (props: CustomerDetailsProps): JSX.Element => {
  const {
    firstName,
    lastName,
    customerScore,
    emailAddress,
    city,
    phone,
    carrier,
    phoneCountry,
    dateOfBirth,
    timestamp,
    flow,
    isEmailVerified,
    isPhoneVerified,
    facebookLink,
    linkedInLink,
    twitterLink,
  } = props;
  const attributes: CardAttribute[] = [
    {
      key: "Full Name",
      value: (
        <Link
          id="nameSearhLink"
          href={`https://www.google.com/search?q=%22${firstName}+${lastName}%22+${city}`}
          rel="noreferrer"
          target="_blank"
        >
          {firstName} {lastName}
        </Link>
      ),
      toolTip: "Customer's full name, provided by you",
    },
    {
      key: "Customer Score",
      value: customerScore,
      toolTip: "Riskiness score of this customer session (0-100).",
    },
    {
      key: "Email Address",
      value: (
        <Link id="emailSearhLink" href={`https://www.google.com/search?q=${emailAddress}`} rel="noreferrer" target="_blank">
          {emailAddress}
        </Link>
      ),
      toolTip: "Email Address of customer, provided by you",
    },
    {
      key: "Is Email Verified",
      value: isEmailVerified ? "true" : "false",
      toolTip: "If email was verified by you",
    },
    {
      key: "Phone",
      value: (
        <Link id="phoneSearhLink" href={`https://www.google.com/search?q=${phone}`} rel="noreferrer" target="_blank">
          {phone}
        </Link>
      ),
      toolTip: "Phone of customer, provided by you",
    },
    {
      key: "Is Phone Verified",
      value: isPhoneVerified ? "true" : "false",
      toolTip: "If phone number was verified by you",
    },
    {
      key: "Carrier",
      value: carrier,
      toolTip: "Carrier provider for phone number",
    },
    {
      key: "Phone Country",
      value: phoneCountry,
      toolTip: "Country code based on phone number",
    },
    {
      key: "Date Of Birth",
      value: dateOfBirth,
      toolTip: "Customer's date of birth, provided by you",
    },
    {
      key: "Date",
      value: timestamp,
      toolTip: "Date of session occured",
    },
    {
      key: "Flow",
      value: flow,
      toolTip: "Session flow, provided by you",
    },
  ];

  if (facebookLink) {
    attributes.push({
      key: "Facebook Link",
      value: (
        <Link id="facebookLink" href={facebookLink} rel="noreferrer" target="_blank">
          {facebookLink}
        </Link>
      ),
      toolTip: "Facebook Link associated to given email address",
    });
  }

  if (twitterLink) {
    attributes.push({
      key: "Twitter Link",
      value: (
        <Link id="twitterLink" href={twitterLink} rel="noreferrer" target="_blank">
          {twitterLink}
        </Link>
      ),
      toolTip: "Twitter Link associated to given email address",
    });
  }

  if (linkedInLink) {
    attributes.push({
      key: "LinkedIn Link",
      value: (
        <Link id="linkedInLink" href={linkedInLink} rel="noreferrer" target="_blank">
          {linkedInLink}
        </Link>
      ),
      toolTip: "LinkedIn Link associated to given email address",
    });
  }

  return <DataCard header={HEADER} attributes={attributes} icon={<BiUserCircle size={28} />} />;
};

export default CustomerDetails;
