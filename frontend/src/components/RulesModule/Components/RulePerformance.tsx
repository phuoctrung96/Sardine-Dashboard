import DropwdownButton from "components/Dropdown/DropdownButton";
import DropwdownItem from "components/Dropdown/DropdownItem";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { replaceAllSpacesWithUnderscores } from "utils/stringUtils";
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

const StyledDropdownDiv = styled.div`
  z-index: 10;
  height: 36px;
  max-width: 211px;
`;

const StyledDropdownList = styled.div`
  padding: 8px;
  background: #ffffff;
  z-index: 12;
  top: 0;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.02);
`;

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
      <HorizontalContainer>
        <Title>Rule performance</Title>
        <VerticalContainer>
          <HorizontalContainer>
            <DropdownLabel>Start from</DropdownLabel>
            <DateFilterDropdown
              open={startFromDropdownOpen}
              setOpen={setStartFromDropdownOpen}
              selectedIndex={startFromSelected}
              setSelectedIndex={setStartFromSelected}
              options={START_FROM_OPTIONS}
              width={150}
            />

            <DropdownLabel style={{ marginLeft: 32 }}>Duration</DropdownLabel>
            <DateFilterDropdown
              open={durationDropdownOpen}
              setOpen={setDurationDropdownOpen}
              selectedIndex={durationSelected}
              setSelectedIndex={setDurationSelected}
              options={DURATION_OPTIONS}
              width={120}
            />
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
};
