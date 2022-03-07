import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { DetailsCardView } from "components/Queues/styles";
import { MOCK_BANK_DETAIL } from "./mockData";
import { StyledTHead, ViewDetailsText } from "./styles";
import bankIcon from "../../utils/logo/bank.svg";

export const BankDetail = (): JSX.Element => (
  <DetailsCardView>
    <div className="card-header" style={{ alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <img src={bankIcon} alt="" />
        <span>Bank Detail</span>
      </div>
      <ViewDetailsText>View all &gt;</ViewDetailsText>
    </div>
    <TableContainer style={{ backgroundColor: "white" }}>
      <Table>
        <StyledTHead>
          <TableRow>
            <TableCell>Account number</TableCell>
            <TableCell>Routing number</TableCell>
            <TableCell>Account type</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Total Spent</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </StyledTHead>
        <TableBody>
          {MOCK_BANK_DETAIL.map((data) => (
            <TableRow key={data.accountNumber}>
              <TableCell>{data.accountNumber}</TableCell>
              <TableCell>{data.routingNumber}</TableCell>
              <TableCell>{data.accountType}</TableCell>
              <TableCell>{data.balance}</TableCell>
              <TableCell>{data.totalSpent}</TableCell>
              <TableCell>&gt;</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </DetailsCardView>
);
