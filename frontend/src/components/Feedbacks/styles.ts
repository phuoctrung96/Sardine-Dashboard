import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Pagination,
  Badge,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import DaysDropdown from "components/Dropdown/DaysDropdown";
import styled from "styled-components";

export const SpaceBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  color: #141a39;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
`;

export const DetailsField = styled.span`
  color: #969ab6;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
`;

export const DetailsValue = styled.span`
  color: #141a39;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;

export const StyledButton = styled(Button)`
  box-shadow: none;
  outline: none;
  background-color: white;
  text-transform: none;
`;

export const FeedbackChartSwitch = styled(ToggleButtonGroup)`
  border-radius: 4px;
  margin-right: 30px;
  margin-bottom: -34px;
  z-index: 5;
  background-color: #e6ecfa;
  height: 32px;

  .Mui-selected {
    background-color: white;
  }
`;

export const ChartTypeButton = styled(ToggleButton)`
  width: 50%;
  text-transform: none;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
`;

export const AddFeedbackDropdown = styled(Button)`
  padding: 10px 12px 10px 16px;
  border-radius: 8px;
  background-color: #3147ff;
  border: none;
  color: white;
  font-size: 14;
  margin-right: 72;
`;

export const AddFilterBadge = styled(Badge)`
  & .MuiBadge-badge {
    background-color: #808dff;
    color: white;
    font-weight: normal;
    font-size: 11px;
  }
  margin: 0 4px 1px 16px;
`;

export const StyledTableContainer = styled(TableContainer)`
  border: 1px solid #e6ecfa;

  &::-webkit-scrollbar {
    height: 2px;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #969ab6;
    border-radius: 2px;
    outline: 1px solid #969ab6;
  }
`;

export const StyledTable = styled(Table)``;

export const StyledTHead = styled(TableHead)`
  & th {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    color: #969ab6;
    white-space: nowrap;
  }
`;

export const BorderedTCell = styled(TableCell)`
  border-right: 1px solid #e6ecfa;
`;

export const StyledTCell = styled.div`
  display: block;
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
`;

export const TextWithStatus = styled.span<{ $color: string }>`
  &::before {
    content: "";
    display: inline-block;
    margin-right: 8px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${(props) => props.$color};
  }
`;

export const ReasonCodeBadge = styled(Badge)`
  background-color: rgba(100, 110, 133, 0.1);
  border-radius: 4px;
  font-weight: normal;
  margin-left: 8px;
  font-size: 12px;
  line-height: 16px;
  color: #636d9c;
`;

export const StyledPagination = styled(Pagination)`
  & button {
    color: #969ab6;
    font-size: 12px;
    line-height: 16px;
  }

  & button.Mui-selected {
    background-color: #3147ff;
    color: #fafbff;
  }
`;

export const StyledDropdownDiv = styled.div`
  z-index: 10;
  height: 36px;
  max-width: 211px;
`;

export const StyledDropdownList = styled.div`
  padding: 8px;
  background: #ffffff;
  z-index: 12;
  top: 0;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.02);
`;

export const StatusBadge = styled.div`
  display: inline-block;
  margin-left: 32px;
  background-color: #f2f6ff;
  border-radius: 4px;
  padding: 4px 8px;
  & span {
    font-size: 13px;
    line-height: 16px;
    color: #636d9c;
    &::before {
      content: "";
      display: inline-block;
      margin-right: 4px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: 1px solid #636d9c;
    }
  }
`;

export const LoginTextWithBadge = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: #141a39;
  &::before {
    content: "";
    display: inline-block;
    margin-right: 12px;
    width: 12px;
    height: 12px;
    border-radius: 4px;
    background-color: #37c2f2;
  }
`;

export const TimeText = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: #969ab6;
  &::before {
    content: "";
    display: inline-block;
    margin: 4px 10px;
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background-color: #969ab6;
  }
`;

export const ViewDetailsText = styled.a`
  margin-left: 32px;
  font-size: 14px;
  line-height: 20px;
  color: #3147ff;
  text-decoration: none;
`;

export const StyledDaysDropdown = styled(DaysDropdown)`
  & div {
    background-color: white;
  }
`;
