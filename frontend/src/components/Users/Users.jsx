import React, { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import Layout from "../Layout/Main";
import { StoreCtx } from "../../utils/store";
import { fetchSessions } from "../../utils/api";
import { captureException } from "../../utils/errorUtils";

const Users = (props) => {
  const { state } = useContext(StoreCtx);
  const [loading, setLoading] = useState(true);
  const [sessionsData, setSessionsData] = useState([]);

  const getOrg = async () => {
    const result = await fetchSessions();
    if (result) setSessionsData(result.data);
  };

  if (loading) {
    setLoading(false);
    getOrg().then().catch((e) => captureException(e));
  }
  return (
    <Layout>
      {sessionsData.length &&
        sessionsData.map((ele) => (
          <div key={ele[0].name + ele[0].email} style={{ margin: "20px" }}>
            <h5>Organization Name : {ele[0].name}</h5>
            <Table responsive style={{ margin: "20px 0px" }}>
              <thead>
                <tr>
                  <th>User Email</th>
                  <th>Ip Address</th>
                  <th>Active From</th>
                </tr>
              </thead>
              <tbody>
                {ele.length
                  ? ele.map((element) => (
                      <tr key={element.name + element.email}>
                        <td>{element.email}</td>
                        <td>{element.ip_address}</td>
                        <td>{element.created_at}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </div>
        ))}
    </Layout>
  );
};

export default Users;
