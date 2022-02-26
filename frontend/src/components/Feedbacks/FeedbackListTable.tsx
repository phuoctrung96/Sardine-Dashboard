/* eslint-disable arrow-body-style */
import { Pagination, TableBody, TableCell, TableRow, TableSortLabel } from "@mui/material";
import DropwdownButton from "components/Dropdown/DropdownButton";
import { MOCK_TABLE_DATA } from "./mockData";
import { BorderedTCell, StyledTable, StyledTableContainer, StyledTCell, StyledTHead } from "./styles";

export const FeedbackListTable = (): JSX.Element => {
  return (
    <>
      <StyledTableContainer>
        <StyledTable>
          <StyledTHead>
            <TableRow>
              <BorderedTCell>
                <TableSortLabel>Session Key</TableSortLabel>
              </BorderedTCell>
              <TableCell>
                <TableSortLabel>User ID</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Type</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Status</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Country</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>City</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Reason Codes</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Date/time</TableSortLabel>
              </TableCell>
            </TableRow>
          </StyledTHead>
          <TableBody>
            {MOCK_TABLE_DATA.map((data) => (
              <TableRow key={data.sessionKey}>
                <BorderedTCell>
                  <StyledTCell>{data.sessionKey}</StyledTCell>
                </BorderedTCell>
                <TableCell>
                  <StyledTCell>{data.userId}</StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>{data.type}</StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>{data.status}</StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>{data.country}</StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>{data.city}</StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>{data.reasonCodes}</StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>{data.dateTime}</StyledTCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <DropwdownButton id="feedback-table-rows-dropdown" title="15 rows" clicked={() => {}} />
        <Pagination count={12} showFirstButton showLastButton />
      </div>
    </>
  );
};
