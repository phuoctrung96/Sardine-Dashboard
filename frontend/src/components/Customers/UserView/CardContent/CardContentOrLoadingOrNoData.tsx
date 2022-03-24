import { CardContentFilled, CardNameWithHeaders, DivNoDataAvailable } from "components/Customers/UserView";

import LoadingText from "components/Common/LoadingText";

const CardContentOrLoadingOrNoData = ({
  isLoading,
  name,
  tableBodyElements,
}: {
  isLoading: boolean;
  name: CardNameWithHeaders;
  tableBodyElements: JSX.Element[];
}): JSX.Element =>
  isLoading ? (
    <LoadingText />
  ) : !tableBodyElements?.length ? (
    <DivNoDataAvailable />
  ) : (
    <CardContentFilled name={name} tableBodyElements={tableBodyElements} />
  );

export default CardContentOrLoadingOrNoData;
