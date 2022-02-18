import React, { useState } from "react";

export const HoverToggleDiv = ({
  componentOnNotHovered,
  componentOnHovered,
}: {
  componentOnNotHovered: JSX.Element;
  componentOnHovered: JSX.Element;
}): JSX.Element => {
  const [isHovered, setHovered] = useState(false);

  const handleOnMouseEnter = (_: React.MouseEvent<HTMLDivElement>) => {
    setHovered(true);
  };

  const handleOnMouseLeave = (_: React.MouseEvent<HTMLDivElement>) => {
    setHovered(false);
  };

  return isHovered ? (
    <div onMouseLeave={handleOnMouseLeave}>{componentOnHovered}</div>
  ) : (
    <div onMouseEnter={handleOnMouseEnter}>{componentOnNotHovered}</div>
  );
};
