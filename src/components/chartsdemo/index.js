import React from "react";
import { LineChart, Brush, BarChart, ScatterPlot  } from 'react-d3-components';

import * as d3 from 'd3';

export default class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data2: [{
        label: 'Wide Eye',
        values: [{ x: "No Data", y: 0 }]
      }]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.newData && nextProps.data.length) {
      this.setState({ data2: nextProps.data });
    }
  }

  render() {
    return (
      <ScatterPlot
        data={this.state.data2}
        width={1500}
        height={500}
        margin={{ top: 100, bottom: 100, left: 50, right: 10 }} />
    );
  }
}
