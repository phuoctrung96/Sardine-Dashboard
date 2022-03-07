import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment"; // TODO: Stop using moment.js because it is obsolete.
import { useCookies } from "react-cookie";
import { Badge } from "react-bootstrap";
import { WEBHOOK_PATH } from "components/Webhooks";
import { SAR_PATH } from "components/SAR";
import { INTEGRATION_STATUS_PATH } from "components/IntegrationStatus";
import { BLOCK_ALLOW_LIST_PATH } from "components/BlockAllowList/urls";
import {
  DATA_DISTRIBUTION_PATH,
  TRANSACTIONS_PATH,
  NOTIFICATIONS_PATH,
  FEATURE_FLAGS_PATH,
  DOCUMENT_VERIFICATIONS_PATH,
  QUEUES_PATH,
  DEVICE_INTELLIGENCE_PATH,
  CUSTOMERS_PATH,
  LOGIN_PATH,
  PURCHASE_LIMIT_PATH,
  ROOT_PATH,
  ADMIN_PATH,
  SETTINGS_PATH,
  RULES_PATH,
  FEEDBACKS_PATH,
} from "modulePaths";
import { useUserStore } from "store/user";
import { CLIENT_QUERY_FIELD } from "utils/constructFiltersQueryParams";
import { DATE_FORMATS, ORGANIZATION_QUERY_FIELD } from "../../constants";
import firebaseClient from "../../utils/firebase";
import { captureException } from "../../utils/errorUtils";
import PopUp from "../Common/PopUp";
import {
  SidebarMainDiv,
  StyledIconTitle,
  SidebarLine,
  StyledSidebarTitle,
  StyledSidebarMenu,
  StyledItemIcon,
  StyledSubItem,
  StyledUser,
  UserProfilePic,
  UserName,
  StyledUpcomingLink,
  StyledUpcomingLinkOut,
  StyledUpcoming,
  StyledLinkText,
  Image,
  ImageLarge,
} from "./sidebarStyles";
import { HoverToggleDiv } from "../Common/HoverToggleDiv";

import deviceIntelligence from "../../utils/logo/sidebar/ic_devices.svg";
import deviceIntelligenceActive from "../../utils/logo/sidebar/ic_devices_active.svg";
import adminIcon from "../../utils/logo/sidebar/ic_admin.svg";
import adminIconActive from "../../utils/logo/sidebar/ic_admin_active.svg";
import transactionsIcon from "../../utils/logo/sidebar/ic_transactions.svg";
import transactionsIconActive from "../../utils/logo/sidebar/ic_transactions_active.svg";
import dashboardIcon from "../../utils/logo/sidebar/ic_dashboard.svg";
import dashboardIconActive from "../../utils/logo/sidebar/ic_dashboard_active.svg";
import sardineIconNormal from "../../utils/logo/sidebar/ic_sardine_logo_normal.svg";
import sardineIconActive from "../../utils/logo/sidebar/ic_sardine_logo_active.svg";
import rulesIcons from "../../utils/logo/sidebar/ic_rules.svg";
import rulesIconsActive from "../../utils/logo/sidebar/ic_rules_active.svg";
import settingsIcon from "../../utils/logo/sidebar/ic_setting.svg";
import settingsIconActive from "../../utils/logo/sidebar/ic_setting_active.svg";
import logoutIcon from "../../utils/logo/sidebar/ic_logout.svg";
import logoutIconActive from "../../utils/logo/sidebar/ic_logout_active.svg";
import docsIcon from "../../utils/logo/sidebar/ic_doc.svg";
import docsIconActive from "../../utils/logo/sidebar/ic_doc_active.svg";
import customers from "../../utils/logo/sidebar/ic_users.svg";
import customersActive from "../../utils/logo/sidebar/ic_users_active.svg";
import blocklist from "../../utils/logo/sidebar/ic_blacklist.svg";
import blocklistActive from "../../utils/logo/sidebar/ic_blacklist_active.svg";
import queuesIcon from "../../utils/logo/sidebar/ic_queue.svg";
import queuesIconActive from "../../utils/logo/sidebar/ic_queue_active.svg";
import infoIcon from "../../utils/logo/sidebar/ic_info.svg";
import infoIconActive from "../../utils/logo/sidebar/ic_info_active.svg";
import feedbacks from "../../utils/logo/sidebar/ic_feedbacks.svg";
import feedbacksActive from "../../utils/logo/sidebar/ic_feedbacks_active.svg";
import { SuperAdminVisible } from "../Auth/SuperAdminVisible";
import { AdminVisible } from "../Auth/AdminVisible";

const filterStartDate = moment().subtract({ days: 1 }).utc().format(DATE_FORMATS.DATETIME);
const filterEndDate = moment().utc().format(DATE_FORMATS.DATETIME);

const diDefaultPath = `${DEVICE_INTELLIGENCE_PATH}?session_risk=high&start_date=${filterStartDate}&end_date=${filterEndDate}`;

const ciDefaultPath = `${CUSTOMERS_PATH}?risk_level=high&start_date=${filterStartDate}&end_date=${filterEndDate}`;

const superAdminMenuProps = [
  {
    title: "Integration Status",
    tid: "sidebar_link_sardine_admin_integration_status",
    path: INTEGRATION_STATUS_PATH,
    activePath: INTEGRATION_STATUS_PATH,
    normalIcon: infoIcon,
    activeIcon: infoIconActive,
    badge: null,
  },
  {
    title: "Flags",
    tid: "sidebar_link_sardine_admin_flags",
    path: FEATURE_FLAGS_PATH,
    activePath: FEATURE_FLAGS_PATH,
    normalIcon: docsIcon,
    activeIcon: docsIconActive,
    badge: null,
  },
  {
    title: "Purchase Limit",
    tid: "sidebar_link_sardine_admin_purchase_limit",
    path: PURCHASE_LIMIT_PATH,
    activePath: PURCHASE_LIMIT_PATH,
    normalIcon: docsIcon,
    activeIcon: docsIconActive,
    badge: null,
  },
  {
    title: "Webhooks",
    tid: "sidebar_link_sardine_admin_webhooks",
    path: WEBHOOK_PATH,
    activePath: WEBHOOK_PATH,
    normalIcon: docsIcon,
    activeIcon: docsIconActive,
    badge: null,
  },
  {
    title: "Send Notification",
    tid: "sidebar_link_sardine_admin_send_notification",
    path: NOTIFICATIONS_PATH,
    activePath: NOTIFICATIONS_PATH,
    normalIcon: docsIcon,
    activeIcon: docsIconActive,
    badge: null,
  },
] as const;

const MenuItem = ({
  image,
  title,
  tid,
  badge,
}: {
  image: JSX.Element;
  title: string;
  tid: string;
  badge: JSX.Element | null;
}): JSX.Element => (
  <>
    <StyledItemIcon>{image}</StyledItemIcon>
    <StyledSubItem>
      <StyledLinkText data-tid={tid}>{title}</StyledLinkText>
    </StyledSubItem>
    {badge}
  </>
);

const MenuLink = ({
  path,
  className,
  image,
  title,
  tid,
  badge,
}: {
  path: string;
  className: string;
  image: JSX.Element;
  title: string;
  tid: string;
  badge: JSX.Element | null;
}): JSX.Element => (
  <StyledUpcomingLink to={path} key={path} className={className}>
    <MenuItem image={image} title={title} tid={tid} badge={badge} />
  </StyledUpcomingLink>
);

const MenuButton = ({
  image,
  onClick,
  title,
  tid,
  badge,
}: {
  image: JSX.Element;
  onClick: () => void;
  title: string;
  tid: string;
  badge: JSX.Element | null;
}): JSX.Element => (
  <StyledUpcoming onClick={onClick}>
    <MenuItem image={image} title={title} tid={tid} badge={badge} />
  </StyledUpcoming>
);

const HoverToggleMenuLink = ({
  path,
  activePath,
  activeIcon,
  normalIcon,
  title,
  tid,
  badge,
}: {
  path: string;
  activePath: string;
  activeIcon: string;
  normalIcon: string;
  title: string;
  tid: string;
  badge: JSX.Element | null;
}): JSX.Element => {
  const location = useLocation();
  const { pathname } = location;
  const isActive = pathname === activePath;
  const className = isActive ? "active" : "";
  return (
    <HoverToggleDiv
      componentOnHovered={
        <MenuLink
          path={path}
          className={className}
          title={title}
          image={<Image src={activeIcon} alt={title} />}
          tid={tid}
          badge={badge}
        />
      }
      componentOnNotHovered={
        <MenuLink
          path={path}
          className={className}
          title={title}
          image={<Image src={isActive ? activeIcon : normalIcon} alt={title} />}
          tid={tid}
          badge={badge}
        />
      }
    />
  );
};

const HoverToggleMenuButton = ({
  activeIcon,
  onClick,
  normalIcon,
  title,
  tid,
  badge,
}: {
  activeIcon: string;
  onClick: () => void;
  normalIcon: string;
  title: string;
  tid: string;
  badge: JSX.Element | null;
}): JSX.Element => (
  <HoverToggleDiv
    componentOnHovered={
      <MenuButton title={title} onClick={onClick} image={<Image src={activeIcon} alt={title} />} tid={tid} badge={badge} />
    }
    componentOnNotHovered={
      <MenuButton title={title} onClick={onClick} image={<Image src={normalIcon} alt={title} />} tid={tid} badge={badge} />
    }
  />
);

const IconTitle = ({ src }: { src: string }): JSX.Element => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <StyledIconTitle to={ROOT_PATH} className={pathname === ROOT_PATH ? "active" : ""}>
      <ImageLarge alt="logo" src={src} />
      <StyledSidebarTitle>Sardine</StyledSidebarTitle>
    </StyledIconTitle>
  );
};

const DocsLink = ({ icon }: { icon: string }): JSX.Element => (
  <StyledUpcomingLinkOut href="https://sardine:apidoc@docs.sardine.ai">
    <Image alt="docs" src={icon} />
    <StyledSubItem>
      <StyledLinkText data-tid="sidebar_link_docs">Docs</StyledLinkText>
    </StyledSubItem>
  </StyledUpcomingLinkOut>
);

const HoverToggleDocsLink = (): JSX.Element => (
  <HoverToggleDiv componentOnHovered={<DocsLink icon={docsIconActive} />} componentOnNotHovered={<DocsLink icon={docsIcon} />} />
);

const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["organization"]);
  const { logout, userName } = useUserStore((state) => {
    const { logout: lo, name } = state;
    return {
      logout: lo,
      userName: name,
    };
  });

  const [showPopup, setShowPopup] = useState(false);

  const commonMenuItemProps = [
    {
      title: "Device Intelligence",
      path: diDefaultPath,
      activePath: DEVICE_INTELLIGENCE_PATH,
      normalIcon: deviceIntelligence,
      activeIcon: deviceIntelligenceActive,
      tid: "sidebar_link_device_intelligence",
      badge: null,
    },
    {
      title: "Customer Intelligence",
      path: ciDefaultPath,
      activePath: CUSTOMERS_PATH,
      normalIcon: customers,
      activeIcon: customersActive,
      tid: "sidebar_link_customer_intelligence",
      badge: null,
    },
    {
      title: "Feedback",
      path: FEEDBACKS_PATH,
      activePath: FEEDBACKS_PATH,
      normalIcon: feedbacks,
      activeIcon: feedbacksActive,
      tid: "sidebar_link_feedbacks",
      badge: null,
    },
    {
      title: "Document Verifications",
      path: `${DOCUMENT_VERIFICATIONS_PATH}${cookies.organization ? `?${CLIENT_QUERY_FIELD}=${cookies.organization}` : ""}`,
      activePath: DOCUMENT_VERIFICATIONS_PATH,
      normalIcon: docsIcon,
      activeIcon: docsIconActive,
      tid: "sidebar_link_document_verifications",
      badge: null,
    },
    {
      title: "Transaction Intelligence",
      path: TRANSACTIONS_PATH,
      activePath: `${TRANSACTIONS_PATH}${cookies.organization ? `?${CLIENT_QUERY_FIELD}=${cookies.organization}` : ""}`,
      normalIcon: transactionsIcon,
      activeIcon: transactionsIconActive,
      tid: "sidebar_link_transaction_intelligence",
      badge: (
        <Badge style={{ fontSize: 8, marginLeft: 5, textTransform: "uppercase" }} bg="info">
          Beta
        </Badge>
      ),
    },
    {
      title: "Data Distribution",
      path: DATA_DISTRIBUTION_PATH,
      activePath: DATA_DISTRIBUTION_PATH,
      normalIcon: dashboardIcon,
      activeIcon: dashboardIconActive,
      tid: "sidebar_link_data_distribution",
      badge: null,
    },
    {
      title: "Rules",
      path: `${RULES_PATH}${cookies.organization ? `?${CLIENT_QUERY_FIELD}=${cookies.organization}` : ""}`,
      activePath: RULES_PATH,
      normalIcon: rulesIcons,
      activeIcon: rulesIconsActive,
      tid: "sidebar_link_rules",
      badge: null,
    },
    {
      title: "Blocklist/Allowlist",
      path: `${BLOCK_ALLOW_LIST_PATH}${cookies.organization ? `?${ORGANIZATION_QUERY_FIELD}=${cookies.organization}` : ""}`,
      activePath: BLOCK_ALLOW_LIST_PATH,
      normalIcon: blocklist,
      activeIcon: blocklistActive,
      tid: "sidebar_link_block_allow_list",
      badge: null,
    },
    {
      title: "Queues",
      path: `${QUEUES_PATH}${cookies.organization ? `?${ORGANIZATION_QUERY_FIELD}=${cookies.organization}` : ""}`,
      activePath: QUEUES_PATH,
      normalIcon: queuesIcon,
      activeIcon: queuesIconActive,
      tid: "sidebar_link_queues",
      badge: null,
    },
  ] as const;

  const logoutUser = async () => {
    try {
      await firebaseClient.logout();
      await logout();
      navigate(LOGIN_PATH);
    } catch (e) {
      captureException(e);
    }
  };

  return (
    <SidebarMainDiv>
      <PopUp
        show={showPopup}
        title="Logout"
        message="Are you sure you want to logout?"
        handleClose={() => {
          setShowPopup(false);
        }}
        handleSubmit={logoutUser}
      />
      <HoverToggleDiv
        componentOnHovered={<IconTitle src={sardineIconActive} />}
        componentOnNotHovered={<IconTitle src={sardineIconNormal} />}
      />

      <StyledSidebarMenu>
        {commonMenuItemProps.map((menuItem) => (
          <HoverToggleMenuLink
            path={menuItem.path}
            activePath={menuItem.activePath}
            activeIcon={menuItem.activeIcon}
            normalIcon={menuItem.normalIcon}
            title={menuItem.title}
            tid={menuItem.tid}
            badge={menuItem.badge}
            key={menuItem.tid}
          />
        ))}

        <HoverToggleDocsLink />
        <AdminVisible>
          <HoverToggleMenuLink
            path={ADMIN_PATH}
            activePath={ADMIN_PATH}
            activeIcon={adminIconActive}
            normalIcon={adminIcon}
            title="Admin"
            tid="sidebar_link_admin"
            badge={null}
          />
        </AdminVisible>

        <SuperAdminVisible>
          <HoverToggleMenuLink
            path={SAR_PATH}
            activePath={SAR_PATH}
            activeIcon={docsIconActive}
            normalIcon={docsIcon}
            title="File A SAR"
            tid="sidebar_link_file_a_sar"
            badge={null}
          />
        </SuperAdminVisible>

        <SuperAdminVisible>
          <>
            <SidebarLine />
            {superAdminMenuProps.map((menuItem) => (
              <HoverToggleMenuLink
                path={menuItem.path}
                activePath={menuItem.activePath}
                activeIcon={menuItem.activeIcon}
                normalIcon={menuItem.normalIcon}
                title={menuItem.title}
                tid={menuItem.tid}
                key={menuItem.tid}
                badge={menuItem.badge}
              />
            ))}
          </>
        </SuperAdminVisible>
        <SidebarLine />

        <HoverToggleMenuLink
          path={SETTINGS_PATH}
          activePath={SETTINGS_PATH}
          normalIcon={settingsIcon}
          activeIcon={settingsIconActive}
          title="Settings"
          tid="sidebar_link_settings"
          badge={null}
        />
        <HoverToggleMenuButton
          onClick={() => setShowPopup(true)}
          activeIcon={logoutIconActive}
          normalIcon={logoutIcon}
          title="Logout"
          tid="sidebar_link_logout"
          badge={null}
        />
      </StyledSidebarMenu>
      <StyledUser>
        <UserProfilePic>{userName?.slice(0, 1).toUpperCase() || "?"}</UserProfilePic>
        <UserName>{userName}</UserName>
      </StyledUser>
    </SidebarMainDiv>
  );
};

export default Sidebar;
