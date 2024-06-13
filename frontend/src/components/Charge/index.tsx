import { Component } from "preact";
import Canvas from "./Canvas";

class Charge extends Component {
  render() {
    return (
      <div className={"flex flex-col shadow bg-slate-100 rounded"}>
        <Canvas />
      </div>
    );
  }
}

export default Charge;
