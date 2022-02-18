import { useState, useMemo } from "react";
import { OrganizationAction } from "sardine-dashboard-typescript-definitions";
import { Modal, Button } from "react-bootstrap";
import { ModalHeader } from "./styles";
import InvitationsTable from "./InvitationsTable";
import InviteEmail from "./InviteEmail";
import { useDashboardInvitationsFetchResult } from "../../hooks/fetchHooks";
import { QUERY_STATUS } from "../../constants";

const InvitationModal = ({
  show,
  handleClose,
  organisation,
}: {
  show: boolean;
  handleClose: () => void;
  organisation: OrganizationAction | undefined;
}): JSX.Element | null => {
  const [openInviteModal, setInviteModal] = useState(false);

  const dashboardInvitationsFetchResult = useDashboardInvitationsFetchResult({
    enabled: organisation !== undefined,
    orgName: organisation?.name || "",
  });

  const orgs = useMemo(
    () =>
      dashboardInvitationsFetchResult.status === QUERY_STATUS.LOADING ? (
        <div>Loading...</div>
      ) : dashboardInvitationsFetchResult.data === undefined ? (
        <div>Something went wrong</div>
      ) : (
        <InvitationsTable invitations={dashboardInvitationsFetchResult.data} />
      ),
    [dashboardInvitationsFetchResult.data]
  );

  if (organisation === undefined) {
    return null;
  }
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <InviteEmail
        show={openInviteModal}
        handleClose={() => {
          setInviteModal(false);
        }}
        organisation={organisation}
      />
      <Modal.Header closeButton>
        <Modal.Title>
          <ModalHeader>{organisation.name}</ModalHeader>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{orgs}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setInviteModal(true)}>
          Generate email invite
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvitationModal;
