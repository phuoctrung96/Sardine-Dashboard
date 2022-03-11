import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Alert,
  Button,
  Container,
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
import { Send } from "@mui/icons-material";
import Layout from "../components/Layout/Main";
import { useAddSuperAdminEmailMutation, useSuperAdminEmailObjectsFetchResult } from "../hooks/fetchHooks";
import { QUERY_STATUS } from "../constants";
import Loader from "../components/Common/Loader";
import { isErrorWithResponseDataObject } from "../utils/errorUtils";

interface Inputs {
  email: string;
}

const SuperAdminMembers = (): JSX.Element => {
  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      email: "somebody@sardine.ai",
    },
  });

  const mutation = useAddSuperAdminEmailMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data.email);
  };

  const fetchResult = useSuperAdminEmailObjectsFetchResult({ enabled: true });

  const emailObjects = fetchResult.data;
  const mutationError = mutation.error;
  const errorMessage =
    mutationError !== null && isErrorWithResponseDataObject(mutationError) ? mutationError.response.data.error : "";

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
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Button variant="contained" onClick={handleSubmit(onSubmit)} startIcon={<Send />} disabled={mutation.isLoading}>
              Add an super admin email
            </Button>
          </Stack>
          {fetchResult.status === QUERY_STATUS.LOADING && <Loader />}
          {emailObjects === undefined ? (
            <div>No data</div>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {emailObjects.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      </Container>
    </Layout>
  );
};

export default SuperAdminMembers;
