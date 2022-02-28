import { Table, TableCell, TableContainer, TableHead, Pagination } from "@mui/material";
import { Badge, Button, Dropdown, ToggleButtonGroup } from "react-bootstrap";
import styled from "styled-components";

export const SpaceBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  box-shadow: none;
  outline: none;
  background-color: white;
`;

export const FeedbackChartSwitch = styled(ToggleButtonGroup)`
  border-radius: 4;
  margin-right: 30px;
  margin-bottom: -34px;
  z-index: 5;
  & label {
    width: 90px;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #141a39;
    background-color: #e6ecfa;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 16px;
    box-shadow: none;
    &:hover,
    &:active,
    &:focus {
      color: #141a39;
      background-color: #e6ecfa;
    }
  }
  & input[type="radio"]:checked + label {
    background-color: white;
    color: #141a39;
  }
  & .btn {
    border: 1px solid #e6ecfa;
  }
  & .btn-check:checked + .btn-primary {
    border-color: #e6ecfa;
  }
`;

export const AddFeedbackDropdown = styled(Dropdown)`
  & .dropdown-toggle {
    padding: 10px 12px 10px 16px;
    border-radius: 8px;
    background-color: #3147ff;
    border: none;
    color: white;
    font-size: 14;
    margin-right: 72;
    box-shadow: none;
  }
  & .dropdown-toggle::after {
    display: none;
  }

  & .dropdown-menu {
    padding: 12px 8px;
    min-width: 180px;
    & .dropdown-item {
      color: #141a39;
      &:hover {
        background-color: #f2f6ff;
      }
    }
  }
`;

export const AddFilterBadge = styled(Badge)`
  background-color: #808dff !important;
  color: white;
  font-weight: normal;
  margin-left: 6px;
  border-radius: 100px;
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

export const StatusCell = styled.span<{ $color: string }>`
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
  background-color: rgba(100, 110, 133, 0.1) !important;
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

  & .Mui-selected {
    background-color: #3147ff !important;
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
