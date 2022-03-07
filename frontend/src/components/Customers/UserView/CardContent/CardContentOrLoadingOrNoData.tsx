import { CardContentFilled, CardNameWithHeaders, DivNoDataAvailable } from "components/Customers/UserView";

import LoadingText from "components/Common/LoadingText";

const CardContentOrLoadingOrNoData = ({
  isLoading,
  hasData,
  name,
  tableBodyElements,
}: {
  isLoading: boolean;
  hasData: boolean;
  name: CardNameWithHeaders;
  tableBodyElements: JSX.Element[];
}): JSX.Element =>
  isLoading ? (
    <LoadingText />
  ) : !hasData ? (
    <DivNoDataAvailable />
  ) : (
    <CardContentFilled name={name} tableBodyElements={tableBodyElements} />
  );

export default CardContentOrLoadingOrNoData;
