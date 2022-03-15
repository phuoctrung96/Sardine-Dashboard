import { CircularProgress, TableBody, TableCell, TableRow, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FEEDBACK_DETAILS_PATH } from "modulePaths";
import { FeedbackRow, GetFeedbacksListResponse } from "sardine-dashboard-typescript-definitions";
import {
  BorderedTCell,
  TextWithStatus,
  StyledPagination,
  StyledTable,
  StyledTableContainer,
  StyledTCell,
  StyledTHead,
} from "./styles";
import { DATE_FORMATS, TIME_UNITS } from "../../constants";
import settlementIcon from "../../utils/logo/settlement.svg";
import chargebackIcon from "../../utils/logo/chargeback.svg";
import { formatTimestampInUtc } from "../../utils/timeUtils";

const convertTimestampToDateAndTime = (timestamp: string) => ({
  date: formatTimestampInUtc(+timestamp, { unit: TIME_UNITS.MILLISECOND, format: DATE_FORMATS.DATE }),
  time: formatTimestampInUtc(+timestamp, { unit: TIME_UNITS.MILLISECOND, format: DATE_FORMATS.TIME }),
});

export const FeedbackTableRow = (props: { data: FeedbackRow }): JSX.Element => {
  const { data } = props;
  const dateTime = convertTimestampToDateAndTime(data.dateTime);
  const navigate = useNavigate();

  return (
    <TableRow onClick={() => navigate(FEEDBACK_DETAILS_PATH)} style={{ cursor: "pointer" }}>
      <BorderedTCell>
        <StyledTCell>{data.sessionKey}</StyledTCell>
      </BorderedTCell>
      <TableCell>
        <StyledTCell>{data.userId}</StyledTCell>
      </TableCell>
      <TableCell>
        <StyledTCell>
          {data.type ? (
            <>
              <img src={data.type === "settlement" ? settlementIcon : chargebackIcon} alt="" /> {data.type}
            </>
          ) : null}
        </StyledTCell>
      </TableCell>
      <TableCell>
        <StyledTCell>
          <TextWithStatus $color={data.status.toLowerCase().includes("approved") ? "#2FB464" : "#F7B904"}>
            {data.status}
          </TextWithStatus>
        </StyledTCell>
      </TableCell>
      <TableCell>
        <StyledTCell>
          {dateTime.date} <span style={{ color: "#969AB6" }}>{dateTime.time}</span>
        </StyledTCell>
      </TableCell>
    </TableRow>
  );
};

const tableHeadCells = [
  {
    id: "CustomerFeedback.Id",
    label: "User ID",
  },
  {
    id: "Feedback.Type",
    label: "Type",
  },
  {
    id: "Feedback.Status",
    label: "Status",
  },
  {
    id: "CustomerFeedback.CreatedAtMillis",
    label: "Date/time",
  },
];

type FeedbackListTableProps = {
  feedbacks: GetFeedbacksListResponse;
  isLoading?: boolean;
  page: number;
  setPage: (page: number) => void;
  rows: number;
  setRows: (rows: number) => void;
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
};

export const FeedbackListTable = (props: FeedbackListTableProps): JSX.Element => {
  const { feedbacks, isLoading = false, page, setPage, rows, setRows, order, orderBy, onRequestSort } = props;

  const options = [
    {
      title: "15 rows",
      value: 15,
    },
    {
      title: "20 rows",
      value: 20,
    },
    {
      title: "30 rows",
      value: 30,
    },
  ];

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (setPage) setPage(value);
  };

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
        <CircularProgress color="inherit" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!feedbacks.length) {
    return (
      <div style={{ height: "50vh", marginTop: 64, display: "flex", justifyContent: "center" }}>
        <span>No data found</span>
      </div>
    );
  }

  return (
    <div>
      <StyledTableContainer>
        <StyledTable>
          <StyledTHead>
            <TableRow>
              <BorderedTCell sortDirection={orderBy === "SessionKey" ? order : false}>
                <TableSortLabel
                  active={orderBy === "SessionKey"}
                  direction={orderBy === "SessionKey" ? order : undefined}
                  onClick={createSortHandler("SessionKey")}
                >
                  Session Key
                </TableSortLabel>
              </BorderedTCell>
              {tableHeadCells.map((cell) => (
                <TableCell key={cell.id} sortDirection={orderBy === cell.id ? order : false}>
                  <TableSortLabel
                    active={orderBy === cell.id}
                    direction={orderBy === cell.id ? order : undefined}
                    onClick={createSortHandler(cell.id)}
                  >
                    {cell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </StyledTHead>
          <TableBody>
            {feedbacks.map((data, index) => (
              <FeedbackTableRow
                // eslint-disable-next-line react/no-array-index-key
                key={`${data.sessionKey}_${data.userId}_${index}`}
                data={data}
              />
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <Form.Select style={{ maxWidth: 110 }} value={rows} onChange={(e) => setRows(+e.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </Form.Select>
        <StyledPagination count={12} page={page} onChange={handleChange} showFirstButton showLastButton />
      </div>
    </div>
  );
};
