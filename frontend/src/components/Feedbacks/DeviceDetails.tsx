import DataCard, { CardAttribute } from "components/Common/DataCard";
import { MOCK_DEVICE_DETAILS } from "./mockData";
import { TextWithStatus } from "./styles";
import deviceIcon from "../../utils/logo/device.svg";

export const DeviceDetails = (): JSX.Element => {
  const {
    browser,
    createdAt,
    deviceId,
    reputation,
    emulator,
    fingerprintId,
    confidenceScore,
    remoteSoftware,
    screenResolution,
    deviceModel,
    behaviorBiometricLevel,
    deviceAgeHours,
  } = MOCK_DEVICE_DETAILS;

  const attributes: CardAttribute[] = [
    {
      key: "Browser",
      value: browser,
    },
    {
      key: "Created at",
      value: createdAt,
    },
    {
      key: "Device ID",
      value: deviceId,
    },
    {
      key: "Reputation",
      value: <TextWithStatus $color="#969AB6">{reputation}</TextWithStatus>,
    },
    {
      key: "Emulator",
      value: emulator ? "True" : "False",
    },
    {
      key: "Fingerprint ID",
      value: fingerprintId,
    },
    {
      key: "Confidence Score",
      value: confidenceScore,
    },
    {
      key: "Remote Software",
      value: remoteSoftware ? "True" : "False",
    },
    {
      key: "Screen resolution",
      value: screenResolution,
    },
    {
      key: "Device Model",
      value: deviceModel,
    },
    {
      key: "Behavior Biometric Level",
      value: behaviorBiometricLevel,
    },
    {
      key: "Device age hours",
      value: deviceAgeHours,
    },
  ];

  return <DataCard header="Device details" attributes={attributes} icon={<img src={deviceIcon} alt="" />} />;
};
