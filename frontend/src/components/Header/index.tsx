import { Component } from "preact";

class Header extends Component {
  render() {
    return (
      <header className={"px-5 py-5 flex  w-full shadow"}>
        <p className={"flex-none w-96 font-sans text-2xl"}>
          Backup Power Project
        </p>
        <nav className={"grow flex space-x-4 sm:justify-center"}>
          <a
            href={"#home"}
            className={
              "rounded-lg text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
            }
          >
            Home
          </a>
          <a
            href={"#about"}
            className={
              "rounded-lg text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
            }
          >
            About
          </a>
        </nav>
        <div className={"flex-none flex w-96 flex-row-reverse"}>
          <button
            className={
              "flex-none font-sans text-xl rounded bg-green-400 hover:bg-green-300 p-1"
            }
          >
            Settings
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
