import { useEffect, useRef, useState } from "react";
import { TableBody, TableCell, TableRow, TableSortLabel } from "@mui/material";
import DropwdownButton from "components/Dropdown/DropdownButton";
import { replaceAllSpacesWithUnderscores } from "utils/stringUtils";
import DropdownItem from "components/Dropdown/DropdownItem";
import { useNavigate } from "react-router-dom";
import { FEEDBACK_DETAILS_PATH } from "modulePaths";
import { MOCK_TABLE_DATA } from "./mockData";
import {
  BorderedTCell,
  ReasonCodeBadge,
  StatusCell,
  StyledDropdownDiv,
  StyledDropdownList,
  StyledPagination,
  StyledTable,
  StyledTableContainer,
  StyledTCell,
  StyledTHead,
} from "./styles";
import settlementIcon from "../../utils/logo/settlement.svg";
import chargebackIcon from "../../utils/logo/chargeback.svg";
import japanFlag from "../../utils/logo/japanFlag.svg";
import usFlag from "../../utils/logo/usFlag.svg";

const RowsDropdown = (props: {
  open?: boolean;
  setOpen: (open: boolean) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  options: string[];
}) => {
  const { open, setOpen, selectedIndex, setSelectedIndex, options } = props;
  const ref = useRef<HTMLDivElement>(null);

  const onItemClicked = (index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleClick = (e: MouseEvent) => {
    if (!(ref && ref.current && ref.current.contains(e.target as Node))) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div style={{ width: 120 }}>
      {open ? (
        <StyledDropdownDiv ref={ref}>
          <StyledDropdownList>
            {options.map((ele, index) => (
              <DropdownItem
                clicked={() => onItemClicked(index)}
                key={ele}
                item={{ option: ele }}
                isSelected={index === selectedIndex}
                id={`dropdown_item_${replaceAllSpacesWithUnderscores(ele)}`}
              />
            ))}
          </StyledDropdownList>
        </StyledDropdownDiv>
      ) : (
        <DropwdownButton
          id="rule-performance-start-from"
          clicked={() => {}}
          item={{ option: options[selectedIndex] }}
          style={{ backgroundColor: "white", marginLeft: 0 }}
        />
      )}
    </div>
  );
};

export const FeedbackListTable = (): JSX.Element => {
  const options = ["10 rows", "15 rows", "20 rows"];
  const [rowsDropdownOpen, setRowsDropdownOpen] = useState(false);
  const [rowsOptionSelected, setRowsOptionSelected] = useState(1);

  const navigate = useNavigate();

  return (
    <div>
      <StyledTableContainer>
        <StyledTable>
          <StyledTHead>
            <TableRow>
              <BorderedTCell>
                <TableSortLabel>Session Key</TableSortLabel>
              </BorderedTCell>
              <TableCell>
                <TableSortLabel>User ID</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Type</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Status</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Country</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>City</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Reason Codes</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Date/time</TableSortLabel>
              </TableCell>
            </TableRow>
          </StyledTHead>
          <TableBody>
            {MOCK_TABLE_DATA.map((data) => (
              <TableRow key={data.sessionKey} onClick={() => navigate(FEEDBACK_DETAILS_PATH)}>
                <BorderedTCell>
                  <StyledTCell>{data.sessionKey}</StyledTCell>
                </BorderedTCell>
                <TableCell>
                  <StyledTCell>{data.userId}</StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>
                    <img src={data.type === "Settlement" ? settlementIcon : chargebackIcon} alt="" /> {data.type}
                  </StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>
                    <StatusCell $color={data.status === "ach_chargeback" ? "#F7B904" : "#2FB464"}>{data.status}</StatusCell>
                  </StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>
                    <img src={data.country === "Japan" ? japanFlag : usFlag} alt="" /> {data.country}
                  </StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>{data.city}</StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>
                    {data.reasonCodes.map((code) => (
                      <ReasonCodeBadge key={`reason-code-badge-${data.sessionKey}-${code}`}>{code}</ReasonCodeBadge>
                    ))}
                  </StyledTCell>
                </TableCell>
                <TableCell>
                  <StyledTCell>
                    {data.date} <span style={{ color: "#969AB6" }}>{data.time}</span>
                  </StyledTCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
        <RowsDropdown
          open={rowsDropdownOpen}
          setOpen={setRowsDropdownOpen}
          selectedIndex={rowsOptionSelected}
          setSelectedIndex={setRowsOptionSelected}
          options={options}
        />
        <StyledPagination count={12} showFirstButton showLastButton />
      </div>
    </div>
  );
};
