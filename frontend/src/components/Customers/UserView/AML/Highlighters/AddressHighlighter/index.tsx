import React, { ReactElement } from "react";
import { Highlighter } from "components/Highlighter";
import { AmlPostalAddress, CustomersResponse } from "sardine-dashboard-typescript-definitions";
import { ListItemSepByComa } from "styles/List";
import { HighlighterProps } from "../types";
import { mapStateByCode } from "./mapStateByCode";

export const extractStreetWords = (customerData: CustomersResponse) => {
  const { street1 = "", street2 = "" } = customerData;
  const streetWords = [...street1.split(" "), ...street2.split(" ")].filter(
    // filter empty string
    (s) => s
  );

  return streetWords;
};

export const AddressHighlighter = ({ value, customerData }: HighlighterProps<AmlPostalAddress>) => {
  const { region_code, postal_code, city, country_code } = customerData;

  const stateFromRegionCode = mapStateByCode[region_code];

  const {
    line1,
    type,
    state: stateFromValue,
    postal_code: postal_code_from_value,
    city: city_from_value,
    country_code: country_code_from_value,
  } = value;

  const renderItems: (ReactElement | string)[] = [];

  if (type) {
    renderItems.push(<ListItemSepByComa key={type}>{type}</ListItemSepByComa>);
  }

  if (line1) {
    const streetWords = extractStreetWords(customerData);

    renderItems.push(
      <ListItemSepByComa key={`line1_${line1}`}>
        <Highlighter searchWords={streetWords} textToHighlight={line1} />
      </ListItemSepByComa>
    );
  }

  if (stateFromRegionCode) {
    renderItems.push(
      <ListItemSepByComa key={`stateFromRegionCode_${stateFromRegionCode}`}>
        <Highlighter searchWords={[stateFromRegionCode]} textToHighlight={stateFromValue} />
      </ListItemSepByComa>
    );
  }

  if (postal_code_from_value) {
    renderItems.push(
      <ListItemSepByComa key={`postal_code_from_value_${postal_code_from_value}`}>
        <Highlighter searchWords={[postal_code]} textToHighlight={postal_code_from_value} />
      </ListItemSepByComa>
    );
  }

  if (city_from_value) {
    renderItems.push(
      <ListItemSepByComa key={`city_from_value_${city_from_value}`}>
        <Highlighter searchWords={[city]} textToHighlight={city_from_value} />
      </ListItemSepByComa>
    );
  }

  if (country_code_from_value) {
    renderItems.push(
      <ListItemSepByComa key={`country_code_from_value_${country_code_from_value}`}>
        <Highlighter searchWords={[country_code]} textToHighlight={country_code_from_value} />
      </ListItemSepByComa>
    );
  }

  return <>{renderItems}</>;
};
