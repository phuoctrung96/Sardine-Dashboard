/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DataCard, { CardAttribute } from "components/Common/DataCard";
import { BiUserCircle } from "react-icons/bi";

export const PersonalInformation = (props): JSX.Element => {
  const {
    emailAddress,
    isEmailVerified,
    phone,
    dateOfBirth,
    phoneCountry,
    timestamp,
    isPhoneVerified,
    facebook,
    linkedIn,
    twitter,
  } = props;
  const attributes: CardAttribute[] = [
    {
      key: "Email Address",
      value: emailAddress,
    },
    {
      key: "Email Verified",
      value: isEmailVerified,
    },
    {
      key: "Phone",
      value: phone,
    },
    {
      key: "Phone",
      value: phone,
    },
    {
      key: "Date of birth",
      value: dateOfBirth,
    },
    {
      key: "Timestamp",
      value: timestamp,
    },
    {
      key: "Phone country",
      value: phoneCountry,
    },
    {
      key: "Phone verified",
      value: isPhoneVerified,
    },
    {
      key: "Facebook",
      value: facebook,
    },
    {
      key: "LinkedIn",
      value: linkedIn,
    },
    {
      key: "Twitter",
      value: twitter,
    },
  ];

  return <DataCard header="Personal Information" attributes={attributes} icon={<BiUserCircle size={28} />} />;
};
