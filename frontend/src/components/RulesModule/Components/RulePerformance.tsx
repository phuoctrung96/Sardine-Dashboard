import DropwdownButton from "components/Dropdown/DropdownButton";
import styled from "styled-components";
import { Container } from "../styles";

const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DropdownLabel = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
`;

const SummaryText = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;

const PerformancePaper = styled.div<{ $color: string }>`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  min-width: 30%;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e5e5e5;

  & p {
    margin: 0;
  }

  & p:first-child {
    font-size: 16px;

    &::before {
      content: "";
      display: inline-block;
      margin-right: 7px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background-color: ${(props) => props.$color};
    }
  }
  & p:last-child {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }
`;

export const RulePerformanceSection = () => (
  <Container style={{ marginTop: 60 }}>
    <HorizontalContainer>
      <Title>Rule performance</Title>
      <VerticalContainer>
        <HorizontalContainer>
          <DropdownLabel>Start from</DropdownLabel>
          <DropwdownButton id="rule-performance-start-from" clicked={() => {}} title="Last 60 days" />

          <DropdownLabel style={{ marginLeft: 32 }}>Duration</DropdownLabel>
          <DropwdownButton id="rule-performance-duration" clicked={() => {}} title="30 days" />
        </HorizontalContainer>
        <HorizontalContainer style={{ justifyContent: "flex-end", marginTop: 16 }}>
          <SummaryText style={{ color: "#969ab6", marginRight: 16 }}>Showing</SummaryText>
          <SummaryText>Dec-14 to Jan-14</SummaryText>
        </HorizontalContainer>
      </VerticalContainer>
    </HorizontalContainer>
    <HorizontalContainer style={{ marginTop: 24, gap: 32 }}>
      <PerformancePaper $color="#3147FF">
        <p>Precision</p>
        <p>76%</p>
      </PerformancePaper>
      <PerformancePaper $color="#EE8346">
        <p>Recall</p>
        <p>86%</p>
      </PerformancePaper>
      <PerformancePaper $color="#1ADAE5">
        <p>Coverage</p>
        <p>2%</p>
      </PerformancePaper>
    </HorizontalContainer>
  </Container>
);
