import styled from "styled-components";

const TableWrapper = styled.div`
  margin: 30px 0;
  width: inherit;
`;

const StyledMainDiv = styled.div`
  padding: 0 5%;
  // @media (min-width: 1400px) {
  //   max-width: 90%;
  //   padding-left: 2%;
  //   padding-right: 5%;
  // }
  // @media only screen and (max-width: 1400px) and (min-width: 1300px) {
  //   width: 90%;
  //   padding-left: 5%;
  //   padding-right: 5%;
  // }
  // @media only screen and (max-width: 1300px) and (min-width: 700px) {
  //   margin: 20px 10px;
  //   width: 80%;
  // }
`;

const TextWrapper = styled.div`
  width: 300px;
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

const Link = styled.a`
  color: #325078;
`;

export { TableWrapper, TextWrapper, InputGroupWrapper, StyledMainDiv, PinContainer, Link };
