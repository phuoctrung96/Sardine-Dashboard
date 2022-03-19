import React, { useState } from "react";
import { Modal, Button, FormControl, Spinner, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { isUrlValid } from "components/Common/Functions";
import { WebhookTypeValues, WEBHOOK_TYPE } from "sardine-dashboard-typescript-definitions";
import { Box } from "@material-ui/core";
import { addWebhook } from "../../utils/api";
import { ErrorText } from "../RulesModule/styles";
import { FieldTitle } from "../Common/styles/titles/fieldTitleStyles";
import SardineDropdown from "../Common/Dropdown/SardineDropdown";
import OrganisationDropdown from "../Dropdown/OrganisationDropdown";

interface Props {
  show: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
}

const AddPopup: React.FC<Props> = (props: Props) => {
  const [webhookLink, setWebhookLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedType, setSelectedType] = useState<WebhookTypeValues>("CASE_STATUS");
  const { addToast } = useToasts();

  const { show, handleClose, handleSuccess } = props;

  const addOrganisation = async () => {
    const newLink = webhookLink.split(" ").join("").toLowerCase();
    if (!isUrlValid(newLink)) return setError("Please enter valid webhook url");

    try {
      setIsLoading(true);

      await addWebhook({
        organisation: selectedOrg,
        url: webhookLink,
        type: selectedType,
      });

      setIsLoading(false);
      setWebhookLink("");

      addToast("Webhook added successfully!!", {
        appearance: "success",
        autoDismiss: true,
      });

      handleSuccess();
    } catch (e) {
      setIsLoading(false);
      setError(`${e}`);
    }

    return true;
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Provide details to add webhook</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box className="m-3">
          <Row>
            <FieldTitle className="p-0">Webhook URL: </FieldTitle>
            <FormControl
              placeholder="Type here"
              aria-describedby="basic-addon2"
              type="url"
              onChange={(event) => {
                setWebhookLink(event.target.value);
                setError("");
              }}
            />
          </Row>
          <Row>
            <SardineDropdown
              id="webhook-type-dropdown"
              title="Type"
              items={Object.keys(WEBHOOK_TYPE)}
              initialValue={selectedType}
              onSelectValue={(value) => setSelectedType(value as WebhookTypeValues)}
            />
          </Row>
          <Row>
            <FieldTitle>Organization: </FieldTitle>
            <OrganisationDropdown
              changeOrganisation={(organisation: string) => setSelectedOrg(organisation)}
              organisation={selectedOrg}
            />
          </Row>
          {error.length > 0 ? <ErrorText style={{ paddingLeft: 15 }}>{error}</ErrorText> : null}
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Dismiss
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={() => addOrganisation()}
          disabled={webhookLink.length === 0 || selectedOrg.length === 0 || selectedType.length === 0}
        >
          {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <span>Create</span>}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPopup;
