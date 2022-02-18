import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarMainDiv = styled.div`
  position: fixed;
  width: 250px;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: #001932;
`;
const StyledIconTitle = styled(Link)`
  padding: 20px 15px;
  text-decoration: unset;
  display: flex;
  height: 80px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  background: #001932;
  &:hover,
  &:focus {
    background-color: rgba(50, 80, 120, 0.1);
  }
  &:hover p,
  &:focus p {
    color: #2173ff;
  }
  & p.active {
    color: #2173ff;
  }
`;
const SidebarLine = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin: 15px 0;
`;
const StyledSidebarTitle = styled.p`
  align-self: center;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  font-feature-settings: "ss02" on;
  color: #ffffff;
  margin: auto auto auto 10px;
`;
const StyledSidebarMenu = styled.div`
  margin: 0 0px 95px;
  padding-top: 30px;
  overflow: auto;
  height: -webkit-fill-available;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
const StyledItemIcon = styled.div`
  width: 24px;
  height: 24px;
`;
const StyledSubItem = styled.div`
  height: 16px;
  margin-left: 15px;
`;
const StyledUser = styled.div`
  width: 250px;
  background: #001932;
  height: 80px;
  align-items: center;
  display: flex;
  bottom: 0;
  position: fixed;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;
const UserProfilePic = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 20px 12px 20px 15px;
  background-color: #909bad;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
`;
const UserName = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
`;
const StyledLogout = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 208px;
`;
const StyledUpcomingLink = styled(Link)`
  display: flex;
  height: 44px;
  padding-left: 15px;
  margin-top: 0;
  align-items: center;
  text-decoration: none;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  font-feature-settings: "ss02" on;
  color: #325078;
  cursor: pointer;
  background: #001932;
  &:hover,
  &:focus {
    background-color: rgba(50, 80, 120, 0.1);
  }
  &:hover p,
  &:focus p {
    color: #2173ff;
  }
  &.active {
    background-color: rgba(50, 80, 120, 0.1);
    p {
      color: #2173ff;
    }
  }
`;
const StyledUpcomingLinkOut = styled.a`
  display: flex;
  height: 44px;
  padding-left: 15px;
  margin-top: 0;
  align-items: center;
  text-decoration: none;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  font-feature-settings: "ss02" on;
  color: #325078;
  cursor: pointer;
  background: #001932;
  &:hover,
  &:focus {
    background-color: rgba(50, 80, 120, 0.1);
  }
  &:hover p,
  &:focus p {
    color: #2173ff;
  }
  &.active {
    background-color: rgba(50, 80, 120, 0.1);
    p {
      color: #2173ff;
    }
  }
`;
const StyledUpcoming = styled.div`
  display: flex;
  height: 44px;
  padding-left: 15px;
  margin-top: 0;
  align-items: center;
  text-decoration: none;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  font-feature-settings: "ss02" on;
  color: #325078;
  cursor: pointer;
  background: #001932;
  margin-bottom: 80px;
  &:hover,
  &:focus {
    background-color: rgba(50, 80, 120, 0.1);
  }
  &:hover p,
  &:focus p {
    color: #2173ff;
  }
  &.active {
    background-color: rgba(50, 80, 120, 0.1);
    p {
      color: #2173ff;
    }
  }
`;
const StyledSardineAdmin = styled.div`
  display: flex;
  height: 44px;
  padding-left: 15px;
  margin-top: 0;
  align-items: center;
  text-decoration: none;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  font-feature-settings: "ss02" on;
  color: #325078;
  cursor: pointer;
  background: #001932;
  &:hover,
  &:focus {
    background-color: rgba(50, 80, 120, 0.1);
  }
  &:hover p,
  &:focus p {
    color: #2173ff;
  }
  &.active {
    background-color: rgba(50, 80, 120, 0.1);
    p {
      color: #2173ff;
    }
  }
`;
const StyledLinkText = styled.p`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
  text-decoration: none;
  white-space: nowrap;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
`;
const ImageLarge = styled.img`
  width: 40px;
  height: 40px;
`;
export {
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
  StyledLogout,
  StyledUpcomingLink,
  StyledUpcomingLinkOut,
  StyledUpcoming,
  StyledSardineAdmin,
  StyledLinkText,
  Image,
  ImageLarge,
};
