import { useState } from "react";
import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { ToastProvider } from "react-toast-notifications";
import { DocumentVerificationsDetail } from "pages/DocumentVerificationsDetails";
import { DocumentVerifications } from "components/DocumentVerifications/DocumentVerifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { captureException } from "utils/errorUtils";
import { DataDistribution } from "pages/DataDistribution";
import FeatureFlags from "pages/FeatureFlags";
import RelayDashboard from "components/Admin/RelayDashboard";
import PaymentMethodDetails from "components/Transactions/PaymentMethodDetails";
import TransactionDetails from "components/Transactions/TransactionDetails";
import { INTEGRATION_STATUS_PATH, IntegrationStatus } from "components/IntegrationStatus";
import { CookiesProvider } from "react-cookie";
import { useUserStore } from "store/user";
import { Feedbacks } from "pages/Feedbacks";
import { FeedbackDetails } from "pages/FeedbackDetails";
import CustomerProfile from "./pages/CustomerProfile";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Admin from "./components/Admin/Admin";
import Settings from "./pages/Settings";
import { getUser } from "./utils/api";
import RuleDetails from "./pages/RuleDetails";
import Rules from "./pages/Rules";
import ManageRule from "./pages/ManageRule";
import DataDictionary from "./components/RulesModule/DataDictionary";
import DeviceIntelligence from "./pages/DeviceIntelligence";
import Customers from "./pages/Customers";
import DeviceView from "./pages/DeviceView";
import { ADD_NEW_BLOCK_ALLOW_LIST_PATH, BLOCK_ALLOW_LIST_PATH } from "./components/BlockAllowList/urls";
import BlockAllowList from "./components/BlockAllowList";
import AddNewBlockAllowListItem from "./components/BlockAllowList/AddNew";
import Queues from "./pages/Queues";
import Sessions from "./pages/Sessions";
import SuperAdminMembers from "./pages/SuperAdminMembers";
import SessionsDetails from "./pages/SessionsDetails";
import PurchaseLimitList from "./components/PurchaseLimits";
import Webhooks, { WEBHOOK_PATH } from "./components/Webhooks";
import ForgotPassword, { FORGOT_PASSWORD_PATH } from "./components/Auth/ForgotPassword";
import { AuthenticatedOnly } from "./components/Auth/AuthenticatedOnly";
import SAR, { SAR_PATH } from "./components/SAR";
import {
  DATA_DISTRIBUTION_PATH,
  DEVICE_VIEW_PATH,
  DOCUMENT_VERIFICATIONS_PATH,
  DOCUMENT_VERIFICATION_DETAIL_PATH,
  FEATURE_FLAGS_PATH,
  LOGIN_PATH,
  NOTIFICATIONS_PATH,
  RULES_PATH,
  QUEUES_PATH,
  TRANSACTIONS_PATH,
  TRANSACTION_DETAILS_PATH,
  CUSTOMERS_PATH,
  CUSTOMER_PROFILE_PATH,
  PAYMENT_METHOD_DETAILS_PATH,
  SESSION_DETAILS_PATH,
  RULE_DETAILS_PATH,
  SESSIONS_PATH,
  MANAGE_RULE,
  REGISTER_PATH,
  DEVICE_INTELLIGENCE_PATH,
  PURCHASE_LIMIT_PATH,
  SETTINGS_PATH,
  ADMIN_PATH,
  DATA_DICTIONARY_PATH,
  FEEDBACKS_PATH,
  FEEDBACK_DETAILS_PATH,
  SUPER_ADMIN_MEMBERS_PATH,
} from "./modulePaths";
import Transactions from "./components/Transactions";
import AdminNotifications from "./components/Admin/AdminNotifications";
import { SuperAdminOnly } from "./components/Auth/SuperAdminOnly";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // disable cache
      cacheTime: 0,
    },
  },
});

const StyledApp = styled.div`
  min-height: 100vh;
  background-color: #fafbfd;
  font-family: IBM Plex Sans;
`;

const App = (): JSX.Element => {
  const gtmId = import.meta.env.VITE_APP_SARDINE_ENV === "production" ? "GTM-MXL248W" : "GTM-KZQ8PB2";
  const isAuthenticated = useUserStore((store) => store.isAuthenticated);
  const setUser = useUserStore((store) => store.setUser);

  const [autoLoging, setAutoLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [gtmState, setGtmState] = useState({
    id: gtmId,
    dataLayer: {},
  });

  const checkAuth = async () => {
    setAutoLogin(false);
    try {
      const result = await getUser();
      if (result.userData) {
        setUser({
          isAuthenticated: true,
          id: result.userData.id,
          role: result.userData.user_role,
          name: result.userData.name,
          email: result.userData.email,
          organisation: result.userData.user_role === "sardine_admin" ? "all" : result.userData.organisation,
        });
        setGtmState({
          id: gtmId,
          dataLayer: {
            user: result.userData,
          },
        });
      }
    } catch (error) {
      captureException(error);
    }

    setLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GTMProvider state={gtmState}>
        <ToastProvider>
          <CookiesProvider>
            <BrowserRouter>
              <StyledApp>
                {!isAuthenticated && autoLoging && checkAuth()}
                {!loading && (
                  <Routes>
                    <Route path={SETTINGS_PATH} element={<AuthenticatedOnly element={<Settings />} />} />
                    <Route path={DATA_DISTRIBUTION_PATH} element={<AuthenticatedOnly element={<DataDistribution />} />} />
                    <Route path="/relayfi" element={<AuthenticatedOnly element={<RelayDashboard />} />} />
                    <Route path={RULE_DETAILS_PATH} element={<AuthenticatedOnly element={<RuleDetails />} />} />
                    <Route path={RULES_PATH} element={<AuthenticatedOnly element={<Rules />} />} />
                    <Route path={MANAGE_RULE} element={<AuthenticatedOnly element={<ManageRule />} />} />
                    <Route path={ADMIN_PATH} element={<AuthenticatedOnly element={<Admin />} />} />
                    <Route path={DATA_DICTIONARY_PATH} element={<AuthenticatedOnly element={<DataDictionary />} />} />
                    <Route path={DEVICE_INTELLIGENCE_PATH} element={<AuthenticatedOnly element={<DeviceIntelligence />} />} />
                    <Route path={CUSTOMERS_PATH} element={<AuthenticatedOnly element={<Customers />} />} />
                    <Route path={FEEDBACKS_PATH} element={<SuperAdminOnly element={<Feedbacks />} />} />
                    <Route path={FEEDBACK_DETAILS_PATH} element={<SuperAdminOnly element={<FeedbackDetails />} />} />
                    <Route path={DEVICE_VIEW_PATH} element={<AuthenticatedOnly element={<DeviceView />} />} />
                    <Route path={BLOCK_ALLOW_LIST_PATH} element={<AuthenticatedOnly element={<BlockAllowList />} />} />
                    <Route
                      path={ADD_NEW_BLOCK_ALLOW_LIST_PATH}
                      element={<AuthenticatedOnly element={<AddNewBlockAllowListItem />} />}
                    />
                    <Route path={PURCHASE_LIMIT_PATH} element={<SuperAdminOnly element={<PurchaseLimitList />} />} />
                    <Route path={FEATURE_FLAGS_PATH} element={<SuperAdminOnly element={<FeatureFlags />} />} />
                    <Route path={SUPER_ADMIN_MEMBERS_PATH} element={<SuperAdminOnly element={<SuperAdminMembers />} />} />
                    <Route path={QUEUES_PATH} element={<AuthenticatedOnly element={<Queues />} />} />
                    <Route path={SESSIONS_PATH} element={<AuthenticatedOnly element={<Sessions />} />} />
                    <Route path={SESSION_DETAILS_PATH} element={<AuthenticatedOnly element={<SessionsDetails />} />} />
                    <Route path={WEBHOOK_PATH} element={<SuperAdminOnly element={<Webhooks />} />} />
                    <Route path={SAR_PATH} element={<SuperAdminOnly element={<SAR />} />} />
                    <Route
                      path={DOCUMENT_VERIFICATIONS_PATH}
                      element={<AuthenticatedOnly element={<DocumentVerifications />} />}
                    />
                    <Route path={TRANSACTIONS_PATH} element={<AuthenticatedOnly element={<Transactions />} />} />
                    <Route
                      path={PAYMENT_METHOD_DETAILS_PATH}
                      element={<AuthenticatedOnly element={<PaymentMethodDetails />} />}
                    />
                    <Route path={TRANSACTION_DETAILS_PATH} element={<AuthenticatedOnly element={<TransactionDetails />} />} />
                    <Route path={NOTIFICATIONS_PATH} element={<SuperAdminOnly element={<AdminNotifications />} />} />
                    <Route path={CUSTOMER_PROFILE_PATH} element={<AuthenticatedOnly element={<CustomerProfile />} />} />
                    <Route
                      path={DOCUMENT_VERIFICATION_DETAIL_PATH}
                      element={<AuthenticatedOnly element={<DocumentVerificationsDetail />} />}
                    />
                    <Route path={INTEGRATION_STATUS_PATH} element={<SuperAdminOnly element={<IntegrationStatus />} />} />
                    {isAuthenticated && <Route path="*" element={<Navigate to={CUSTOMERS_PATH} />} />}
                    {!isAuthenticated && (
                      <>
                        <Route path={LOGIN_PATH} element={<Login />} />
                        <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
                        <Route path={REGISTER_PATH} element={<Register />} />
                        <Route path="*" element={<Navigate to={LOGIN_PATH} />} />
                      </>
                    )}
                  </Routes>
                )}
              </StyledApp>
            </BrowserRouter>
          </CookiesProvider>
        </ToastProvider>
      </GTMProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
