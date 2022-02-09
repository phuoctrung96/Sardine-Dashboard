import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CustomersResponse } from "sardine-dashboard-typescript-definitions";
import { replaceAllSpacesWithUnderscores, replaceAllUnderscoresWithSpaces } from "utils/stringUtils";
import { renderReasonCodes } from "utils/renderReasonCodes";
import BulletView, { BulletContainer } from "components/Common/BulletView";
import imgTick from "../../../utils/logo/tick.svg";
import { Link } from "../../Common/Links";
import { TableCardWrapper } from "./TableCardWrapper";

export const TABLE_CARD_TYPES = {
  COMPONENT: "component",
  LIST: "list",
  CARD: "card",
} as const;

export type TableCardType = typeof TABLE_CARD_TYPES[keyof typeof TABLE_CARD_TYPES];

type CardKeyValue = [string, string];

interface TableCardCustomerData {
  key: string;
  type: typeof TABLE_CARD_TYPES.CARD;
  value: CardKeyValue[];
}

interface TableCardListData {
  key: string;
  type: typeof TABLE_CARD_TYPES.LIST;
  component: JSX.Element;
}

interface TableCardComponentData {
  component: JSX.Element;
  key: string;
  type: typeof TABLE_CARD_TYPES.COMPONENT;
}

export type TableCardData = TableCardCustomerData | TableCardListData | TableCardComponentData;

export const isTableCardCustomerData = (tableCardData: TableCardData): tableCardData is TableCardCustomerData =>
  tableCardData.type === TABLE_CARD_TYPES.CARD;

export const isTableCardListData = (tableCardData: TableCardData): tableCardData is TableCardListData =>
  tableCardData.type === TABLE_CARD_TYPES.LIST;

export const isTableCardComponentData = (tableCardData: TableCardData): tableCardData is TableCardListData =>
  tableCardData.type === TABLE_CARD_TYPES.COMPONENT;

export const CardContentOther: React.FC<{
  featureData: string[];
  ind: number | string;
  getValueForKey: (arg: string) => string | JSX.Element | JSX.Element[];
}> = ({ featureData, ind, getValueForKey }) => {
  const feature: string = Array.isArray(featureData) ? featureData[0] : featureData;
  const description: string | undefined = Array.isArray(featureData) ? featureData[1] : undefined;
  // checking feature.replaceAll is a temporary fix. feature should be typed correctly.
  // Error detail: https://sentry.io/organizations/sardine/issues/2717710736/?project=5709359&query=is%3Aunresolved
  // String.prototype.replaceAll is a newly added function. Babel should have handle it, but
  // Babel might have failed to transpile it. We should avoid using replaceAll for now.
  const title = (
    <Card.Title
      style={{
        fontSize: 15,
        marginBottom: 3,
        textTransform: "capitalize",
      }}
      className="font-weight-normal"
      id={`${replaceAllSpacesWithUnderscores(feature)}_title`}
    >
      {replaceAllUnderscoresWithSpaces(feature)}
    </Card.Title>
  );

  return (
    <div
      style={{
        margin: "20px 5px",
        alignItems: "center",
      }}
      key={ind}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {description ? (
          <OverlayTrigger placement="top" overlay={<Tooltip id={feature}>{description}</Tooltip>}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#909BAD",
              }}
            >
              {title}
            </div>
          </OverlayTrigger>
        ) : (
          title
        )}
        {getValueForKey(feature)?.toString() === "true" ? (
          <img
            id={`${replaceAllSpacesWithUnderscores(feature)}_tick`}
            alt="tick"
            src={imgTick}
            style={{ width: 17, marginLeft: 5 }}
          />
        ) : null}
      </div>
      <div id={`${replaceAllSpacesWithUnderscores(feature)}_value`} style={{ fontSize: 14 }}>
        {typeof getValueForKey(feature) === "object" ? getValueForKey(feature) : getValueForKey(feature).toString()}{" "}
      </div>
    </div>
  );
};

// TODO: Stop using if/else.
export const TableCard: React.FC<{
  customerData?: CustomersResponse;
  name: string;
  value: CardKeyValue[];
}> = ({ customerData = undefined, name, value }): JSX.Element => {
  const getValueForKey = (key: string) => {
    const filteredData = Object.entries(customerData || {}).filter((d) => d[0] === key);
    if (filteredData.length > 0) {
      if (filteredData[0].length > 1) {
        const val = filteredData[0][1];
        if (!val) {
          return "-";
        }
        if (key === "address") {
          return val.length > 0 && customerData ? (
            customerData.mapUrls ? (
              <BulletContainer>
                {customerData.mapUrls.map((url, index) => (
                  <li key={url}>
                    <Link id="address_link" href={url} rel="noreferrer" target="_blank">
                      {(val.split && val.split("\n")[index]) || "-"}
                    </Link>
                    <br />
                  </li>
                ))}
              </BulletContainer>
            ) : (
              <Link id="address_link" href={customerData?.address_google_maps_url} rel="noreferrer" target="_blank">
                {val}
              </Link>
            )
          ) : (
            "-"
          );
        }
        if (["facebook_link", "twitter_link", "linkedin_link"].includes(key.toLowerCase())) {
          return <BulletView data={val || ""} isLink />;
        }
        if (key === "phone_reason_codes") {
          return renderReasonCodes(val);
        }
        if (key === "tax_id") {
          return "encrypted";
        }
        if (key === "email_reason_codes") {
          return renderReasonCodes(val);
        }
        return String(val).length > 0 ? <BulletView data={val || ""} /> : "-";
      }
    }
    return "-";
  };

  const content = value.map((featureData, ind) => (
    <CardContentOther featureData={featureData} ind={ind} getValueForKey={getValueForKey} key={featureData.flat().join()} />
  ));

  return (
    <TableCardWrapper
      headerLabel={name}
      cardKey={name}
      cardBodyStyle={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 250px)",
        gridAutoRows: "auto",
      }}
    >
      <>{content}</>
    </TableCardWrapper>
  );
};
