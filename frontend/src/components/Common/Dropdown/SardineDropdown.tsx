import { useEffect, useRef, useState } from "react";
import { FormControl } from "react-bootstrap";
import styled from "styled-components";
import { replaceAllSpacesWithUnderscores } from "../../../utils/stringUtils";
import DropdownButton from "../../Dropdown/DropdownButton";
import DropdownItem from "../../Dropdown/DropdownItem";
import { FieldTitle } from "../styles/titles/fieldTitleStyles";
import { DropdownItemProps } from "./dropDownInterface";

const StyledDropdown = styled.div`
  z-index: 10;
  height: 40px;
  padding-left: 0;
`;

const StyledDropdownItems = styled.div`
  background: #ffffff;
  top: 0;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.02);
  max-height: 40vh;
  overflow-y: scroll;
`;

interface Props<T> {
  id: string;
  title?: string;
  items: Array<T>;
  initialValue: T;
  keyOption?: keyof T;
  keyValue?: keyof T;
  onSelectValue?: (value: T) => void;
}

const SardineDropdown = <T extends unknown>({
  items,
  keyOption,
  keyValue,
  onSelectValue,
  initialValue,
  title,
  id,
}: Props<T>): JSX.Element => {
  if (items.length && typeof items[0] === "object" && !keyOption) {
    throw new Error("keyOption is required when items is a object");
  }

  const convertedItems: DropdownItemProps<T>[] = items.map((item: T) => {
    const option = keyOption ? `${item[keyOption]}` : `${item}`;
    return {
      option,
      value: keyValue ? `${item[keyValue]}` : option,
      self: item,
    };
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const [selectedElement, setSelectedElement] = useState<DropdownItemProps<T>>();

  const [search, setSearch] = useState("");

  const handleClick = (e: MouseEvent) => {
    if (!dropdownRef?.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (initialValue) {
      const selectedItem = convertedItems.find((item) => item.value === initialValue);
      if (selectedItem) {
        setSelectedElement(selectedItem);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      {title && <FieldTitle className="p-0">{title} </FieldTitle>}
      {open ? (
        <StyledDropdown ref={dropdownRef}>
          <StyledDropdownItems>
            <FormControl
              type="text"
              value={search}
              placeholder="Search here"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            {convertedItems
              .filter((item) => item?.option?.toLowerCase().includes(search.toLowerCase()))
              .map((ele) => (
                <DropdownItem
                  clicked={() => {
                    setSelectedElement(ele);
                    onSelectValue?.(ele?.self as T);
                    setOpen(false);
                  }}
                  key={replaceAllSpacesWithUnderscores(ele.option)}
                  item={ele}
                  isSelected={ele.option === selectedElement?.option}
                  id={`dropdown_item_${replaceAllSpacesWithUnderscores("ele.option")}`}
                />
              ))}
          </StyledDropdownItems>
        </StyledDropdown>
      ) : (
        <DropdownButton clicked={() => setOpen(true)} item={selectedElement} title={title} id={id} />
      )}
    </>
  );
};

export default SardineDropdown;
