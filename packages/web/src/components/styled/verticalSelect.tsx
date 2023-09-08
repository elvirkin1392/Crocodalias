import styled from "styled-components";

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
  position: relative;
  //height: 70%;
  overflow: hidden;
`
const Items = styled.ul`
  height: 200px;
  width: 100vw;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  padding: 220px 0 600px 0;
  margin: 0; 

  & .active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
  }

  & .selectedItem {
    color: rgb(121, 105, 196);
    
    & div {
      background: #fff;
    }
  }
`;
const Item = styled.li`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  
  & div {
    //border: 1px solid #ccc;
    border-radius: 50%;
    background: #ccc;

    height: 180px;
    width: 180px;


    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
`;

const Selected = styled.div`
  width: 100vw;
  height: 200px;
  position: absolute;
  top: 200px;
  left: 0;
`;
export { Items, Item, Selected, Container };
