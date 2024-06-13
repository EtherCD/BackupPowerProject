import { Component, createRef } from "preact";
import Gauge from "react-gaugejs";
import { connect } from "unistore/preact";
import { InfoStore } from "../../store/types";
import { ChargeProps } from "./types";
import { shortWatts } from "./utils";

class Charge extends Component<ChargeProps> {
  currentRef = createRef<HTMLInputElement>();
  state = {
    chargePercent: 100,
    chargeValue: 100,
    timeToChargeBattery: 0,
    chargeCurrent: 6,
  };

  updateData() {
    const charge =
      (this.props.capacity - this.props.consumed) / this.props.capacity;
    this.setState({
      chargePercent: Math.floor(charge * 100),
      chargeValue: this.props.capacity - this.props.consumed,
    });
    this.recalculate(charge);
  }

  recalculate(charge?: number) {
    const current = this.state.chargeCurrent;
    this.setState({
      timeToChargeBattery:
        Math.round(
          ((this.props.capacityInAh -
            (charge ? charge : this.state.chargePercent / 100) *
              this.props.capacityInAh) /
            current) *
            100
        ) / 100,
    });
    console.log((this.state.chargePercent / 100) * this.props.capacityInAh);
  }

  componentWillMount(): void {
    this.updateData();
  }

  componentDidUpdate(): void {
    this.updateData();
  }

  render() {
    return (
      <div
        className={
          "relative flex-col shadow bg-slate-100 rounded w-96 m-10 h-72 border-2 border-lime-500"
        }
      >
        <h1 className={"text-center mb-2 text-xl  "}>Charge Display</h1>
        <div className={"absolute"}>
          <Gauge
            value={this.state.chargePercent}
            style={{ width: 384 }}
            minValue={0}
            maxValue={100}
            animationSpeed={12}
            options={{
              angle: -0.23,
              lineWidth: 0.29,
              radiusScale: 1,
              pointer: {
                length: 0.35,
                strokeWidth: 0.055,
                color: "#808080",
              },
              limitMax: false,
              limitMin: false,
              colorStart: "#6FADCF",
              colorStop: "#8FC0DA",
              strokeColor: "#3e3a3a",
              generateGradient: true,
              highDpiSupport: true,
              renderTicks: {
                divisions: 10,
                divWidth: 1.1,
                divLength: 0.71,
                divColor: "#111",
                subDivisions: 4,
                subLength: 0.21,
                subWidth: 1,
                subColor: "#111",
              },
              staticLabels: {
                font: "10px sans-serif",
                labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                color: "#000000",
                fractionDigits: 0,
              },
              staticZones: [
                { strokeStyle: "#CC1629", min: 0, max: 30 },
                { strokeStyle: "#CCB916", min: 30, max: 70 },
                { strokeStyle: "#33B366", min: 70, max: 100 },
              ],
            }}
            donut={false}
            textChangeHandler={() => {}}
          />
        </div>
        <div className={"absolute text-center my-32 w-96"}>
          <p>{this.state.chargePercent}%</p>
          <p>
            {shortWatts(this.state.chargeValue)}/
            {shortWatts(this.props.capacity)}
          </p>
          <p>
            <label style={{ color: "#00A4A7" }}>{this.props.voltage}V</label>{" "}
            <label
              style={{
                color: "#008544",
              }}
            >
              {this.props.current}A
            </label>
          </p>
          <p>
            Time it takes to charge the battery{" "}
            {Math.floor(this.state.timeToChargeBattery)}h{" "}
            {Math.floor(this.state.timeToChargeBattery / 60) % 60}m, with
            current{" "}
            <input
              type="number"
              value={this.state.chargeCurrent}
              onInput={(event) => {
                this.setState((event.target! as HTMLInputElement).value);
                event.preventDefault();
                this.recalculate();
              }}
            />
          </p>
        </div>
      </div>
    );
  }
}

export default connect<{}, {}, InfoStore, ChargeProps>([
  "consumed",
  "capacity",
  "capacityInAh",
  "voltage",
  "current",
])((props) => <Charge {...props} />);
