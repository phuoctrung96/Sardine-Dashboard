import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const HandleOverflowDiv = styled.div`
  max-height: 200px;
  overflow: auto;
`;

export const TableWrapper = styled.div`
  margin: 30px 0;
  width: inherit;
`;

export const StyledLink = styled(Link)`
  color: #141a39;
  font-size: 14px;
  line-height: 18px;
  word-break: break-all;
`;

export const StyledMainDiv = styled.div`
  padding: 0 5%;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background-color: #ffffff;
  margin: 8px 0px;
  padding: 0px 8px;
`;

export const MainDiv = styled.body`
  // position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  // height: 1100px;

  margin: auto;
  width: 500px;
  //   height : 495px;
`;

export const BackgroundBox = styled.div`
  // position: absolute;
  left: 0%;
  right: 0%;
  top: 5%;
  bottom: 5%;
  // height: 1100px;

  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.05);
  @media (max-width: 760px) {
    border-radius: 10px 10px 0px 0px;
  }
`;

export const Title = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  font-feature-settings: "ss02" on;
  color: var(--dark-14);
`;

export const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HorizontalSpace = styled.div`
  margin: 15px;
`;

export const Container = styled.div``;

export const StyledContainer = styled.div`
  margin: 50px 50px 0px;
  @media (max-width: 760px) {
    margin: 32px 16px 0px;
  }
  label {
    margin-bottom: 0px;
  }
`;

export const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 35px;
  height: 55px;
  overflow: hidden;
  background-color: #f8fbff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Dropbtn = styled.div`
  text-align: center;
  padding: 14px 16px;
  width: 270px;
  height: 50px;
  max-width: 100%;
  border: 1px solid #ced4da;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  margin: 8px 0px;
  cursor: pointer;
  color: #325078;
  span {
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
  }
`;

export const SubDropbtn = styled.div`
  text-align: center;
  padding: 14px 16px;
  width: 250px;
  height: 40;
  max-width: 100%;
  display: flex;
  cursor: pointer;
  color: black;
  justify-content: space-between;
  span {
    font-weight: 600;
    font-size: 20px;
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: 250px;
  border-radius: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  table-layout: auto;
  width: -webkit-fill-available;
  display: table;
`;

export const StyledTh = styled.th`
  height: 16px;
  padding: 10px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: 0.14em;

  /* Secondary */

  color: #325078;
  background: #f7f9fc;
`;

export const StyledTr = styled.tr`
  height: 36px;

  border-radius: 4px;
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  font-feature-settings: "ss02" on, "zero" on;
  color: grey;
  padding: 9px 0px;
  background-color: #ffffff;
  border: solid 2px transparent;
  border-bottom-color: #F7F9FC;
  width: auto;
  :hover {
    background-color: #F7F9FC;
`;

export const StyledTd = styled.td`
  vertical-align: middle;
  height: 25px;
  padding: 0px 8px;
`;

export const CheckBox = styled.button`
  border-radius: 5px;
  height: 22px;
  width: 22px;
  border: none;
`;

export const TdValue = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 14px;
  color: #001932;
`;

export const StyledMenuDiv = styled.div`
  // height : 100vh;
  min-width: 100%;
  overflow: hidden;
  @media only screen and (max-width: 700px) {
    transition: all 500ms linear;
  }
`;

export const StyledDrawer = styled.div`
  padding: 20px;
  background: white;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 700px) {
    transition: left 0.5s ease;
    // transform : translateX(0);
  }
`;

export const StyledButtonGroup = styled.div`
  padding-top: 0px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background: white;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 700px) {
    transition: left 0.5s ease;
    // transform : translateX(0);
  }
`;

export const StyledMainContentDiv = styled.div`
  width: 100%;
  @media only screen and (max-width: 700px) {
    min-width: 300px;
    margin-left: 240px;
    overflow-y: hidden;
  }
`;

export const PinContainer = styled.div`
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 250px)',
  gridAutoRows: '10px',
  position: 'absolute',
  transform: 'translateX(-50%)',
  justifyContent: 'center',
  backgroundColor: 'black'
`;

export const DetailsHeaderParent = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5%;
  background: white;
`;

export const DetailsHeaderChild = styled.div`
  padding: 10px 24px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const DetailsHeaderValue = styled.div`
  font-family: IBM Plex Sans;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  color: #325078;
  line-break: anywhere;
  font-size: 14px;
  font-style: normal;
`;

export const DetailsCardView = styled(Card)`
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  margin-top: 56px;
  position: relative;
  & .card-header {
    margin-bottom: 24px;
    padding: 0;
    border: none;
    background-color: transparent;
    color: "#141A39";
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  & .card-body {
    background-color: white;
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    & > div {
      padding: 16px;
      border-bottom: 1px solid #f2f6ff;
      @media (min-width: 1600px) {
        width: 25%;
      }
      @media only screen and (max-width: 1600px) and (min-width: 1200px) {
        width: 33.33333333333%;
      }
      @media only screen and (max-width: 1200px) and (min-width: 800px) {
        width: 50%;
      }
      @media only screen and (max-width: 800px) {
        width: 100%;
      }
    }
  }
`;

export const DetailsCardTitle = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  color: #969ab6;
  text-transform: capitalize;
  margin-bottom: 6px;
`;

export const DetailsCardValue = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #141a39;
`;

export const StyledUserPhoto = styled.div`
  display: flex;
  width: 60px;
  min-width: 60px;
  height: 60px;
  border-radius: 36px;
  color: #ffffff;
  justify-content: center;
  align-items: center;

  font-style: normal;
  font-weight: 300;
  font-size: 21px;
  line-height: 27px;
  text-align: center;
`;

export const StickyContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
`;
