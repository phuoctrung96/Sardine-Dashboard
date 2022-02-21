import DropwdownButton from "components/Dropdown/DropdownButton";
import DropwdownItem from "components/Dropdown/DropdownItem";
import { useEffect, useRef, useState } from "react";
import { replaceAllSpacesWithUnderscores } from "utils/stringUtils";
import {
  Container,
  HorizontalContainerSpaceBetween,
  RulePerformanceDropdownLabel,
  RulePerformancePaper,
  RulePerformanceSummaryText,
  RulePerformanceTitle,
  StyledDropdownDiv,
  StyledDropdownList,
  VerticalContainer,
} from "../styles";

const DateFilterDropdown = (props: {
  open?: boolean;
  setOpen: (open: boolean) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  options: string[];
  width: number;
}) => {
  const { open, setOpen, selectedIndex, setSelectedIndex, options, width } = props;
  const ref = useRef<HTMLDivElement>(null);

  const onItemClicked = (index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleClick = (e: MouseEvent) => {
    if (!(ref && ref.current && ref.current.contains(e.target as Node))) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div style={{ width }}>
      {open ? (
        <StyledDropdownDiv ref={ref}>
          <StyledDropdownList>
            {options.map((ele, index) => (
              <DropwdownItem
                clicked={() => onItemClicked(index)}
                key={ele}
                item={{ option: ele }}
                isSelected={index === selectedIndex}
                id={`dropdown_item_${replaceAllSpacesWithUnderscores(ele)}`}
              />
            ))}
          </StyledDropdownList>
        </StyledDropdownDiv>
      ) : (
        <DropwdownButton
          id="rule-performance-start-from"
          clicked={() => setOpen(true)}
          item={{ option: options[selectedIndex] }}
          style={{ backgroundColor: "white" }}
        />
      )}
    </div>
  );
};

export const RulePerformanceSection = () => {
  const START_FROM_OPTIONS = ["Last 1 day", "Last week", "Last 30 days", "Last 60 days"];
  const DURATION_OPTIONS = ["1 day", "30 days"];

  const [startFromDropdownOpen, setStartFromDropdownOpen] = useState(false);
  const [startFromSelected, setStartFromSelected] = useState(3);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const [durationSelected, setDurationSelected] = useState(1);

  return (
    <Container style={{ marginTop: 60 }}>
      <HorizontalContainerSpaceBetween>
        <RulePerformanceTitle>Rule performance</RulePerformanceTitle>
        <VerticalContainer style={{ alignItems: "flex-end" }}>
          <HorizontalContainerSpaceBetween>
            <RulePerformanceDropdownLabel>Start from</RulePerformanceDropdownLabel>
            <DateFilterDropdown
              open={startFromDropdownOpen}
              setOpen={setStartFromDropdownOpen}
              selectedIndex={startFromSelected}
              setSelectedIndex={setStartFromSelected}
              options={START_FROM_OPTIONS}
              width={150}
            />

            <RulePerformanceDropdownLabel style={{ marginLeft: 32 }}>Duration</RulePerformanceDropdownLabel>
            <DateFilterDropdown
              open={durationDropdownOpen}
              setOpen={setDurationDropdownOpen}
              selectedIndex={durationSelected}
              setSelectedIndex={setDurationSelected}
              options={DURATION_OPTIONS}
              width={120}
            />
          </HorizontalContainerSpaceBetween>
          <HorizontalContainerSpaceBetween style={{ justifyContent: "flex-end", marginTop: 16 }}>
            <RulePerformanceSummaryText style={{ color: "#969ab6", marginRight: 16 }}>Showing</RulePerformanceSummaryText>
            <RulePerformanceSummaryText>Dec-14 to Jan-14</RulePerformanceSummaryText>
          </HorizontalContainerSpaceBetween>
        </VerticalContainer>
      </HorizontalContainerSpaceBetween>
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
