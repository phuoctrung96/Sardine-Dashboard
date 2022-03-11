import React from "react";
import { PrimaryButton } from "components/Button";

interface DuplicateRuleProps {
  onClick: () => void;
}

const DuplicateRule: React.FC<DuplicateRuleProps> = (props) => {
  const { onClick } = props;
  return (
    <PrimaryButton style={{ marginRight: 20 }} onClick={() => onClick()} data-tid="rule_details_duplicate_button">
      Duplicate Rule
    </PrimaryButton>
  );
};

export default DuplicateRule;
