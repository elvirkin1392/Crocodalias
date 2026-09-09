import { useRef, useEffect, useState } from "react";
import { Items, Item, Container } from "./styled/verticalSelect";

const itemsHeight = 218;

export type SelectItem<TValue extends string> = {
  id: TValue;
  name: string;
};

type VerticalSelectProps<TValue extends string> = {
  items: SelectItem<TValue>[];
  selectedValue: TValue;
  handleSelect: (value: TValue) => void;
  handleClose: () => void;
};

export default function VerticalSelect<TValue extends string>({
  items,
  selectedValue,
  handleSelect,
  handleClose,
}: VerticalSelectProps<TValue>) {
  const slider = useRef<HTMLUListElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [scrollTopPrev, setScrollTopPrev] = useState<number>(0);

  useEffect(() => {
    const element = slider.current;

    if (!element) {
      return;
    }

    const index = items.findIndex((item) => item.id === selectedValue);

    element.scrollTo({
      top: index * itemsHeight,
    });
  }, []);

  function updateSelection() {
    const element = slider.current;

    if (!element) {
      return;
    }

    let index = Math.floor(element.scrollTop / itemsHeight);
    const diff = element.scrollTop - index * itemsHeight;
    index = diff > itemsHeight / 2 ? index + 1 : index;

    const selected = items[index];

    if (selected) {
      handleSelect(selected.id);
    }

    element.scrollTo({
      top: index * itemsHeight,
      behavior: "smooth",
    });
  }

  return (
    <Container>
      <Items
        className={`items ${isActive && "active"}`}
        onMouseLeave={() => {
          setIsActive(false);
        }}
        onTouchEnd={() => {
          setIsActive(false);
          updateSelection();
        }}
        onTouchStart={(e) => {
          setIsActive(true);
          setStartY(e.targetTouches[0].pageY);
          setScrollTopPrev(slider.current?.scrollTop ?? 0);
        }}
        onTouchMove={(e) => {
          const element = slider.current;

          if (!element) {
            return;
          }

          element.scrollTop =
            scrollTopPrev - (e.targetTouches[0].pageY - startY) * 2;
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
              onClick={() => selectedValue === item.id && handleClose()}
            >
              <div>{item.name}</div>
            </Item>
          );
        })}
      </Items>
    </Container>
  );
}
