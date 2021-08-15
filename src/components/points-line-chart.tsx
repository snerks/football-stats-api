import * as React from "react";

import { Line } from "react-chartjs-2";
// import { points2019 } from "./points2019";
// import { points2016 } from "./points2016";
// import { points2017 } from "./points2017";
// import { points2018 } from "./points2018";
// import { points2020 } from "./points2020";
// import { points2021 } from "./points2021";

interface PointsLineChartProps {
  // points2016: number[];
  // points2017: number[];
  // points2018: number[];
  // points2019: number[];
  // points2020: number[];
  // points2021: number[];
  pointsPerYear: PointsPerYear;
}

type ShowYears = {
  [year: number]: boolean;
}

export type PointsPerYear = {
  [year: number]: number[];
}

interface PointsLineChartState {
  showTrendLines: boolean;

  showAllDataPoints: boolean;

  showYears: ShowYears;
}

const defaultState: PointsLineChartState = {
  showTrendLines: false,
  showAllDataPoints: true,

  showYears: {
    2016: false,
    2017: false,
    2018: false,
    2019: false,
    2020: true,
    2021: true
  }
}

class PointsLineChart extends React.Component<
  PointsLineChartProps,
  PointsLineChartState
> {

  constructor(props = {
    pointsPerYear: {
      points2016: [],
      points2017: [],
      points2018: [],
      points2019: [],
      points2020: [],
      points2021: [],
    }
  }) {
    super(props);
    this.state = defaultState;
  }

  handleShowTrendLines = () => {
    this.setState(prevState => {
      const nextState = { ...prevState };
      nextState.showTrendLines = !prevState.showTrendLines;
      nextState.showYears = { ...prevState.showYears };

      console.warn("handleShowTrendLines");
      console.warn(JSON.stringify(nextState));

      return nextState;
    });
  };

  handleShowAllDataPoints = () => {
    this.setState(prevState => {
      const nextState = { ...prevState };
      nextState.showAllDataPoints = !prevState.showAllDataPoints;
      nextState.showYears = { ...prevState.showYears };

      console.warn("showAllDataPoints");
      console.warn(JSON.stringify(nextState));

      return nextState;
    });
  };

  handleShowYear = (year: number) => {
    this.setState(prevState => {
      const nextState = { ...prevState };
      nextState.showYears = { ...prevState.showYears };
      nextState.showYears[year] = !prevState.showYears[year];

      console.warn("handleShowYear : " + year);
      console.warn(JSON.stringify(nextState));

      return nextState;
    });
  };

  render() {
    const redRgba = "255, 0, 0";
    const redLineColour = `rgba(${redRgba}, 1)`;
    const redLegendFillColour = `rgba(${redRgba}, 0.4)`;

    // 128, 0, 128
    const purpleRgba = "85, 85, 85";
    const purpleLineColour = `rgba(${purpleRgba}, 1)`;
    const purpleLegendFillColour = `rgba(${purpleRgba}, 0.4)`;

    const slateBlueRgba = "0, 100, 0";
    const slateBlueLineColour = `rgba(${slateBlueRgba}, 1)`;
    const slateBlueLegendFillColour = `rgba(${slateBlueRgba}, 0.4)`;

    const greyRgba = "220, 220, 220";
    const greyLineColour = `rgba(${greyRgba}, 1)`;
    // const greyLegendFillColour = `rgba(${greyRgba}, 0.4)`;

    // 2016 - Alice Blue
    const aliceBlueRgba = "0, 0, 255";
    const aliceBlueLineColour = `rgba(${aliceBlueRgba}, 1)`;
    const aliceBlueLegendFillColour = `rgba(${aliceBlueRgba}, 0.4)`;

    const greenRgba = "75, 192, 192";
    const greenLineColour = `rgba(${greenRgba}, 1)`;
    const greenLegendFillColour = `rgba(${greenRgba}, 0.4)`;

    const orangeRgba = "255, 165, 0";
    const orangeLineColour = `rgba(${orangeRgba}, 1)`;
    const orangeLegendFillColour = `rgba(${orangeRgba}, 0.4)`;

    const defaultChartDataSet: Chart.ChartDataSets = {
      // label: "2016-",
      fill: false,
      lineTension: 0.1,

      // backgroundColor: aliceBlueLegendFillColour,
      // borderColor: aliceBlueLineColour,

      borderCapStyle: "butt",
      borderDash: [3, 3],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",

      borderWidth: 3,

      // pointBorderColor: aliceBlueLineColour,

      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,

      // pointHoverBackgroundColor: aliceBlueLineColour,

      pointHoverBorderColor: greyLineColour,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      // data: pointsRunningTotalsPerYear[2016]
    }

    const pointsRunningTotalsPerYear: PointsPerYear = {
      2016: [],
      2017: [],
      2018: [],
      2019: [],
      2020: [],
      2021: [],
    }

    // const pointsPerYear: PointsPerYear = {
    //   2016: this.props.pointsPerYear[2016],
    //   2017: this.props.pointsPerYear[2016],
    //   2018: this.props.pointsPerYear[2016],
    //   2019: this.props.pointsPerYear[2016],
    //   2020: this.props.pointsPerYear[2016],
    //   2021: this.props.pointsPerYear[2016],
    // }

    const pointsPerYear: PointsPerYear = this.props.pointsPerYear;

    for (const year in pointsRunningTotalsPerYear) {
      if (Object.prototype.hasOwnProperty.call(pointsRunningTotalsPerYear, year)) {
        const yearElement = pointsRunningTotalsPerYear[year];

        for (let index = 0; index < pointsPerYear[year].length; index++) {
          const runningTotal = index === 0 ? 0 : yearElement[index - 1];

          const nextElement = runningTotal + pointsPerYear[year][index];

          yearElement.push(nextElement);
        }
      }
    }

    // const dataPointCount = pointsPerYear[2016].length;
    const dataPointCount =
      this.state.showAllDataPoints ?
        pointsPerYear[2016].length :
        Math.max(pointsPerYear[2021].length + 10, 12);

    const labels: string[] = [];

    for (let index = 0; index < dataPointCount; index++) {
      const gameNumber = index;

      const element =
        (gameNumber % 5 === 0 ||
          gameNumber === 1 ||
          gameNumber === 23 ||
          gameNumber === 46) &&
          gameNumber !== 45
          ? gameNumber.toString(10)
          : "";

      labels.push(element);
    }

    const chartData: Chart.ChartData = {
      labels: labels,

      datasets: []
    };

    if (this.state.showYears[2016]) {
      if (chartData.datasets) {
        chartData.datasets.push({
          ...defaultChartDataSet,
          label: "2016-",
          backgroundColor: aliceBlueLegendFillColour,
          borderColor: aliceBlueLineColour,
          pointBorderColor: aliceBlueLineColour,
          pointHoverBackgroundColor: aliceBlueLineColour,
          data: pointsRunningTotalsPerYear[2016].slice(0, dataPointCount),
        });
      }
    }

    if (this.state.showYears[2017]) {
      if (chartData.datasets) {
        chartData.datasets.push({
          ...defaultChartDataSet,
          label: "2017-",
          backgroundColor: purpleLegendFillColour,
          borderColor: purpleLineColour,
          pointBorderColor: purpleLineColour,
          pointHoverBackgroundColor: purpleLineColour,
          data: pointsRunningTotalsPerYear[2017].slice(0, dataPointCount),
        });
      }
    }

    if (this.state.showYears[2018]) {
      if (chartData.datasets) {
        chartData.datasets.push({
          ...defaultChartDataSet,
          label: "2018-",
          backgroundColor: slateBlueLegendFillColour,
          borderColor: slateBlueLineColour,
          pointBorderColor: slateBlueLineColour,
          pointHoverBackgroundColor: slateBlueLineColour,
          data: pointsRunningTotalsPerYear[2018].slice(0, dataPointCount),
        });
      }
    }

    if (this.state.showYears[2019]) {
      if (chartData.datasets) {
        chartData.datasets.push({
          ...defaultChartDataSet,
          label: "2019-",
          backgroundColor: slateBlueLegendFillColour,
          borderColor: slateBlueLineColour,
          pointBorderColor: slateBlueLineColour,
          pointHoverBackgroundColor: slateBlueLineColour,
          borderDash: [],
          data: pointsRunningTotalsPerYear[2019].slice(0, dataPointCount),
        });
      }
    }

    if (this.state.showYears[2020]) {
      if (chartData.datasets) {
        chartData.datasets.push({
          ...defaultChartDataSet,
          label: "2020-",
          backgroundColor: purpleLegendFillColour,
          borderColor: purpleLineColour,
          pointBorderColor: purpleLineColour,
          pointHoverBackgroundColor: purpleLineColour,
          borderDash: [],
          data: pointsRunningTotalsPerYear[2020].slice(0, dataPointCount),
        });
      }
    }

    if (this.state.showYears[2021]) {
      if (chartData.datasets) {
        chartData.datasets.push({
          ...defaultChartDataSet,
          label: "2021-",
          backgroundColor: redLegendFillColour,
          borderColor: redLineColour,
          pointBorderColor: redLineColour,
          pointHoverBackgroundColor: redLineColour,
          borderDash: [],
          data: pointsRunningTotalsPerYear[2021].slice(0, dataPointCount),

          borderWidth: 4
        });
      }
    }

    if (this.state.showTrendLines) {
      const playoffFormValues: number[] = [];

      for (let index = 0; index < dataPointCount; index++) {
        // const element = (index + 1) * 1.7;
        const element = index * 1.61;
        playoffFormValues.push(element);
      }

      const relegationFormValues: number[] = [];

      for (let index = 0; index < dataPointCount; index++) {
        const element = index * 1.0;
        relegationFormValues.push(element);
      }

      if (chartData.datasets) {
        chartData.datasets.push({
          ...defaultChartDataSet,
          label: "Playoffs",
          backgroundColor: greenLegendFillColour,
          borderColor: greenLineColour,
          pointBorderColor: greenLineColour,
          pointHoverBackgroundColor: greenLineColour,
          borderDash: [5, 15],
          data: playoffFormValues,
        });

        chartData.datasets.push({
          ...defaultChartDataSet,
          label: "Relegation",
          backgroundColor: orangeLegendFillColour,
          borderColor: orangeLineColour,
          pointBorderColor: orangeLineColour,
          pointHoverBackgroundColor: orangeLineColour,
          borderDash: [5, 15],
          data: relegationFormValues,
        });
      }
    }

    const chartOptions = {
      // responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Points Total"
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Games Played"
            }
          }
        ]
      }
    };

    return (
      <div style={{ position: "relative", height: "80vh" }}>
        <div
          className="custom-control custom-checkbox"
          style={{ margin: "10px 30px 5px 25px" }}
        >
          <label className="custom-control-label">Show: </label>{" "}
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
            onChange={() => this.handleShowTrendLines()}
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Trend Lines
          </label>

          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck2"
            onChange={() => this.handleShowAllDataPoints()}
            checked={this.state.showAllDataPoints}
          />
          <label className="custom-control-label" htmlFor="customCheck2">
            All Points
          </label>

          {/* <pre>
            {JSON.stringify(this.state, null, 2)}
          </pre> */}

          {/* {
            Object.keys(this.state.showYears).map(i =>
            (!isNaN(+i) &&
              <div key={+i} style={{ display: "inline" }}>
                <h3>{i} : {(this.state.showYears as any)[i]}</h3>
              </div>
            ))
          } */}

          {
            Object.keys(pointsRunningTotalsPerYear).map(i =>
            (!isNaN(+i) &&
              <div key={+i} style={{ display: "inline" }}>
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={`show${i}Checkbox`}
                  onChange={() => this.handleShowYear(+i)}
                  style={{ marginLeft: "10px" }}
                  checked={(this.state.showYears as any)[i]} />
                <label className="custom-control-label" htmlFor={`show${i}Checkbox`}>
                  {i}-
                </label>
              </div>
            ))
          }
        </div>

        <Line
          data={chartData}
          options={chartOptions}
        // width={600}
        // redraw={true}
        />
      </div>
    );
  }
}

export default PointsLineChart;
