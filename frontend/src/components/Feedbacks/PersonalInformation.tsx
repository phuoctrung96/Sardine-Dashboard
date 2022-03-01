/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DataCard, { CardAttribute } from "components/Common/DataCard";
import { BiUserCircle } from "react-icons/bi";
import { MOCK_PERSONAL_INFORMATION } from "./mockData";
import { TextWithStatus } from "./styles";
import usFlagIcon from "../../utils/logo/usFlag.svg";

export const PersonalInformation = (): JSX.Element => {
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
  } = MOCK_PERSONAL_INFORMATION;

  const attributes: CardAttribute[] = [
    {
      key: "Email Address",
      value: emailAddress,
    },
    {
      key: "Email Verified",
      value: isEmailVerified ? (
        <TextWithStatus $color="#3147FF">Verified</TextWithStatus>
      ) : (
        <TextWithStatus $color="none">Not verified</TextWithStatus>
      ),
    },
    {
      key: "Phone",
      value: phone,
    },
    {
      key: "Work Phone",
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
      value: (
        <>
          <img src={usFlagIcon} alt="" />
          <span style={{ marginLeft: 8 }}>{phoneCountry}</span>
        </>
      ),
    },
    {
      key: "Phone verified",
      value: isPhoneVerified ? (
        <TextWithStatus $color="#3147FF">Verified</TextWithStatus>
      ) : (
        <TextWithStatus $color="#969AB6">Not verified</TextWithStatus>
      ),
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
