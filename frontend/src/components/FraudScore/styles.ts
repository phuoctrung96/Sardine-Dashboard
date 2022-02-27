import styled from "styled-components";

export const TableWrapper = styled.div`
  margin: 30px 0;
  width: inherit;
`;

export const StyledMainDiv = styled.div`
  padding: 0 5%;
  max-width: 90%;
`;

export const InputGroupWrapper = styled.div`
  background-color: white;
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

export const PinContainer = styled.div`
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
