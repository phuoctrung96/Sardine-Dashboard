import { CardContentOther } from "../../TableCard";
import { SectionsAttribute } from "../AMLSection";

interface AttributeProps {
  attribute: SectionsAttribute;
}

export const Attribute = ({ attribute }: AttributeProps) => (
  <CardContentOther
    featureData={[attribute.key, attribute.description]}
    ind={attribute.key}
    key={attribute.key}
    getValueForKey={() => attribute.value}
  />
);
