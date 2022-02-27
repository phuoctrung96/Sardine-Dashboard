/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import CircularRiskLevel from "components/Common/CircularRiskLevel";
import DataCard from "components/Common/DataCard";
import { StyledStickyNav } from "components/Dashboard/styles";
import { Address } from "components/Feedbacks/Address";
import { BankDetail } from "components/Feedbacks/BankDetail";
import { CardDetails } from "components/Feedbacks/CardDetails";
import { DeviceDetails } from "components/Feedbacks/DeviceDetails";
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

      <StyledMainContentDiv>
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

          {/* Crypto Addresses */}

          {/* Tax ID details */}

          {/* Phone signals */}

          {/* Email signals */}
        </StyledMainDiv>
      </StyledMainContentDiv>
    </Layout>
  );
};
