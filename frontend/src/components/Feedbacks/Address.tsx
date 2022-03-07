import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { DetailsCardView } from "components/Queues/styles";
import { GrGlobe } from "react-icons/gr";
import { GoogleMapsWrapper, GoogleStreetViewMap } from "components/GoogleMaps";
import { Link } from "components/Common/Links";
import { GOOGLE_STREET_VIEW_MAP_STYLE, GOOGLE_STREET_VIEW_PANORAMA_OPTIONS } from "../../constants";
import { MOCK_ADDRESS } from "./mockData";
import { StyledTHead, ViewDetailsText } from "./styles";
import usFlag from "../../utils/logo/usFlag.svg";

export const Address = (): JSX.Element => (
  <DetailsCardView>
    <div className="card-header" style={{ alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <GrGlobe size={28} />
        <span>Address</span>
      </div>
      <ViewDetailsText>View details &gt;</ViewDetailsText>
    </div>
    <TableContainer style={{ backgroundColor: "white" }}>
      <Table>
        <StyledTHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Postal Code</TableCell>
            <TableCell>Region Code</TableCell>
            <TableCell>Country code</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </StyledTHead>
        <TableBody>
          {MOCK_ADDRESS.map((data) => (
            <TableRow key={data.address}>
              <TableCell>
                <Link id="feedback_address_link" href="https://www.google.com" rel="noreferrer" target="_blank">
                  {data.address}
                </Link>
                <GoogleMapsWrapper>
                  <GoogleStreetViewMap
                    address={data.address}
                    style={GOOGLE_STREET_VIEW_MAP_STYLE}
                    panoramaOptions={GOOGLE_STREET_VIEW_PANORAMA_OPTIONS}
                  />
                </GoogleMapsWrapper>
              </TableCell>
              <TableCell>{data.city}</TableCell>
              <TableCell>{data.postalCode}</TableCell>
              <TableCell>{data.regionCode}</TableCell>
              <TableCell>
                <img src={usFlag} alt="" /> {data.countryCode}
              </TableCell>
              <TableCell>&gt;</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </DetailsCardView>
);
