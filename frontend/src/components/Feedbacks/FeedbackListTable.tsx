import { CircularProgress, TableBody, TableCell, TableRow, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import moment from "moment";
import { FEEDBACK_DETAILS_PATH } from "modulePaths";
import { GetFeedbacksListResponse } from "sardine-dashboard-typescript-definitions";
import {
  BorderedTCell,
  ReasonCodeBadge,
  TextWithStatus,
  StyledPagination,
  StyledTable,
  StyledTableContainer,
  StyledTCell,
  StyledTHead,
} from "./styles";
import settlementIcon from "../../utils/logo/settlement.svg";
import chargebackIcon from "../../utils/logo/chargeback.svg";
import usFlagIcon from "../../utils/logo/usFlag.svg";

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
    id: "country",
    label: "Country",
  },
  {
    id: "city",
    label: "City",
  },
  {
    id: "reasonCodes",
    label: "Reason Codes",
  },
  {
    id: "CustomerFeedback.CreatedAtMillis",
    label: "Date/time",
  },
];

const convertTimestampToDateAndTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return {
    date: moment(date).format("YYYY-MM-DD"),
    time: moment(date).format("h:mm"),
  };
};

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
  const { feedbacks, isLoading, page, setPage, rows, setRows, order, orderBy, onRequestSort } = props;

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

  const navigate = useNavigate();

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
            {feedbacks.map((data, index) => {
              const dateTime = convertTimestampToDateAndTime(data.dateTime);
              return (
                <TableRow
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${data.sessionKey}_${data.userId}_${index}`}
                  onClick={() => navigate(FEEDBACK_DETAILS_PATH)}
                  style={{ cursor: "pointer" }}
                >
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
                      <img src={usFlagIcon} alt="" style={{ marginRight: 6 }} />
                      {data.country}
                    </StyledTCell>
                  </TableCell>
                  <TableCell>
                    <StyledTCell>{data.city}</StyledTCell>
                  </TableCell>
                  <TableCell>
                    <StyledTCell>
                      {data.reasonCodes.split(" ").map((code) => (
                        <ReasonCodeBadge key={`reason-code-badge-${data.sessionKey}-${code}`}>{code}</ReasonCodeBadge>
                      ))}
                    </StyledTCell>
                  </TableCell>
                  <TableCell>
                    <StyledTCell>
                      {dateTime.date} <span style={{ color: "#969AB6" }}>{dateTime.time}</span>
                    </StyledTCell>
                  </TableCell>
                </TableRow>
              );
            })}
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
