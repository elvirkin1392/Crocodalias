import { useRef, useState } from "react";
import {Items, Item, Selected, Container} from './styled/VerticalSelect';

const itemsHeight = "200px";

export default function VerticalSelect({items, initialValue}) {
  const slider = useRef(null);

  const [isActive, setIsActive] = useState<Boolean>(false);
  const [startY, setStartY] = useState<Number>();
  const [scrollTopPrev, setScrollTopPrev] = useState<Number>();
  const [selectedIndex, setSelectedId] = useState<String>(initialValue);

  function updateSelection(e) {
    let index = Math.floor(slider.current.scrollTop / 200);
    let diff = slider.current.scrollTop - index * 200;
    index = diff > 100 ? index + 1 : index;

    setSelectedId(slider.current.querySelectorAll("li")[index]?.id);

    slider.current.scrollTo({
      top: index * 200,
      behavior: "smooth"
    });
  }

  return (
    <Container>
      <Selected className="selected" style={{ height: itemsHeight }}/>
      <Items
        className={`items ${isActive && "active"}`}
        onMouseLeave={(e) => {
          setIsActive(false);
        }}
        onTouchEnd={(e) => {
          setIsActive(false);
          updateSelection(e);
        }}
        onTouchStart={(e) => {
          setIsActive(true);
          setStartY(e.pageY);
          setSelectedId("");
          setScrollTopPrev(slider.current.scrollTop);
        }}
        onTouchMove={(e) => {
          console.log('mouse move')
          // if (!isActive) return;
          // e.preventDefault();

          let scrollTo = scrollTopPrev - (e.pageY - startY) * 2;
          slider.current.scrollTop = scrollTo;
        }}
        ref={slider}
      >
        {items.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              style={{ height: itemsHeight }}
              className={`item ${
                selectedIndex === item.id ? "selectedItem" : ""
              }`}
            >
              {item.name}
            </Item>
          );
        })}
      </Items>
    </Container>
  );
}

