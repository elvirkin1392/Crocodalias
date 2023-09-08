import { useRef,useEffect, useState } from "react";
import {Items, Item, Selected, Container} from './styled/VerticalSelect';

const itemsHeight = 240;

export default function VerticalSelect({items, selectedValue, onSelect}) {
  const slider = useRef(null);

  const [isActive, setIsActive] = useState<Boolean>(false);
  const [startY, setStartY] = useState<Number>();
  const [scrollTopPrev, setScrollTopPrev] = useState<Number>();

  useEffect(() => {
    let index = items.findIndex((item) =>  item.id === selectedValue)

    slider.current.scrollTo({
      top:  index * itemsHeight
    });
  }, []);

  function updateSelection(e) {
    let index = Math.floor(slider.current.scrollTop / itemsHeight);
    let diff = slider.current.scrollTop - index * itemsHeight;
    index = diff > (itemsHeight/2) ? index + 1 : index;

    onSelect(slider.current.querySelectorAll("li")[index]?.id);

    slider.current.scrollTo({
      top: index * itemsHeight,
      behavior: "smooth"
    });
  }

  return (
    <Container>
      <Selected className="selected" style={{ height: `${itemsHeight}px` }}/>
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
          setStartY(e.targetTouches[0].pageY);
          onSelect("");
          setScrollTopPrev(slider.current.scrollTop);
        }}
        onTouchMove={(e) => {
          let scrollTo = scrollTopPrev - (e.targetTouches[0].pageY - startY) * 2;
          slider.current.scrollTop = scrollTo;
        }}
        ref={slider}
      >
        {items.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              style={{ height: `${itemsHeight}px` }}
              className={`item ${
                selectedValue === item.id ? "selectedItem" : ""
              }`}
            >
              <div>{item.name}</div>
            </Item>
          );
        })}
      </Items>
    </Container>
  );
}

