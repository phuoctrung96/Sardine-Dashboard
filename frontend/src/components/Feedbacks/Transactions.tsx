import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { DetailsCardView } from "components/Queues/styles";
import { MOCK_TRANSACTIONS } from "./mockData";
import { StyledTHead, ViewDetailsText } from "./styles";
import transactionIcon from "../../utils/logo/transactions_detail.svg";

export const Transactions = (): JSX.Element => (
  <DetailsCardView>
    <div className="card-header" style={{ alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <img src={transactionIcon} alt="" />
        <span>Transactions</span>
      </div>
      <ViewDetailsText>View all &gt;</ViewDetailsText>
    </div>
    <TableContainer style={{ backgroundColor: "white" }}>
      <Table>
        <StyledTHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Payment mode</TableCell>
            <TableCell>Item Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action Type</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </StyledTHead>
        <TableBody>
          {MOCK_TRANSACTIONS.map((data) => (
            <TableRow key={`transaction_row_${data.id}`}>
              <TableCell>{data.amount}</TableCell>
              <TableCell>{data.paymentMode}</TableCell>
              <TableCell>{data.itemCategory}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.actionType}</TableCell>
              <TableCell>&gt;</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </DetailsCardView>
);
