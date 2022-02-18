/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import moment from "moment";
import { Transaction } from "sardine-dashboard-typescript-definitions";
import styled from "styled-components";
import DataCard from "components/Common/DataCard";
import Badge from "../../Common/Badge";
import { DetailsCardView, StyledTable, TdValue, StyledTh, Cell } from "../styles";

const TableWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 0;
  &::-webkit-scrollbar {
    width: 2px;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #141a39;
    border-radius: 2px;
    outline: 1px solid slategrey;
  }
`;

const StyledTr = styled.tr`
  height: 36px;
  border-radius: 4px;
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  font-feature-settings: "ss02" on, "zero" on;
  color: #141a39;
  padding: 9px 0px;
  background-color: #ffffff;
  border: solid 1px transparent;
  border-bottom-color: #f2f6ff;
  width: auto;
  :hover {
    background-color: #f7f9fc;
  }
`;

interface Props {
  transactions: Transaction[];
  isLoading: boolean;
}

const RecentTransaction: React.FC<Props> = (props) => {
  const { isLoading, transactions } = props;

  const headers = ["Date & Time", "Transaction Id", "Amount", "Type", "Risk Level", "AML Level", "Category"];

  return (
    <DataCard
      header={`Recent Transaction ${transactions.length >= 100 ? "(Top 100)" : ""}`}
      attributes={[]}
      bodyStyle={{ display: "block" }}
      icon={undefined}
    >
      <DetailsCardView style={{ width: "100%", height: "unset", margin: 0, borderRadius: 0 }}>
        {isLoading ? (
          <TdValue>Loading...</TdValue>
        ) : transactions.length === 0 ? (
          <TdValue id="no_data_message" style={{ color: "grey" }}>
            No data available!
          </TdValue>
        ) : (
          <TableWrapper>
            <StyledTable id="recent_transaction_table">
              <thead style={{ height: 50 }}>
                <StyledTr>
                  {headers.map((ele) => (
                    <StyledTh id={`th_${ele}`} key={`${ele}`}>
                      {ele}
                    </StyledTh>
                  ))}
                </StyledTr>
              </thead>
              <tbody>
                {transactions.map((d, index) => {
                  const { id, amount, action_type, risk_level, aml_level, item_category, created_milli } = d;
                  return (
                    <StyledTr key={index.toString()}>
                      <Cell>{moment(created_milli).format("LLL")}</Cell>
                      <Cell>{id || "-"}</Cell>
                      <Cell>{amount.toFixed(2) || "-"}</Cell>
                      <Cell>{action_type || "-"}</Cell>
                      <Cell>
                        <Badge title={risk_level || "unknown"} />
                      </Cell>
                      <Cell>
                        <Badge title={aml_level || "unknown"} />
                      </Cell>
                      <Cell>{item_category || "-"}</Cell>
                    </StyledTr>
                  );
                })}
              </tbody>
            </StyledTable>
          </TableWrapper>
        )}
      </DetailsCardView>
    </DataCard>
  );
};

export default RecentTransaction;
