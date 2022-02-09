import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { DROP_DOWN_BG, isDurationValue } from "../../utils/dataProviderUtils";
import rightArrow from "../../utils/logo/rightArrow.png";
import rightArrowWhite from "../../utils/logo/rightArrowWhite.png";
import {
  Title,
  StyledUl,
  DropDownLi,
  Dropbtn,
  SubA,
  SubDropDownContent,
  SubDropbtn,
  DropDownContent,
} from "../RulesModule/styles";

export interface DataProps {
  title: string;
  items: DataProps[];
  datatype: string;
}

interface ArrowProps {
  isSelected: boolean;
}

interface RecursiveDropdownProps {
  show: boolean;
  value: string;
  data: DataProps[];
  onDropdownClicked: (show: boolean) => void;
  onItemClicked: (value: string, datatype: string) => void;
  style?: React.CSSProperties;
}

const RecursiveDropdown = (p: RecursiveDropdownProps) => {
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubSections, setSelectedSubSections] = useState<string[]>([]);

  const IconArrow = (iProps: ArrowProps) => (
    <Image
      className="dropdown"
      src={iProps.isSelected ? rightArrowWhite : rightArrow}
      style={{ width: 10, height: 10, alignSelf: "center" }}
    />
  );

  const handleItemClick = (value: string, dt: string) => {
    if (!value) return;

    if (selectedSection.length > 0) {
      let subValues = selectedSubSections;
      if (subValues.length > 0) {
        if (!isDurationValue(value) && selectedSubSections.length > 1) {
          subValues.pop();
        }

        const _data = p.data.filter((r) => r.title === selectedSection);
        if (_data.length > 0) {
          const _subData = _data[0].items.filter((i) => selectedSubSections.includes(i.title));
          if (_subData.length > 0) {
            const subItems = _subData[0].items;
            if (!subItems.map((t) => t.title).includes(value)) {
              const subToSubItems = subItems
                .map((t) => t.items.map((si) => si.title).join(","))
                .join(",")
                .split(",");

              if (subToSubItems.length === 0) {
                subValues = [];
              }
            }
          }
        }
      }

      const val =
        subValues.length > 0
          ? `${selectedSection}.${subValues.join(".")}${
              value.toLowerCase() !== "all" ? (isDurationValue(value) ? `_${value}` : `.${value}`) : ""
            }`
          : `${selectedSection}.${value}`;

      p.onItemClicked(val, dt);
    } else {
      p.onItemClicked(value, dt);
    }

    setSelectedSubSections([]);
    setSelectedSection("");
  };

  const renderDropDownItem = (items: DataProps[]) =>
    items.map((item) =>
      item.items.length === 0 ? (
        <SubA key={item.title} onClick={() => handleItemClick(item.title, item.datatype)} className="dropdown">
          {item.title}
        </SubA>
      ) : (
        <div className="dropdown" key={item.title}>
          <SubDropbtn
            key={item.title}
            onClick={() => {
              const allTitles = items.map((i) => i.title);
              const section = p.data.filter((r) => r.title === selectedSection);
              if (section.length > 0) {
                const subSection = section[0].items.filter((r) => r.title === item.title);
                if (subSection.length > 0) {
                  setSelectedSubSections([item.title]);
                } else if (section[0].items.filter((r) => r.items.map((d) => d.title).includes(item.title)).length > 0) {
                  if (selectedSubSections.filter((sub) => allTitles.includes(sub)).length > 0) {
                    const subSections = selectedSubSections.slice(0, -1);
                    setSelectedSubSections([...subSections, item.title]);
                  } else {
                    setSelectedSubSections([...selectedSubSections, item.title]);
                  }
                }
              }
            }}
            style={{
              width: 280,
              backgroundColor: selectedSubSections.includes(item.title) ? "#2173FF" : "#fff",
            }}
            className="dropdown"
          >
            <Title
              style={{
                height: 20,
                color: selectedSubSections.includes(item.title) ? "#FFFFFF" : "#325078",
              }}
              className="dropdown"
            >
              {item.title}
            </Title>
            {item.items.length > 0 ? <IconArrow isSelected={selectedSubSections.includes(item.title)} /> : null}
          </SubDropbtn>
          {selectedSubSections.includes(item.title) ? (
            <SubDropDownContent style={{ top: 0, left: 280, display: "block" }} className="dropdown">
              {renderDropDownItem(item.items)}
            </SubDropDownContent>
          ) : null}
        </div>
      )
    );

  const renderDropDown = () => {
    const result = p.data.map((element, ind) => (
      <DropDownLi key={element.title}>
        <SubDropbtn
          onClick={() => {
            if (p.data[ind].items.length > 0) {
              const val = element.title === selectedSection ? "" : element.title;
              setSelectedSection(val);
            } else {
              handleItemClick(element.title, element.datatype);
            }
          }}
          style={{
            backgroundColor: selectedSection === element.title ? "#2173FF" : "",
          }}
          className="dropdown"
        >
          <Title
            style={{
              color: selectedSection === element.title ? "#FFFFFF" : "#325078",
            }}
            className="dropdown"
          >
            {element.title}
          </Title>
          {element.items.length > 0 ? <IconArrow isSelected={selectedSection === element.title} /> : null}
        </SubDropbtn>
        {selectedSection === element.title ? (
          <SubDropDownContent style={{ top: 0, display: "block" }} className="dropdown">
            {" "}
            {renderDropDownItem(element.items)}
          </SubDropDownContent>
        ) : null}
      </DropDownLi>
    ));

    return <ul style={{ padding: 0 }}> {result} </ul>;
  };

  return (
    <StyledUl style={{ justifyContent: "left", backgroundColor: "transparent", minWidth: "max-content", ...p.style }}>
      <DropDownLi>
        <Dropbtn
          style={{
            height: 40,
            alignItems: "center",
            backgroundColor: DROP_DOWN_BG,
            textTransform: "capitalize",
            width: "100%",
          }}
          onClick={() => p.onDropdownClicked(p.show)}
        >
          {p.value.length > 0 ? p.value : "Select Field"}
        </Dropbtn>
        <DropDownContent
          style={{
            display: p.show ? "block" : "",
          }}
        >
          {renderDropDown()}
        </DropDownContent>
      </DropDownLi>
    </StyledUl>
  );
};

export default RecursiveDropdown;
