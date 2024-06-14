import { Component, createRef } from "preact";
import Gauge from "react-gaugejs";
import { connect } from "unistore/preact";
import { InfoStore } from "../../store/types";
import { ChargeProps } from "./types";
import { hoursToFormattedString, shortWatts } from "../../utils";

class ChargeDisplay extends Component<ChargeProps> {
  currentRef = createRef<HTMLInputElement>();
  state = {
    chargePercent: 100,
    chargeValue: 100,
    timeToChargeBattery: 0,
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
    let current = this.currentRef.current
      ? parseInt(this.currentRef.current.value)
      : 6;
    if (current < 1 || Number.isNaN(current)) current = 1;
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
  }

  componentWillMount(): void {
    this.updateData();
  }

  componentDidUpdate(prevProps: ChargeProps): void {
    if (this.props != prevProps) this.updateData();
  }

  render() {
    return (
      <div
        className={
          "shadow bg-slate-100 rounded w-96 h-80 border-2 border-lime-500"
        }
      >
        <h1 className={"text-center mb-2 text-xl"}>Charge Display</h1>
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
            {shortWatts(this.state.chargeValue)}h/
            {shortWatts(this.props.capacity)}h
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
          <p className={"text-sm"}>
            Time it takes to charge the battery{" "}
            {hoursToFormattedString(this.state.timeToChargeBattery)}, with
            current
          </p>
          <input
            type="number"
            min={1}
            step={1}
            ref={this.currentRef}
            defaultValue={"6"}
            onInput={() => this.recalculate()}
          />
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
])((props) => <ChargeDisplay {...props} />);
