import { StyledStickyNav } from "components/Dashboard/styles";
import { HorizontalContainer, StickyContainer } from "components/Queues/styles";
import { Button } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import Layout from "../components/Layout/Main";
import exportIcon from "../utils/logo/export.svg";

export const Feedbacks = (): JSX.Element => (
  <Layout>
    <StickyContainer>
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
            <Button
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
            </Button>
            <Button
              style={{
                padding: "10px 12px 10px 16px",
                borderRadius: 8,
                backgroundColor: "#3147FF",
                border: "none",
                color: "white",
                fontSize: 14,
                marginRight: 72,
              }}
            >
              <span style={{ marginRight: 6 }}>Add Feedback</span>
              <FaAngleDown size={14} />
            </Button>
          </HorizontalContainer>
        </HorizontalContainer>
      </StyledStickyNav>
    </StickyContainer>
  </Layout>
);
