import { useLocation, useNavigate } from "react-router-dom";
import { MenuItem, Popover } from "@mui/material";
import { StyledStickyNav } from "components/Dashboard/styles";
import { FeedbackGraph } from "components/Feedbacks/FeedbackChart";
import { FeedbackListTable } from "components/Feedbacks/FeedbackListTable";
import {
  AddFeedbackDropdown,
  AddFilterBadge,
  StyledDaysDropdown,
  FeedbackChartSwitch,
  SpaceBetweenContainer,
  StyledButton,
  ChartTypeButton,
} from "components/Feedbacks/styles";
import { HorizontalContainer, StyledMainContentDiv, StyledMainDiv } from "components/Queues/styles";
import { useEffect, useState } from "react";
import { FaAngleDown, FaPlus } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import { selectIsAdmin, selectIsSuperAdmin, UseUserStore, useUserStore } from "store/user";
import { useCookies } from "react-cookie";
import { getClientFromQueryParams } from "utils/getClientFromQueryParams";
import { FEEDBACKS_PATH } from "modulePaths";
import { getDatesFromQueryParams, getDefaultEndDate, getDefaultStartDate } from "components/Transactions";
import { captureException } from "utils/errorUtils";
import { formatDate } from "utils/timeUtils";
import { CLIENT_QUERY_FIELD, END_DATE_QUERY_FIELD, START_DATE_QUERY_FIELD } from "utils/constructFiltersQueryParams";
import { DATE_FORMATS, QUERY_STATUS } from "../constants";
import columnsIcon from "../utils/logo/columns.svg";
import Layout from "../components/Layout/Main";
import exportIcon from "../utils/logo/export.svg";
import readonlyIcon from "../utils/logo/readonly.svg";
import upDownArrowIcon from "../utils/logo/up-down-arrow.svg";
import { DatesProps } from "../utils/store/interface";
import { useFeedbacksFetchResult } from "../hooks/fetchHooks";
import OrganizationDropdown from "../components/Dropdown/OrganizationDropdown";
import graphIcon from "../utils/logo/graph.svg";
import mapIcon from "../utils/logo/map.svg";

const DEFAULT_ROWS = 15;

function constructQueryParams(startDate: string, endDate: string, client: string): string {
  const params: { [key: string]: string } = {};
  params[CLIENT_QUERY_FIELD] = client;
  params[START_DATE_QUERY_FIELD] = startDate || getDefaultStartDate();
  params[END_DATE_QUERY_FIELD] = endDate || getDefaultEndDate();
  return new URLSearchParams(params).toString();
}

const AddFeedbackMenu = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowMenu(!showMenu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowMenu(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "add_feedback_menu_popover" : undefined;

  return (
    <div>
      <AddFeedbackDropdown
        style={{
          backgroundColor: "#3147ff",
          color: "white",
          padding: "10px 12px 10px 16px",
          textTransform: "none",
          borderRadius: 8,
        }}
        aria-describedby={id}
        onClick={handleClick}
      >
        Add Feedback
        <FaAngleDown size={13} style={{ marginLeft: 10 }} />
      </AddFeedbackDropdown>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "12px 8px" }}>
          <MenuItem>Add manually</MenuItem>
          <MenuItem>Upload .csv</MenuItem>
        </div>
      </Popover>
    </div>
  );
};

export const Feedbacks = (): JSX.Element => {
  const [chartGraphType, setChartGraphType] = useState(true);
  const handleChartTypeSwitch = () => setChartGraphType((prevState) => !prevState);
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const { search } = useLocation();

  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [page, setPage] = useState(1);

  const dates = getDatesFromQueryParams(search);
  const [startDate, setStartDate] = useState(dates.startDate);
  const [endDate, setEndDate] = useState(dates.endDate);
  const [selectedDateLabel, setSelectedDateLabel] = useState("");

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("");

  const { isAdmin, userOrganization } = useUserStore((state: UseUserStore) => ({
    userOrganization: state.organisation,
    isSuperAdmin: selectIsSuperAdmin(state),
    isAdmin: selectIsAdmin(state),
  }));

  const [cookies] = useCookies(["organization"]);
  const organisation = getClientFromQueryParams(search, isAdmin, userOrganization, cookies.organization);
  const changeOrganisation = (org: string) => {
    navigate(`${FEEDBACKS_PATH}?${constructQueryParams(startDate, endDate, org)}`);
  };

  const updateDate = (index: number, dateData: DatesProps) => {
    setStartDate(dateData.startDate);
    setEndDate(dateData.endDate);
    navigate(`${FEEDBACKS_PATH}?${constructQueryParams(startDate, endDate, organisation)}`);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const feedbacksResult = useFeedbacksFetchResult({ startDate, endDate, page, rows, order, orderBy, organisation });

  useEffect(() => {
    if (feedbacksResult.error !== null) {
      addToast("Failed to fetch feedbacks", {
        appearance: "error",
        autoDismiss: true,
      });
      captureException(feedbacksResult.error);
    }
  }, [feedbacksResult.error, addToast]);

  return (
    <Layout>
      <StyledStickyNav className="w-100 mb-0 bg-white">
        <HorizontalContainer
          style={{
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <HorizontalContainer>
            <span
              style={{
                color: "#141A39",
                fontWeight: "500",
                fontSize: 18,
                marginLeft: 44,
              }}
            >
              Feedback
            </span>
          </HorizontalContainer>
          <HorizontalContainer style={{ gap: 16 }}>
            <OrganizationDropdown changeOrganisation={changeOrganisation} organisation={organisation} />
            <StyledButton
              style={{
                padding: "10px 12px 10px 16px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#EBEDFF",
                color: "#141A39",
                textTransform: "none",
              }}
            >
              <span style={{ marginRight: 6 }}>Export</span>
              <img src={exportIcon} alt="export icon" />
            </StyledButton>
            <AddFeedbackMenu />
          </HorizontalContainer>
        </HorizontalContainer>
      </StyledStickyNav>

      <StyledMainContentDiv>
        <StyledMainDiv style={{ backgroundColor: "#F2F6FF", padding: "16px 32px", minHeight: 320 }}>
          <div className="d-flex justify-content-end">
            <FeedbackChartSwitch value={chartGraphType} exclusive onChange={handleChartTypeSwitch}>
              {/* eslint-disable-next-line react/jsx-boolean-value */}
              <ChartTypeButton value style={{ textTransform: "none" }}>
                <img src={graphIcon} alt="Graph icon" style={{ marginRight: 8 }} />
                Graph
              </ChartTypeButton>
              <ChartTypeButton value={false} style={{ textTransform: "none" }}>
                <img src={mapIcon} alt="Map icon" style={{ marginRight: 8 }} />
                Map
              </ChartTypeButton>
            </FeedbackChartSwitch>
          </div>
          {chartGraphType && <FeedbackGraph />}
        </StyledMainDiv>

        <StyledMainDiv>
          <SpaceBetweenContainer style={{ margin: "16px 0" }}>
            <StyledButton style={{ backgroundColor: "#141A39", color: "#FFFFFF", padding: "6px 12px", textTransform: "none" }}>
              Add filter <AddFilterBadge badgeContent="1" />
            </StyledButton>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <StyledDaysDropdown
                handleUpdateDate={updateDate}
                startDateString={startDate}
                endDateString={endDate}
                style={{ backgroundColor: "white", zIndex: 100 }}
                setSelectedLabel={(label) => setSelectedDateLabel(label)}
              />
              <StyledButton style={{ border: "1px solid #E6ECFA" }}>
                <img src={readonlyIcon} alt="" />
              </StyledButton>
            </div>
          </SpaceBetweenContainer>
        </StyledMainDiv>

        <StyledMainDiv style={{ marginBottom: 16 }}>
          <SpaceBetweenContainer style={{ marginBottom: 8 }}>
            <div className="d-flex align-items-center" style={{ gap: 20 }}>
              <span
                style={{
                  color: "#141A39",
                  fontWeight: "500",
                  fontSize: 16,
                }}
              >
                1,204 chargebacks
              </span>
              <span
                style={{
                  color: "#141A39",
                  fontSize: 13,
                }}
              >
                <span>{selectedDateLabel}</span>
                <span style={{ color: "#969AB6" }}>
                  {" "}
                  / From {formatDate(startDate, DATE_FORMATS.SHORT_DATE)} - {formatDate(endDate, DATE_FORMATS.SHORT_DATE)}
                </span>
              </span>
            </div>
            <div className="d-flex align-items-center" style={{ gap: 16 }}>
              <span
                style={{
                  color: "#969AB6",
                  fontSize: 13,
                }}
              >
                Columns
              </span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <StyledButton variant="outlined" style={{ border: "1px solid #E6ECFA" }}>
                  <img src={upDownArrowIcon} alt="" />
                </StyledButton>
                <StyledButton variant="outlined" style={{ border: "1px solid #E6ECFA" }}>
                  <img src={columnsIcon} alt="" />
                </StyledButton>
                <StyledButton variant="outlined" color="inherit" style={{ border: "1px solid #E6ECFA", padding: "8px 0px" }}>
                  <FaPlus size={13} />
                </StyledButton>
              </div>
            </div>
          </SpaceBetweenContainer>
          <FeedbackListTable
            feedbacks={feedbacksResult.data?.feedbacks ?? []}
            isLoading={feedbacksResult.status === QUERY_STATUS.LOADING}
            page={page}
            setPage={setPage}
            rows={rows}
            setRows={setRows}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
        </StyledMainDiv>
      </StyledMainContentDiv>
    </Layout>
  );
};
