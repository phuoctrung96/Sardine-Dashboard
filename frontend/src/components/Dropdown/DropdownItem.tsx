import styled from "styled-components";
import chartsLogo from "../../utils/logo/chartsOnly.svg";
import selectedLogo from "../../utils/logo/selected.svg";
import { DropdownItemProps } from "../Common/Dropdown/dropDownInterface";

const StyledItem = styled.div`
  width: 100%;
  display: flex;
  padding: 8px;
  height: "36px";
  background: #ffffff;
  align-items: center;
  cursor: pointer;
  backface-visibility: hidden;
  :hover {
    background: #f0f3f9;
    border-radius: 4px;
  }
`;

const StyledIcon = styled.div`
  display: flex;
  height: 16px;
  width: 16px;
  vertical-align: sub;
`;

const StyledOption = styled.div`
  margin: 0px 6px;
  height: 20px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  /* identical to box height, or 20px */

  font-feature-settings: "ss02" on;

  /* Primary */

  color: var(--dark-14);
`;

const StyledIsSelected = styled.div`
  display: flex;
  height: 16px;
  width: 16px;
  vertical-align: sub;
  margin-left: auto;
`;

interface Props<T> {
  clicked: () => void;
  item?: DropdownItemProps<T>;
  isSelected: boolean;
  id: string;
}

const DropdownItem = <T extends unknown>(props: Props<T>): JSX.Element => {
  const { clicked, item, isSelected, id } = props;
  return (
    <StyledItem onClick={() => clicked()} data-tid={id}>
      {item && item.icon ? (
        <StyledIcon>
          {" "}
          <img alt="" src={chartsLogo} />{" "}
        </StyledIcon>
      ) : null}
      <StyledOption>{item && item.option}</StyledOption>
      {isSelected ? (
        <StyledIsSelected>
          <img alt="" src={selectedLogo} />
        </StyledIsSelected>
      ) : null}
    </StyledItem>
  );
};

export default DropdownItem;
