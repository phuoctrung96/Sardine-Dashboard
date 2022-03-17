import React, { ReactNode } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { replaceAllSpacesWithUnderscores, replaceAllUnderscoresWithSpaces } from "utils/stringUtils";
import { DetailsCardView, DetailsCardTitle } from "../Queues/styles";

export interface CardAttribute {
  key: string;
  value: ReactNode;
  valueParser?: (val: ReactNode) => string;
  toolTip?: string;
  click?: () => void;
}

interface Props {
  header: string;
  attributes: Array<CardAttribute>;
  children?: JSX.Element;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  icon?: JSX.Element;
}

interface CardTitleProps {
  title: string;
  tooltip: string;
}

interface CardAttributesProps {
  attribute: CardAttribute;
  keyId: number;
}

const defaultValueParser = (value: ReactNode) => (value === "" || value === undefined || value === null ? "-" : value);

const DetailCardTitle: React.FC<CardTitleProps> = (props) => {
  const { title, tooltip } = props;
  if (tooltip === "") {
    return (
      <DetailsCardTitle>
        <div id={`${replaceAllSpacesWithUnderscores(title)}_title`} data-tid="title">
          {title}
        </div>
      </DetailsCardTitle>
    );
  }
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id={title}>{tooltip}</Tooltip>}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontWeight: 400,
            paddingRight: 10,
          }}
        >
          <DetailsCardTitle>
            <div>{title}</div>
          </DetailsCardTitle>
        </div>
      </div>
    </OverlayTrigger>
  );
};

const CardAttributes: React.FC<CardAttributesProps> = (props) => {
  const { attribute, keyId } = props;
  const { click, key, value, toolTip = "", valueParser = defaultValueParser } = attribute;
  return (
    <div key={keyId}>
      <DetailCardTitle title={replaceAllUnderscoresWithSpaces(key)} tooltip={toolTip} />
      <div onClick={click} onKeyPress={click} role="button" tabIndex={0} id={`${replaceAllSpacesWithUnderscores(key)}_value`}>
        {valueParser(value)}
      </div>
    </div>
  );
};

const DataCard: React.FC<Props> = (props) => {
  const { header, attributes, children, headerStyle, icon } = props;
  return (
    <DetailsCardView>
      <Card.Header
        id={replaceAllSpacesWithUnderscores(header)}
        style={{
          ...headerStyle,
        }}
      >
        <>{icon}</>
        <span>{header}</span>
      </Card.Header>
      {attributes.length === 0 ? (
        <>{children}</>
      ) : (
        <Card.Body>
          {attributes.map((attr, keyId) => (
            <CardAttributes attribute={attr} keyId={keyId} key={attr.key} />
          ))}
        </Card.Body>
      )}
    </DetailsCardView>
  );
};

export default DataCard;
