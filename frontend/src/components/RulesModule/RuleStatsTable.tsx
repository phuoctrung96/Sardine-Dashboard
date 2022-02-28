import { Card } from "@mui/material";
import { GetRuleStatsResponse, RuleStatsSession } from "sardine-dashboard-typescript-definitions";
import { isWideScreen } from "../../utils/browserUtils";
import { Cell, StyledTable, StyledTh, StyledTr, TdValue } from "./styles";

interface RuleStatsTableProps {
  statsData: GetRuleStatsResponse[];
  onSessionClick: (sessionKey: RuleStatsSession) => void;
}

export const RuleStatsTable = (props: RuleStatsTableProps): JSX.Element => {
  const HEADERS: string[] = ["DATE", "COUNT", "SESSIONS"];
  const { statsData, onSessionClick } = props;

  return (
    <Card
      style={{ marginTop: 30, width: isWideScreen() ? 1024 : 550, boxShadow: "0px 14px 24px rgb(0 0 0 / 5%)", borderRadius: 10 }}
    >
      <StyledTable style={{ margin: 10 }}>
        <thead style={{ height: 50, backgroundColor: "#f7f9fc" }}>
          <tr>
            {HEADERS.map((header) => (
              <StyledTh key={header}>{header}</StyledTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {statsData.map((stats) => (
            <StyledTr key={stats.key}>
              <Cell>{stats.key}</Cell>
              <Cell>{stats.value}</Cell>
              <Cell>
                <div style={{ maxHeight: 120 }}>
                  {stats.sessions.length > 0 ? (
                    stats.sessions.map((session) => (
                      <TdValue
                        key={session.sessionKey}
                        style={{
                          fontSize: 15,
                          color: "#2173FF",
                          textDecorationLine: "underline",
                        }}
                        onClick={() => onSessionClick(session)}
                      >
                        {session.sessionKey}
                      </TdValue>
                    ))
                  ) : (
                    <TdValue>-</TdValue>
                  )}
                </div>
              </Cell>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </Card>
  );
};
