import styled from "styled-components";
import { Card } from "react-bootstrap";
import { StyledTitleName } from "components/Dashboard/styles";

const TableWrapper = styled.div`
  margin: 30px 0;
  width: inherit;
`;

const StyledMainDiv = styled.div`
  @media (min-width: 1400px) {
    width: 95%;
    padding-left: 2%;
    padding-right: 5%;
  }
  @media only screen and (max-width: 1400px) and (min-width: 1300px) {
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
  }
  @media only screen and (max-width: 1300px) and (min-width: 700px) {
    margin: 20px 10px;
    width: 80%;
  }
`;

const InputGroupWrapper = styled.div`
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

const UserProfilePic = styled.div`
  height: 36px;
  width: 36px;
  border-radius: 18px;
  margin: 15px 12px 16px 16px;
  border: #325078;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
`;

const UserCard = styled(Card)`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
`;

const ScoreWrapper = styled.div`
  .btn-secondary {
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }
`;

const PinContainer = styled.div`
  margin: 0,
  padding: 0,
  width: '80vw',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 250px)',
  gridAutoRows: '10px',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  justifyContent: 'center',
  backgroundColor: 'black'
`;

const Cell = styled.td`
  vertical-align: middle;
  min-height: 25px;
  padding: 10px 10px;
`;

export const BaseStyledTr = styled.tr`
  height: 36px;

  border-radius: 4px;
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 140%;
  font-feature-settings: "ss02" on, "zero" on;
  padding: 9px 0px;
  background-color: #ffffff;
  :nth-child(even) {
    background-color: #f7f9fc;
  }
`;

const StyledTr = styled(BaseStyledTr)<{ isHighlight?: boolean }>`
  ${(props) => {
    if (!props.isHighlight) {
      return `
        color: #000000;
        :hover {
          color: #ffffff;
        }
      `;
    }

    return `
      color: #14a2b8;
      font-weight: bold;
      :hover {
        color: #ccf8ff
      }
    `;
  }}
  :hover {
    a,
    .btn-link {
      color: white;
    }
    color: #ffffff;
    background-color: #325078;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  table-layout: auto;
  width: -webkit-fill-available;
  display: table;
`;

const StyledTh = styled.th`
  height: 16px;
  padding: 0px 8px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */

  letter-spacing: 0.14em;
  text-transform: uppercase;

  /* Secondary */

  color: black;
`;

const DetailsHeaderParent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-auto-rows: auto;
`;

const DetailsHeaderChild = styled.div`
  margin: 10px 10px;
`;

const DetailsHeaderValue = styled.div`
  font-family: IBM Plex Sans;
  letter-spacing: 0em;
  text-align: left;
  line-break: anywhere;
  font-size: 14px;
  color: var(--dark-14);
`;

const DetailsHeaderTile = styled(StyledTitleName)`
  font-size: 14px;
  color: rgb(144, 155, 173);
  font-weight: normal;
`;

export {
  TableWrapper,
  InputGroupWrapper,
  StyledMainDiv,
  UserProfilePic,
  UserCard,
  ScoreWrapper,
  PinContainer,
  Cell,
  StyledTable,
  StyledTh,
  StyledTr,
  DetailsHeaderParent,
  DetailsHeaderChild,
  DetailsHeaderValue,
  DetailsHeaderTile,
};
