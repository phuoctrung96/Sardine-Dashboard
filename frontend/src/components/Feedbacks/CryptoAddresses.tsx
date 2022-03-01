/* eslint-disable arrow-body-style */
import { Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";
import { DetailsCardView } from "components/Queues/styles";
import Badge from "components/Common/Badge";
import { Link } from "components/Common/Links";
import { MOCK_CRYPTO_ADDRESSES } from "./mockData";
import { StyledTHead } from "./styles";
import walletIcon from "../../utils/logo/wallet.svg";

export const CryptoAddresses = (): JSX.Element => {
  return (
    <DetailsCardView>
      <div className="card-header">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <img src={walletIcon} alt="" />
          <span>Crypto Addresses</span>
        </div>
      </div>
      <TableContainer style={{ backgroundColor: "white" }}>
        <Table>
          <StyledTHead>
            <TableRow>
              <TableCell>Currency code</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Address risk level</TableCell>
              <TableCell>User risk level</TableCell>
              <TableCell>
                <TableSortLabel>AddressCategories</TableSortLabel>
              </TableCell>
              <TableCell>Coinbase dashboard</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </StyledTHead>
          <TableBody>
            {MOCK_CRYPTO_ADDRESSES.map((data) => (
              <TableRow key={`crypto_address_row_${data.currencyCode}_${data.address}`}>
                <TableCell>{data.currencyCode}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.addressRiskLevel}</TableCell>
                <TableCell>
                  <Badge title={data.userRiskLevel} />
                </TableCell>
                <TableCell>{data.addressCategories}</TableCell>
                <TableCell>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link href="#">{data.coinbaseDashboard}</Link>
                </TableCell>
                <TableCell>&gt;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DetailsCardView>
  );
};
