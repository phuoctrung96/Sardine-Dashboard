import {
  Container,
  HorizontalContainerSpaceBetween,
  RulePerformancePaper,
  RulePerformanceSummaryText,
  VerticalContainer,
} from "../styles";

export const RulePerformanceSection = () => {
  return (
    <Container style={{ marginTop: 15 }}>
      <VerticalContainer style={{ alignItems: "flex-end" }}>
        <HorizontalContainerSpaceBetween style={{ justifyContent: "flex-end" }}>
          <RulePerformanceSummaryText style={{ color: "#969ab6", marginRight: 16 }}>Showing</RulePerformanceSummaryText>
          <RulePerformanceSummaryText>Dec-14 to Jan-14</RulePerformanceSummaryText>
        </HorizontalContainerSpaceBetween>
      </VerticalContainer>
      <HorizontalContainerSpaceBetween style={{ marginTop: 24, gap: 32 }}>
        <RulePerformancePaper $color="#3147FF">
          <p>Precision</p>
          <p>76%</p>
        </RulePerformancePaper>
        <RulePerformancePaper $color="#EE8346">
          <p>Recall</p>
          <p>86%</p>
        </RulePerformancePaper>
        <RulePerformancePaper $color="#1ADAE5">
          <p>Coverage</p>
          <p>2%</p>
        </RulePerformancePaper>
      </HorizontalContainerSpaceBetween>
    </Container>
  );
};
