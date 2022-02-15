import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ChangePasswordModal from "../components/Settings/ChangePasswordModal";
import ChangeEmailModal from "../components/Settings/ChangeEmailModal";
import Layout from "../components/Layout/Main";
import { StyledContainer, StyledRow, StyledButton } from "../components/Settings/styles";
import UsersList from "../components/Settings/UsersList";
import InviteEmail from "../components/Settings/InviteEmailModal";
import { useUserStore } from "../store/user";
const Settings = (): JSX.Element => {
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showInviteEmail, setShowInviteEmail] = useState(false);
  const userEmail = useUserStore((state) => state.email);
  const organisation = useUserStore((state) => state.organisation);
  const handleChangeEmail = () => {
    setShowChangeEmailModal(true);
  };
  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  return (
    <Layout>
      <StyledContainer fluid="sm">
        <StyledRow className="mtl">
          <Col md="2">Email</Col>
          <Col md="4">{userEmail}</Col>
          <Col md="4">
            <StyledButton onClick={handleChangeEmail}>Change Email</StyledButton>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col md="2">Password</Col>
          <Col md="4">*************</Col>
          <Col md="4">
            <StyledButton onClick={handleChangePassword}>Change Password</StyledButton>
          </Col>
        </StyledRow>
      </StyledContainer>

      {/* {
        organisation !== "all" ?
          <> */}
      <StyledContainer fluid="md">
        <StyledButton onClick={() => setShowInviteEmail(true)}>Invite</StyledButton>
        <UsersList />
      </StyledContainer>
      <InviteEmail show={showInviteEmail} handleClose={() => setShowInviteEmail(false)} organisation={organisation} />
      {/* </>
          :
          ""
      } */}
      <ChangePasswordModal
        show={showChangePasswordModal}
        handleClose={() => setShowChangePasswordModal(false)}
        email={userEmail}
      />

      <ChangeEmailModal
        show={showChangeEmailModal}
        handleClose={() => setShowChangeEmailModal(false)}
        oldEmail={userEmail || ""}
      />
    </Layout>
  );
};

export default Settings;
