/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import BehaviorBiometrics from "components/BehaviorBiometrics";
import CircularRiskLevel from "components/Common/CircularRiskLevel";
import CustomerEmail from "components/Common/Customer/CustomerEmail";
import CustomerPhone from "components/Common/Customer/CustomerPhone";
import CustomerTaxDetails from "components/Common/Customer/CustomerTaxDetails";
import DataCard from "components/Common/DataCard";
import { StyledStickyNav } from "components/Dashboard/styles";
import { Address } from "components/Feedbacks/Address";
import { BankDetail } from "components/Feedbacks/BankDetail";
import { CardDetails } from "components/Feedbacks/CardDetails";
import { CryptoAddresses } from "components/Feedbacks/CryptoAddresses";
import { DeviceDetails } from "components/Feedbacks/DeviceDetails";
import { MOCK_BEHAVIOR_BIOMETRICS } from "components/Feedbacks/mockData";
import { NetworkDetails } from "components/Feedbacks/NetworkDetails";
import { OS } from "components/Feedbacks/OS";
import { PersonalInformation } from "components/Feedbacks/PersonalInformation";
import {
  AddFeedbackDropdown,
  DetailsField,
  DetailsValue,
  LoginTextWithBadge,
  StatusBadge,
  StyledButton,
  TimeText,
  Title,
  ViewDetailsText,
} from "components/Feedbacks/styles";
import { Transactions } from "components/Feedbacks/Transactions";
import {
  DetailsHeaderValue,
  HorizontalContainer,
  StyledMainContentDiv,
  StyledMainDiv,
  StyledMenuDiv,
} from "components/Queues/styles";
import { Dropdown } from "react-bootstrap";
import { FaAngleDown, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Main";
import amlIcon from "../utils/logo/aml.svg";

export const FeedbackDetails = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <StyledStickyNav style={{ width: "100%", marginBottom: 0, backgroundColor: "white" }}>
        <HorizontalContainer
          style={{
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <HorizontalContainer
            style={{
              fontSize: 16,
            }}
          >
            <span
              style={{
                color: "#636D9C",
                cursor: "pointer",
                marginLeft: 44,
              }}
              onClick={() => navigate(-1)}
            >
              {"< Feedback"}
            </span>{" "}
            <Title
              style={{
                marginLeft: 6,
              }}
            >
              / Feedback details
            </Title>
          </HorizontalContainer>
          <HorizontalContainer style={{ gap: 16 }}>
            <AddFeedbackDropdown>
              <Dropdown.Toggle style={{ backgroundColor: "#EBEDFF", color: "#141A39" }}>
                <span style={{ marginRight: 10 }}>Add Feedback</span>
                <FaAngleDown size={14} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as="button">Add manually</Dropdown.Item>
                <Dropdown.Item as="button">Upload .csv</Dropdown.Item>
              </Dropdown.Menu>
            </AddFeedbackDropdown>
            <StyledButton
              style={{
                padding: "10px 12px 10px 16px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#3147FF",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: 11 }}>Export</span>
              <FaPlus size={15} />
            </StyledButton>
          </HorizontalContainer>
        </HorizontalContainer>
      </StyledStickyNav>

      <StyledMenuDiv>
        <StyledMainDiv style={{ display: "flex", alignItems: "center", backgroundColor: "white", padding: "32px 64px" }}>
          <DetailsHeaderValue id="feedback_risk_level_value">
            <CircularRiskLevel risk_level="high" />
          </DetailsHeaderValue>
          <div style={{ width: "100%", marginLeft: 88, display: "flex", flexDirection: "column" }}>
            <div>
              <Title>Alex Wallace</Title>
              <StatusBadge>
                <span>Not verified</span>
              </StatusBadge>
            </div>
            <div style={{ marginTop: 14 }}>
              <DetailsField>Customer ID</DetailsField>
              <DetailsValue style={{ marginLeft: 16 }}>1306bfbb</DetailsValue>
              <DetailsField style={{ marginLeft: 48 }}>Transaction ID</DetailsField>
              <DetailsValue style={{ marginLeft: 16 }}>e61f7548-2946-49c5-986a-879b81ff55e7</DetailsValue>
            </div>
            <hr />
            <div style={{ display: "flex", alignItems: "center" }}>
              <LoginTextWithBadge>Login</LoginTextWithBadge>
              <span style={{ color: "#969AB6", marginLeft: 24, fontSize: 14 }}>August 9, 2021</span>
              <TimeText>9:15 pm GMT</TimeText>
              <ViewDetailsText href="#">View details &gt;</ViewDetailsText>
            </div>
          </div>
        </StyledMainDiv>
      </StyledMenuDiv>

      <StyledMainContentDiv style={{ marginBottom: 64 }}>
        <StyledMainDiv>
          {/* Personal Information */}
          <PersonalInformation />

          {/* Address */}
          <Address />

          {/* Device details */}
          <DeviceDetails />

          {/* Network details */}
          <NetworkDetails />

          {/* OS */}
          <OS />

          {/* Behavior Biometrics */}
          <BehaviorBiometrics behavior_biometrics={MOCK_BEHAVIOR_BIOMETRICS} />

          {/* AML */}
          <DataCard
            header="AML (Anti Money Laundering)"
            attributes={[]}
            bodyStyle={{ display: "block" }}
            icon={<img src={amlIcon} alt="" />}
          ></DataCard>

          {/* Card details */}
          <CardDetails />

          {/* Bank detail */}
          <BankDetail />

          {/* Transactions */}
          <Transactions />

          {/* Crypto Addresses */}
          <CryptoAddresses />

          {/* Tax ID details */}
          <CustomerTaxDetails
            abuseScore={693}
            firstPartySyntheticScore={318}
            idTheftScore={57}
            nameDobSharedCount={0}
            nameSsnSyntheticAddress={false}
            ssnBogus={false}
            ssnHistoryLongerMonths={0}
            ssnIssuanceBeforeDob={false}
            ssnIssuanceDobMismatch={false}
            ssnSharedCount={0}
            ssnNamesExactMatch={[]}
            ssnPhonesExactMatch={[]}
            ssnEmailsExactMatch={[]}
            ssnDobsExactMatch={[]}
            taxId="high"
            taxIdLevel="medium"
            taxIdMatch="No match"
            taxIdNameMatch="No match"
            taxIdDobMatch=""
            taxIdStateMatch=""
            thirdPartySyntheticScore="750"
          />

          {/* Phone signals */}
          <CustomerPhone
            phoneLevel="low"
            phoneReasonCodes="LIMITED_INFORMATION_PHONE"
            phoneScoreReason="-"
            nameScore="-"
            addressScore="-"
          />

          {/* Email signals */}
          <CustomerEmail
            emailLevel="high"
            emailDomainLevel="low"
            emailReasonCodes="231"
            emailReason="-"
            emailOwnerName=""
            emailOwnerNameMatch=""
            emailPhoneRiskLevel="very_high"
            riskBand=""
            billaddressReason=""
          />
        </StyledMainDiv>
      </StyledMainContentDiv>
    </Layout>
  );
};
