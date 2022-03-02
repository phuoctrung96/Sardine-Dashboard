import * as Sentry from "@sentry/react";
import { StyledStickyNav } from "components/Dashboard/styles";
import { FeedbackGraph } from "components/Feedbacks/FeedbackChart";
import { FeedbackListTable } from "components/Feedbacks/FeedbackListTable";
import {
  AddFeedbackDropdown,
  AddFilterBadge,
  FeedbackChartSwitch,
  SpaceBetweenContainer,
  StyledButton,
} from "components/Feedbacks/styles";
import { HorizontalContainer, StyledMainContentDiv, StyledMainDiv } from "components/Queues/styles";
import { useCallback, useEffect, useState } from "react";
import { Dropdown, ToggleButton } from "react-bootstrap";
import { FaAngleDown, FaPlus } from "react-icons/fa";
import { FeedbackRow, getSuccessResult, isFailure } from "sardine-dashboard-typescript-definitions";
import { getFeedbacksTable } from "utils/api";
import { captureException, captureFailure } from "utils/errorUtils";
import columnsIcon from "../utils/logo/columns.svg";
import Layout from "../components/Layout/Main";
import exportIcon from "../utils/logo/export.svg";
import graphIcon from "../utils/logo/graph.svg";
import mapIcon from "../utils/logo/map.svg";
import readonlyIcon from "../utils/logo/readonly.svg";
import upDownArrowIcon from "../utils/logo/up-down-arrow.svg";

export const Feedbacks = (): JSX.Element => {
  const [chartType, setChartType] = useState("graph");
  const handleChartTypeSwitch = (type: string) => setChartType(type);

  const [feedbacksData, setFeedbacksData] = useState<FeedbackRow[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await getFeedbacksTable({
        startDate: undefined,
        endDate: undefined,
        offset: 0,
      });
      if (isFailure(res)) {
        captureFailure(res);
        return;
      }
      const feedbacks = getSuccessResult(res) || [];
      setFeedbacksData(feedbacks);
    } catch (e) {
      captureException(e);
    }
  }, []);

  useEffect(() => {
    fetchData()
      .then()
      .catch((e) => Sentry.captureException(e));
  }, []);

  return (
    <Layout>
      <StyledStickyNav style={{ width: "100%", marginBottom: 0, backgroundColor: "white" }}>
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
            <StyledButton
              style={{
                padding: "10px 12px 10px 16px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#EBEDFF",
                color: "#141A39",
              }}
            >
              <span style={{ marginRight: 6 }}>Export</span>
              <img src={exportIcon} alt="export icon" />
            </StyledButton>
            <AddFeedbackDropdown>
              <Dropdown.Toggle>
                <span style={{ marginRight: 6 }}>Add Feedback</span>
                <FaAngleDown size={14} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as="button">Add manually</Dropdown.Item>
                <Dropdown.Item as="button">Upload .csv</Dropdown.Item>
              </Dropdown.Menu>
            </AddFeedbackDropdown>
          </HorizontalContainer>
        </HorizontalContainer>
      </StyledStickyNav>

      <StyledMainContentDiv>
        <StyledMainDiv style={{ backgroundColor: "#F2F6FF", padding: "16px 32px", minHeight: 320 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <FeedbackChartSwitch type="radio" name="feedback-chart" value={chartType} onChange={handleChartTypeSwitch}>
              <ToggleButton value="graph">
                <img src={graphIcon} alt="Graph icon" />
                Graph
              </ToggleButton>
              <ToggleButton value="map">
                <img src={mapIcon} alt="Map icon" />
                Map
              </ToggleButton>
            </FeedbackChartSwitch>
          </div>
          {chartType === "graph" && <FeedbackGraph />}
        </StyledMainDiv>

        <StyledMainDiv>
          <SpaceBetweenContainer style={{ margin: "16px 0" }}>
            <StyledButton style={{ backgroundColor: "#141A39" }}>
              Add filter <AddFilterBadge>1</AddFilterBadge>
            </StyledButton>
            <div style={{ display: "flex", gap: 12 }}>
              <StyledButton variant="outline-secondary" style={{ border: "1px solid #E6ECFA" }}>
                <span style={{ fontWeight: 500 }}>Last 30 days -</span>{" "}
                <span style={{ color: "#969AB6" }}> Dec 23, 2021 - Feb 02, 2022</span>
              </StyledButton>
              <StyledButton variant="outline-secondary" style={{ border: "1px solid #E6ECFA" }}>
                <img src={readonlyIcon} alt="" />
              </StyledButton>
            </div>
          </SpaceBetweenContainer>
        </StyledMainDiv>

        <StyledMainDiv style={{ marginBottom: 16 }}>
          <SpaceBetweenContainer style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
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
                <span>Last 7 days</span>
                <span style={{ color: "#969AB6" }}> / From Dec 23 - Dec 29</span>
              </span>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span
                style={{
                  color: "#969AB6",
                  fontSize: 13,
                }}
              >
                Columns
              </span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <StyledButton variant="outline-secondary" style={{ border: "1px solid #E6ECFA" }}>
                  <img src={upDownArrowIcon} alt="" />
                </StyledButton>
                <StyledButton variant="outline-secondary" style={{ border: "1px solid #E6ECFA" }}>
                  <img src={columnsIcon} alt="" />
                </StyledButton>
                <StyledButton variant="outline-secondary" style={{ border: "1px solid #E6ECFA" }}>
                  <FaPlus size={13} />
                </StyledButton>
              </div>
            </div>
          </SpaceBetweenContainer>
          <FeedbackListTable feedbacks={feedbacksData} />
        </StyledMainDiv>
      </StyledMainContentDiv>
    </Layout>
  );
};
