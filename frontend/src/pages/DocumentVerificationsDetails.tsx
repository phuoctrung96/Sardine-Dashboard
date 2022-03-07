import React from "react";
import { StyledMainDiv } from "styles/Layout";
import { StyledNavTitle, StyledStickyNav } from "components/Dashboard/styles";
import { Breadcumb, HeaderSectionContainer, ExpiredDocContainer, ExpiredDocTitle } from "styles/EntityDetail";
import { DetailsHeaderChild, DetailsHeaderParent, DetailsHeaderTile, DetailsHeaderValue } from "styles/EntityList";
import { startCase } from "lodash-es";
import { useParams } from "react-router-dom";
import { InlineGenericError } from "components/Error/InlineGenericError";
import Loader from "components/Common/Loader";
import Badge from "components/Common/Badge";
import dayjs from "dayjs";
import { headerFields } from "../components/DocumentVerifications/DocumentVerificationsDetails/data";
import Layout from "../components/Layout/Main";
import {
  CapturedDocumentsSection,
  DocumentInformationSection,
} from "../components/DocumentVerifications/DocumentVerificationsDetails/sections";
import { FogeryTestResultsSection } from "../components/DocumentVerifications/DocumentVerificationsDetails/sections/FogeryTestResults";
import { datetimeToTimestamp } from "../utils/timeUtils";
import { DATE_FORMATS, QUERY_STATUS, TIMEZONE_TYPES, TIME_UNITS } from "../constants";
import { useDocumentVerificationFetchResult } from "../hooks/fetchHooks";

const Wrapper = ({ children }: { children: React.ReactElement | React.ReactElement[] }): JSX.Element => (
  <Layout>
    <StyledMainDiv>
      <StyledStickyNav className="m-2" id="document-verifications-details">
        <StyledNavTitle>
          <Breadcumb>{"Document Verifications > Details"}</Breadcumb>
        </StyledNavTitle>
      </StyledStickyNav>
      {children}
    </StyledMainDiv>
  </Layout>
);

export const DocumentVerificationsDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  const { data, error, status } = useDocumentVerificationFetchResult({
    id: id || "",
    enabled: id !== undefined,
  });

  if (error !== null) {
    return <InlineGenericError />;
  }
  if (status === QUERY_STATUS.LOADING || data === undefined) {
    return <Loader />;
  }

  const images = [
    { src: data.front_image_path, alt: "front document" },
    { src: data.back_image_path, alt: "back document" },
    { src: data.selfie_path, alt: "selfie" },
  ].filter((image) => image.src);

  const expiryTimeStamp = datetimeToTimestamp(data.document_data.date_of_expiry, {
    format: DATE_FORMATS.DATE,
    parseTimezone: TIMEZONE_TYPES.UTC,
    unit: TIME_UNITS.SECOND,
  });

  return (
    <Wrapper>
      <>
        {dayjs().unix() > expiryTimeStamp && (
          <ExpiredDocContainer>
            <ExpiredDocTitle>This document is expired</ExpiredDocTitle>
          </ExpiredDocContainer>
        )}
      </>
      <HeaderSectionContainer>
        <DetailsHeaderParent className="w-100">
          {headerFields.map(({ key, highFirstOrder }) => {
            const value = data[key];
            if (!value) return null;
            return (
              <DetailsHeaderChild key={key}>
                <DetailsHeaderTile>{startCase(key)}</DetailsHeaderTile>
                <DetailsHeaderValue>
                  {highFirstOrder ? <Badge highFirstOrder={highFirstOrder} title={String(value)} /> : value}
                </DetailsHeaderValue>
              </DetailsHeaderChild>
            );
          })}
        </DetailsHeaderParent>
      </HeaderSectionContainer>

      <CapturedDocumentsSection images={images} />
      <DocumentInformationSection documentData={data.document_data} />
      <FogeryTestResultsSection results={data.forgery_test_results} />
    </Wrapper>
  );
};
