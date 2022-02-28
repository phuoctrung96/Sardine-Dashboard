/* eslint-disable arrow-body-style */
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { DetailsCardView } from "components/Queues/styles";
import { Card } from "react-bootstrap";
import { MOCK_CARD_DETAILS } from "./mockData";
import { StyledTHead, ViewDetailsText } from "./styles";
import visaLogo from "../../utils/logo/visaLogo.svg";
import creditCardIcon from "../../utils/logo/credit_card.svg";

export const CardDetails = (): JSX.Element => {
  return (
    <DetailsCardView>
      <Card.Header style={{ alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <img src={creditCardIcon} alt="" />
          <span>Card Details</span>
        </div>
        <ViewDetailsText>View all &gt;</ViewDetailsText>
      </Card.Header>
      <TableContainer style={{ backgroundColor: "white" }}>
        <Table>
          <StyledTHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Issues</TableCell>
              <TableCell>Is prepaid</TableCell>
              <TableCell>Category</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </StyledTHead>
          <TableBody>
            {MOCK_CARD_DETAILS.map((data) => (
              <TableRow key={data.number}>
                <TableCell>
                  <img src={visaLogo} alt="" />
                  {data.type}
                </TableCell>
                <TableCell>{data.number}</TableCell>
                <TableCell>{data.issues}</TableCell>
                <TableCell>{data.isPrepaid ? "Yes" : "No"}</TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>&gt;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DetailsCardView>
  );
};
