import { Component } from "preact";

class Header extends Component {
  render() {
    return (
      <header className={"px-5 py-5 flex w-full justify-between shadow"}>
        <p className={"font-sans text-2xl"}>Backup Power Project</p>
        <button
          className={
            "flex-none font-sans text-xl rounded bg-green-400 hover:bg-green-300 p-1"
          }
        >
          Settings
        </button>
      </header>
    );
  }
}

export default Header;
