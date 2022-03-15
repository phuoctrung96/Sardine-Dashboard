import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Send, Delete } from "@mui/icons-material";
import Layout from "../components/Layout/Main";
import {
  useAddSuperAdminEmailMutation,
  useDeleteSuperAdminEmailMutation,
  useSuperAdminEmailObjectsFetchResult,
} from "../hooks/fetchHooks";
import { QUERY_STATUS } from "../constants";
import Loader from "../components/Common/Loader";
import { isErrorWithResponseDataObject } from "../utils/errorUtils";

interface Inputs {
  email: string;
}

const DUMMY_ID = -1;

const SuperAdminMembers = (): JSX.Element => {
  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      email: "somebody@sardine.ai",
    },
  });
  const [idToBeDeleted, setIdToBeDeleted] = useState(DUMMY_ID);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const addMutation = useAddSuperAdminEmailMutation();
  const deleteMutation = useDeleteSuperAdminEmailMutation();

  const onSubmitAddEmail: SubmitHandler<Inputs> = (data) => {
    addMutation.mutate(data.email);
  };

  const handleDeleteButtonClicked = (id: number) => () => {
    setIdToBeDeleted(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmationClicked = () => {
    setIsDeleteDialogOpen(false);
    deleteMutation.mutate(idToBeDeleted);
    setIdToBeDeleted(DUMMY_ID);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setIdToBeDeleted(DUMMY_ID);
  };

  const fetchResult = useSuperAdminEmailObjectsFetchResult({ enabled: true });

  const emailObjects = fetchResult.data;
  const addMutationError = addMutation.error;
  const addMutationErrorMessage =
    addMutationError !== null && isErrorWithResponseDataObject(addMutationError) ? addMutationError.response.data.error : "";
  const deleteMutationError = deleteMutation.error;
  const deleteMutationErrorMessage =
    deleteMutationError !== null && isErrorWithResponseDataObject(deleteMutationError)
      ? deleteMutationError.response.data.error
      : "";

  return (
    <Layout>
      <Container>
        <Stack>
          <h1>Super Admin Emails</h1>
          <Stack sx={{ paddingBottom: 10 }}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true, minLength: 1, pattern: /^(.+)@sardine.ai$/ }}
              render={({ field, formState }) => (
                <TextField
                  label="Email"
                  id="text_field_super_admin_member_email"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  required
                  name={field.name}
                  value={field.value}
                  error={formState.errors.email !== undefined}
                  helperText={formState.errors.email ? formState.errors.email.message : undefined}
                />
              )}
            />
            {addMutationErrorMessage !== "" && <Alert severity="error">{addMutationErrorMessage}</Alert>}

            <Button
              variant="contained"
              onClick={handleSubmit(onSubmitAddEmail)}
              startIcon={<Send />}
              disabled={addMutation.isLoading}
            >
              Add as super admin email
            </Button>
          </Stack>
          {fetchResult.status === QUERY_STATUS.LOADING && <Loader />}
          {emailObjects === undefined ? (
            <div>No data</div>
          ) : (
            <Stack>
              {deleteMutationErrorMessage !== "" && <Alert severity="error">{deleteMutationErrorMessage}</Alert>}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {emailObjects.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteButtonClicked(row.id)}
                            startIcon={<Delete />}
                            disabled={deleteMutation.isLoading}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          )}
        </Stack>
      </Container>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert_dialog_title"
        aria-describedby="alert_dialog_description"
      >
        <DialogTitle id="alert_dialog_title">Delete the selected super admin email?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert_dialog_description">
            Email to be deleted: {emailObjects?.find((emailObj) => emailObj.id === idToBeDeleted)?.email}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirmationClicked} autoFocus>
            Delete the email
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default SuperAdminMembers;
