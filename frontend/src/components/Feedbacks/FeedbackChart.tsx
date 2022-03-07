import moment from "moment";
import ReactApexChart from "react-apexcharts";

const MOCK_CHART_DATA = {
  low: [300, 250, 150, 350, 390, 260, 280],
  mediumLow: [130, 150, 120, 160, 150, 100, 110],
  medium: [195, 90, 80, 110, 100, 290, 95],
  high: [350, 130, 160, 100, 145, 400, 300],
  veryHigh: [96, 90, 87, 100, 20, 100, 80],
};
const MOCK_DATES = ["23/12", "24/12", "25/12", "26/12", "27/12", "28/12", "29/12"];

export const FeedbackGraph = (): JSX.Element => {
  const datesData = MOCK_DATES.map((d: string) => moment(d, "DD/MM").format("MMM DD"));

  return (
    <ReactApexChart
      type="line"
      options={{
        chart: {
          type: "line",
          toolbar: {
            show: false,
          },
        },
        tooltip: {},
        colors: ["#2FB464", "#ABB71E", "#F7B904", "#F32E2E", "#A20692"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          itemMargin: {
            horizontal: 12,
          },
          markers: {
            width: 6,
            height: 6,
            offsetY: -1,
          },
        },
        stroke: {
          curve: "straight",
          width: 2,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          categories: datesData,
        },
      }}
      series={[
        {
          name: "Low",
          data: MOCK_CHART_DATA.low,
        },
        {
          name: "Medium Low",
          data: MOCK_CHART_DATA.mediumLow,
        },
        {
          name: "Medium",
          data: MOCK_CHART_DATA.medium,
        },
        {
          name: "High",
          data: MOCK_CHART_DATA.high,
        },
        {
          name: "Very High",
          data: MOCK_CHART_DATA.veryHigh,
        },
      ]}
      height={270}
      width="100%"
    />
  );
};
