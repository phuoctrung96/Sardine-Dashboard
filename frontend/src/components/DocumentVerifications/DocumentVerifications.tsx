import React, { useMemo, useState } from "react";
import { StyledMainDiv } from "styles/Layout";
import { TableWrapper } from "styles/EntityList";
import FilterField, { getFilters } from "components/Common/FilterField";
import { HandleInlineError } from "components/Error/InlineGenericError";
import { useNavigate, useLocation } from "react-router-dom";
import { useInfiniteQuery, useQuery as useReactQuery } from "react-query";
import { DOCUMENT_VERIFICATIONS_PATH } from "modulePaths";
import { getClientIdObject, getDocumentVerifications } from "utils/api";
import { DocumentVerification } from "sardine-dashboard-typescript-definitions";
import OrganisationDropdown from "components/Dropdown/OrganisationDropdown";
import { useSearchQuery } from "hooks/useSearchQuery";
import { openUrlNewTabWithHistoryState } from "utils/openUrlNewTabWithHistoryState";
import { constructFiltersQueryParams } from "utils/constructFiltersQueryParams";
import { getClientFromQueryParams } from "utils/getClientFromQueryParams";
import { formatTimestampInUtc } from "utils/timeUtils";
import * as Sentry from "@sentry/react";
import { useCookies } from "react-cookie";
import { selectIsAdmin, useUserStore } from "store/user";
import Layout from "../Layout/Main";
import { DataTable, useHandleRowClick, DataColumn } from "../Common/DataTable";
import { StyledNavTitle, StyledTitleName } from "../Dashboard/styles";
import { StyledDropdownDiv, StyledStickyNav } from "./styles";
import { DATE_FORMATS, TIME_UNITS } from "../../constants";

const SEARCH_FIELDS = [
  "session_key",
  "verification_id",
  "customer_id",
  "risk_level",
  "document_match_level",
  "forgery_level",
  "image_quality_level",
  "face_match_level",
];

const TABLE_COLUMNS: DataColumn<DocumentVerification>[] = [
  {
    title: "Session key",
    field: "session_key",
  },
  {
    title: "Verification ID",
    field: "verification_id",
  },
  {
    title: "Customer ID",
    field: "customer_id",
  },
  {
    title: "Country",
    field: "document_data.issuingCountry",
  },
  {
    title: "Document Type",
    field: "document_data.type",
  },
  {
    title: "Date Time",
    field: "time",
    render: (rowData: DocumentVerification) => (
      <div>{formatTimestampInUtc(rowData.time, { format: DATE_FORMATS.DATETIME, unit: TIME_UNITS.MILLISECOND })}</div>
    ),
  },
  {
    title: "Risk Level",
    field: "risk_level",
  },
  { title: "Forgery Level", field: "forgery_level" },
  { title: "Face Match Level", field: "face_match_level" },
  { title: "Document Match Level", field: "document_match_level" },
  { title: "Image Quality Level", field: "image_quality_level" },
];

export const DocumentVerifications: React.FC = () => {
  const { search } = useLocation();
  const [filters, setFilters] = useState(getFilters(search, SEARCH_FIELDS));
  const navigate = useNavigate();

  const [cookies] = useCookies(["organization"]);

  const pushToDetails = (event: MouseEvent, rowData: DocumentVerification) => {
    const url = `${DOCUMENT_VERIFICATIONS_PATH}/${rowData.verification_id}`;

    if (event.metaKey) {
      openUrlNewTabWithHistoryState(url, rowData);
      return;
    }

    navigate(url, {
      state: rowData,
    });
  };
  const handleRowClick = useHandleRowClick(pushToDetails);
  const queries = useSearchQuery();

  const { isAdmin, userOrganization } = useUserStore((state) => ({
    userOrganization: state.organisation,
    isAdmin: selectIsAdmin(state),
  }));

  const organisation = getClientFromQueryParams(queries.toString(), isAdmin, userOrganization, cookies.organization);

  const { data: clientIdData } = useReactQuery(String(organisation), () => getClientIdObject(String(organisation)), {
    enabled: Boolean(organisation),
  });
  const shouldFetchDocumentVerifications = () => {
    // if has client query, and its data hasn't finished loading
    if (organisation && !clientIdData) {
      return false;
    }

    return true;
  };

  const { isLoading, isError, data, fetchNextPage, isFetching } = useInfiniteQuery(
    "getDocumentVerifications",
    ({ pageParam: pageCursor }) => getDocumentVerifications(filters, clientIdData?.client_id || "", pageCursor),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.pageCursor,
      enabled: shouldFetchDocumentVerifications(),
    }
  );

  const tableData = useMemo(
    () =>
      data?.pages.reduce<DocumentVerification[]>(
        (aggregatedData, pageData) => aggregatedData.concat(pageData.documentVerifications),
        []
      ) || [],
    [data?.pages]
  );

  const updateFilters = (newOrganisation?: string) => {
    const { searchString } = constructFiltersQueryParams(
      filters,
      typeof newOrganisation === "string" ? newOrganisation : organisation
    );
    navigate(`${DOCUMENT_VERIFICATIONS_PATH}?${searchString}`);
    navigate(0);
  };

  return (
    <Layout>
      <StyledMainDiv>
        <StyledStickyNav id="document-verifications" className="m-2">
          <StyledNavTitle className="w-100">
            <StyledTitleName data-tid="title_document_verifications">Document Verifications</StyledTitleName>
            {isAdmin && (
              <StyledDropdownDiv>
                <OrganisationDropdown organisation={organisation} changeOrganisation={updateFilters} />
              </StyledDropdownDiv>
            )}
          </StyledNavTitle>
        </StyledStickyNav>
        <FilterField
          placeholder="Search here"
          filters={filters}
          fields={SEARCH_FIELDS}
          onFiltersUpdate={setFilters}
          onApply={updateFilters}
          enableDurationSearch={false}
        />
        <TableWrapper>
          <HandleInlineError isError={isError}>
            <DataTable
              onChangePage={(page: number, pageSize: number) => {
                const totalPages = Math.ceil((tableData.length || 0) / pageSize);
                if (totalPages - page - 1 <= 0) {
                  fetchNextPage()
                    .then()
                    .catch((err) => Sentry.captureException(err));
                }
              }}
              columns={TABLE_COLUMNS}
              data={tableData}
              title=""
              isLoading={isLoading || isFetching}
              onRowClick={handleRowClick}
            />
          </HandleInlineError>
        </TableWrapper>
      </StyledMainDiv>
    </Layout>
  );
};
