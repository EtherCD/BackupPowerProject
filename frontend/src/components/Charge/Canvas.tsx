import { Component, createRef } from "preact";
import { connect } from "unistore/preact";
import { CanvasProps } from "./types";
import { InfoStore } from "../../store/types";

class Canvas extends Component<CanvasProps> {
  canvasRef = createRef<HTMLCanvasElement>();
  width = 160;
  height = 120;

  renderCanvas() {
    if (!this.canvasRef.current) return;
    const ctx = this.canvasRef.current.getContext("2d")!;

    ctx.clearRect(0, 0, this.width, this.height);
    const radius = this.width / 2 - 20;

    const gradient = ctx.createRadialGradient(
      this.width / 2,
      this.height / 2,
      radius,
      this.width,
      this.height,
      radius
    );

    gradient.addColorStop(0, "red");
    gradient.addColorStop(1, "green");

    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, radius, 0, Math.PI, false);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
  }

  componentDidUpdate(): void {
    this.renderCanvas();
  }

  render() {
    return (
      <canvas
        width={this.width}
        height={this.height}
        ref={this.canvasRef}
        className={"object-none"}
      ></canvas>
    );
  }
}

export default connect<{}, {}, InfoStore, CanvasProps>([
  "consumed",
  "capacity",
  "voltage",
  "current",
])((props) => <Canvas {...props} />);
