import { useState } from "react";
import Col from "react-bootstrap/Col";
import ChangePasswordModal from "../components/Settings/ChangePasswordModal";
import Layout from "../components/Layout/Main";
import { StyledContainer, StyledRow, StyledButton } from "../components/Settings/styles";
import UsersList from "../components/Settings/UsersList";
import { useUserStore } from "../store/user";

const Settings = (): JSX.Element => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const userEmail = useUserStore((state) => state.email);
  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  return (
    <Layout>
      <StyledContainer fluid="sm">
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
    </Layout>
  );
};

export default Settings;
