/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import moment from "moment";
import { Transaction } from "sardine-dashboard-typescript-definitions";
import DataCard from "components/Common/DataCard";
import Badge from "../../Common/Badge";
import { DetailsCardView, StyledTable, TransactionTableWrapper, TdValue, StyledTh, Cell, StyledTr } from "../styles";
import transactionIcon from "../../../utils/logo/transactions_detail.svg";

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
      icon={<img src={transactionIcon} alt="Transaction icon" />}
    >
      <DetailsCardView style={{ width: "100%", height: "unset", margin: 0, borderRadius: 0 }}>
        {isLoading ? (
          <TdValue>Loading...</TdValue>
        ) : transactions.length === 0 ? (
          <TdValue id="no_data_message" style={{ color: "grey" }}>
            No data available!
          </TdValue>
        ) : (
          <TransactionTableWrapper>
            <StyledTable id="recent_transaction_table">
              <thead style={{ height: 50 }}>
                <StyledTr style={{ color: "#141a39", borderBottomColor: "#f2f6ff" }}>
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
          </TransactionTableWrapper>
        )}
      </DetailsCardView>
    </DataCard>
  );
};

export default RecentTransaction;
