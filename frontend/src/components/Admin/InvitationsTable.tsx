import dayjs from "dayjs";
import { DashboardInvitation } from "sardine-dashboard-typescript-definitions";
import Col from "react-bootstrap/Col";
import { StyledTable, StyledTh, StyledTr, StyledTd, TableWrapper, TableTitle, StyledRow } from "./styles";
import { AdminVisible } from "../Auth/AdminVisible";

const InvitationsTable = ({ invitations }: { invitations: DashboardInvitation[] }): JSX.Element => (
  <AdminVisible>
    <TableWrapper>
      <StyledRow>
        <Col md="8">
          <TableTitle>Signup Invitations</TableTitle>
        </Col>
      </StyledRow>

      <StyledTable responsive="md" bordered>
        <thead>
          <StyledTr>
            <StyledTh key="id">Id</StyledTh>
            <StyledTh key="token">Token</StyledTh>
            <StyledTh key="expired_at">Expires at</StyledTh>
            <StyledTh key="status">Status</StyledTh>
            <StyledTh key="email">Email</StyledTh>
          </StyledTr>
        </thead>
        <tbody>
          {invitations.map((invitation) => (
            <StyledTr key={invitation.id}>
              <StyledTd key={`id_${invitation.id}`}>{invitation.id}</StyledTd>
              <StyledTd key={`token_${invitation.token}`}>{invitation.token}</StyledTd>
              <StyledTd key={`expired_at_${invitation.expiredAt}`}>{dayjs(invitation.expiredAt).format("LLL")}</StyledTd>
              <StyledTd key={`status_${invitation.expiredAt}`}>
                {dayjs(invitation.expiredAt).isBefore(dayjs(new Date())) ? "Expired" : "Active"}
              </StyledTd>
              <StyledTd key={`email_${invitation.email}`}>{invitation.email}</StyledTd>
            </StyledTr>
          ))}
          {!invitations.length && (
            <StyledTr>
              <StyledTd>No Invitation Data</StyledTd>
            </StyledTr>
          )}
        </tbody>
      </StyledTable>
    </TableWrapper>
  </AdminVisible>
);

export default InvitationsTable;
