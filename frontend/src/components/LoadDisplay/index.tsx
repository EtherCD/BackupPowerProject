import { Component } from "preact";
import { connect } from "unistore/preact";
import { InfoStore } from "../../store/types";
import { LoadDisplayProps, LoadDisplayState } from "./types";
import Gauge from "react-gaugejs";
import { hoursToFormattedString, shortWatts } from "../../utils";

class LoadDisplay extends Component<LoadDisplayProps, LoadDisplayState> {
  state = {
    percent: 0,
    time: 0,
  };

  updateData() {
    this.setState({
      percent: Math.round((this.props.load / this.props.maxLoad) * 100),
      time:
        Math.round(
          ((this.props.capacity - this.props.consumed) / this.props.load) * 100
        ) / 100,
    });
  }

  componentWillMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps: LoadDisplayProps) {
    if (this.props != prevProps) this.updateData();
  }

  render() {
    return (
      <div
        className={
          "shadow bg-slate-100 rounded w-96 h-80 border-2 border-teal-500"
        }
      >
        <h1 className={"text-center mb-2 text-xl"}>Load Display</h1>
        <div className={"absolute"}>
          <Gauge
            value={this.props.load}
            style={{ width: 384 }}
            minValue={0}
            maxValue={this.props.maxLoad}
            animationSpeed={12}
            options={{
              angle: -0.14,
              lineWidth: 0.31,
              radiusScale: 1,
              pointer: {
                length: 0.29,
                strokeWidth: 0.062,
                color: "#053b3d",
              },
              limitMax: false,
              limitMin: false,
              colorStart: "#5ffedf",
              colorStop: "#0e8d84",
              strokeColor: "#E0E0E0",
              generateGradient: true,
              highDpiSupport: true,
            }}
            donut={false}
            textChangeHandler={() => {}}
          />
        </div>
        <div className={"absolute text-center my-40 w-96"}>
          <p>{this.state.percent}%</p>
          <p>
            {shortWatts(this.props.load)}/{shortWatts(this.props.maxLoad)}
          </p>
          <p>
            Time until the battery is completely discharged with the current
            load {hoursToFormattedString(this.state.time)}
          </p>
        </div>
      </div>
    );
  }
}

export default connect<{}, {}, InfoStore, LoadDisplayProps>([
  "load",
  "maxLoad",
  "capacity",
  "consumed",
])((props) => <LoadDisplay {...props} />);
