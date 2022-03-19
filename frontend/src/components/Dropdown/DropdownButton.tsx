import { CSSProperties } from "react";
import styled from "styled-components";
import chartLogo from "../../utils/logo/chartsOnly.svg";
import downLogo from "../../utils/logo/down.svg";
import { DropdownItemProps } from "../Common/Dropdown/dropDownInterface";

const StyledIcon = styled.div`
  display: flex;
  height: 16px;
  width: 16px;
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
  height: 3.5px;
  width: 7px;
`;

const StyledDropdownButton = styled.div`
  height: 40px;
  border-radius: 4px;
  padding: 12px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #eaedf2;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background: #eaedf2;
  }
`;

interface Props<T> {
  clicked: () => void;
  item?: DropdownItemProps<T>;
  title?: string;
  id: string;
  style?: CSSProperties;
}

const DropdownButton = <T extends unknown>(props: Props<T>): JSX.Element => {
  const { clicked, item, title, id, style } = props;
  return (
    <StyledDropdownButton onClick={() => clicked()} data-tid={id} style={style}>
      {item && item.icon && (
        <StyledIcon>
          {" "}
          <img alt="" src={chartLogo} />
        </StyledIcon>
      )}
      <StyledOption>{item?.option ? `${item.option}` : title}</StyledOption>
      <StyledIsSelected>
        <img alt="" src={downLogo} />
      </StyledIsSelected>
    </StyledDropdownButton>
  );
};

export default DropdownButton;
