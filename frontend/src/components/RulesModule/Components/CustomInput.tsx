import React, { useState } from "react";
import { StyledUl, StyledInput, SubmitButton } from "../styles";

interface CustomInputProps {
  name?: string;
  allowSpace: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  onSubmitClick: (value: string) => void;
  onCancelClick: () => void;
}

const CustomInput = (p: CustomInputProps) => {
  const [customValue, setCustomValue] = useState("");
  const { name, allowSpace, placeholder, style, onSubmitClick, onCancelClick } = p;

  return (
    <StyledUl style={{ height: 70, justifyContent: "left" }}>
      <StyledInput
        data-tid={name ? `${name}_custom_input` : "custom_input"}
        placeholder={placeholder || "Add Custom"}
        type="text"
        value={customValue}
        style={style}
        onChange={(event) => {
          const val = allowSpace ? event.target.value : event.target.value.replace(/ /g, "");
          setCustomValue(val);
        }}
      />
      <SubmitButton
        data-tid={name ? `${name}_custom_input_submit` : "custom_input_submit"}
        type="submit"
        style={{
          marginLeft: 10,
          backgroundColor: customValue.length === 0 ? "lightgrey" : "#2173FF",
          width: 70,
        }}
        disabled={customValue.length === 0}
        onClick={() => onSubmitClick(customValue)}
      >
        <span>Add</span>
      </SubmitButton>
      <SubmitButton
        data-tid={name ? `${name}_custom_input_cancel` : "custom_input_cancel"}
        type="submit"
        style={{
          marginLeft: 10,
          backgroundColor: "lightgrey",
          width: 70,
        }}
        onClick={() => onCancelClick()}
      >
        <span>Cancel</span>
      </SubmitButton>
    </StyledUl>
  );
};

export default CustomInput;
