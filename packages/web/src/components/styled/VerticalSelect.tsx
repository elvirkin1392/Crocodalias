import styled from "styled-components";

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
  position: relative;
`
const Items = styled.ul`
  height: 600px;
  width: 100vw;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  transform: scale(0.98);
  will-change: transform;
  position: relative;
  perspective: 500px;
  padding: 200px 0;

  &.active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
  }

  &.selectedItem {
    color: rgb(121, 105, 196);
  }
`;
const Item = styled.li`
  width: 100vw;
  height: 200px;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  color: rgba(0, 0, 0, 0.15);
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const Selected = styled.div`
  border: 5px solid #ccc;
  width: 100vw;
  height: 200px;
  position: absolute;
  top: 200px;
  left: 0;
`;
export { Items, Item, Selected, Container };
