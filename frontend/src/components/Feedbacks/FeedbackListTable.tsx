import { MenuItem, Select, TableBody, TableCell, TableRow, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FEEDBACK_DETAILS_PATH } from "modulePaths";
import { FeedbackRow, GetFeedbacksListResponse } from "sardine-dashboard-typescript-definitions";
import LoadingText from "components/Common/LoadingText";
import { DivNoDataAvailable } from "components/Customers/UserView";
import { toInteger } from "lodash-es";
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
  time: formatTimestampInUtc(+timestamp, { unit: TIME_UNITS.MILLISECOND, format: DATE_FORMATS.HOUR_MINUTE }),
});

export const FeedbackTableRow = (props: { data: FeedbackRow }): JSX.Element => {
  const { data } = props;
  const dateTime = convertTimestampToDateAndTime(data.dateTime);
  const navigate = useNavigate();

  return (
    <TableRow onClick={() => navigate(FEEDBACK_DETAILS_PATH)} className="cursor-pointer">
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
      title: "30 rows",
      value: 30,
    },
    {
      title: "60 rows",
      value: 60,
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
      <div style={{ height: "50vh", marginTop: 64 }}>
        <LoadingText />;
      </div>
    );
  }

  if (!feedbacks.length) {
    return (
      <div style={{ height: "50vh", marginTop: 64 }}>
        <DivNoDataAvailable />
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
              {tableHeadCells.map((cell) => {
                const { id, label } = cell;
                return (
                  <TableCell key={id} sortDirection={orderBy === id ? order : false}>
                    <TableSortLabel
                      active={orderBy === id}
                      direction={orderBy === id ? order : undefined}
                      onClick={createSortHandler(id)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </StyledTHead>
          <TableBody>
            {feedbacks.map((data) => (
              <FeedbackTableRow key={`${data.sessionKey}_${data.userId}_${data.time}`} data={data} />
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <Select style={{ maxWidth: 110 }} label="Rows" value={rows} onChange={(e) => setRows(toInteger(e.target.value))}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
        <StyledPagination count={12} page={page} onChange={handleChange} showFirstButton showLastButton />
      </div>
    </div>
  );
};
