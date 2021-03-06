import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries, BarSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

class CandleStickChart extends React.Component {
  render() {
    const { type, width, data, ratio } = this.props;
    const xAccessor = (d) => d.date;
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 100]),
    ];
    return (
      <ChartCanvas
        height={400}
        ratio={ratio}
        width={width}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
        </Chart>
        <Chart
          id={2}
          yExtents={[(d) => d.volume]}
          height={150}
          origin={(w, h) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format(".2s")}
          />

          {/* <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
          /> */}

          <BarSeries
            yAccessor={(d) => d.volume}
            fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />
        </Chart>
      </ChartCanvas>
    );
  }
}

CandleStickChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChart.defaultProps = {
  type: "svg",
};
CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;
