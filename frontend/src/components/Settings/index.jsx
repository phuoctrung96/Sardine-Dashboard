import React, { useContext, useState } from "react";
import Col from "react-bootstrap/Col";
import { StoreCtx } from "../../utils/store";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangeEmailModal from "./ChangeEmailModal";
import Layout from "../Layout/Main";
import { StyledContainer, StyledRow, StyledButton } from "./styles";
import UsersList from "./UsersList";
import { useUserStore } from "../../store/user";

const Settings = () => {
  const { state } = useContext(StoreCtx);
  const isAuthenticated = useUserStore((store) => store.isAuthenticated);
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const userEmail = useUserStore((state) => state.email);
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

      <ChangePasswordModal
        show={showChangePasswordModal}
        handleClose={() => setShowChangePasswordModal(false)}
        email={userEmail}
      />

      <UsersList />
      <ChangeEmailModal show={showChangeEmailModal} handleClose={() => setShowChangeEmailModal(false)} oldEmail={userEmail} />
    </Layout>
  );
}

export default Settings;
