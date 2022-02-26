import { Table, TableCell, TableContainer, TableHead } from "@mui/material";
import { Badge, Button, Dropdown, ToggleButtonGroup } from "react-bootstrap";
import styled from "styled-components";

export const SpaceBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  box-shadow: none !important;
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
    box-shadow: none !important;
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
    box-shadow: none !important;
  }
  & .dropdown-toggle::after {
    display: none !important;
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
  border-radius: 100px;
  background-color: #808dff !important;
  font-weight: normal;
  margin-left: 8px;
`;

export const StyledTableContainer = styled(TableContainer)`
  border: 1px solid #e6ecfa;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 2px;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #969ab6;
    border-radius: 2px;
    outline: 1px solid #969ab6;
  }
`;

export const StyledTable = styled(Table)`
  /* overflow-x: scroll; */
`;

export const StyledTHead = styled(TableHead)`
  & th {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    color: #969ab6;
  }
`;

export const BorderedTCell = styled(TableCell)`
  border-right: 1px solid #e6ecfa;
`;

export const StyledTCell = styled.div`
  display: block;
  width: 200px;
  padding: 8px 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
`;
