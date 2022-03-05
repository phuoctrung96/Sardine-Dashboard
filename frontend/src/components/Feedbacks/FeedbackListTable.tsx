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
};

export const FeedbackListTable = (props: FeedbackListTableProps): JSX.Element => {
  const { feedbacks, isLoading, page, setPage, rows, setRows } = props;

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
              <BorderedTCell>
                <TableSortLabel>Session Key</TableSortLabel>
              </BorderedTCell>
              <TableCell>
                <TableSortLabel>User ID</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Type</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Status</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Country</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>City</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Reason Codes</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Date/time</TableSortLabel>
              </TableCell>
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
