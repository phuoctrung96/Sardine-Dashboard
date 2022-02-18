import styled from "styled-components";
import { StyledTitleName } from "components/Dashboard/styles";

// TODO(nghia): reuse components, grep dupplicated styles and ref to here later
export const Breadcumb = styled(StyledTitleName)`
  font-size: 14px;
  font-weight: "bold";
`;

export const HeaderSectionContainer = styled.div`
  width: inherit;
  margin: 10px 10px;
  display: flex;
  justify-content: space-between;
  .search-btn {
    width: 300px;
    cursor: pointer;
  }
  @media (max-width: 480px) {
    display: block;
  }
`;

export const ExpiredDocContainer = styled.div`
  width: inherit;
  background-color: var(--danger);
  color: white;
  text-align: center;
`;

export const ExpiredDocTitle = styled.div`
  padding: 5px;
  font-weight: 600;
`;
