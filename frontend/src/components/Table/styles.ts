import styled from "styled-components";

export const StyledTable = styled.table`
  border-collapse: collapse;
  table-layout: auto;
  width: -webkit-fill-available;
  display: table;
`;

export const Cell = styled.td<{ bold?: boolean }>`
  vertical-align: top;
  padding: 18px 20px;
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const StyledTh = styled.th`
  background-color: white;
  border-bottom: 1px solid #f2f6ff;
  height: 16px;
  padding: 20px 0 20px 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  color: #969ab6;
  & > div {
    display: flex;
    gap: 8px;
  }
`;

export const StyledTr = styled.tr`
  line-height: 20px;
  border-bottom: 1px solid #f2f6ff;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  font-feature-settings: "ss02" on, "zero" on;
  padding: 9px 0px;
  background-color: #ffffff;
  color: #141a39;
  &:hover {
    background-color: #f2f6ff;
  }
`;
