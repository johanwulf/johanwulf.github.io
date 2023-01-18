import { useEffect, useState } from "react";
import { View } from "./types/view";
import "./App.css";
import { About } from "./Components/About";
import { Contact } from "./Components/Contact";
import { Home } from "./Components/Home";
import { Introduction } from "./Components/Introduction";
import { Navbar } from "./Components/Navbar/Navbar";
import { NavbarItem } from "./Components/Navbar/NavbarItem";

function App() {
  const [view, setView] = useState(0);
  const [fade, setFade] = useState(false);
  const [sequence, setSequence] = useState("");
  const [spin, setSpin] = useState(false);

  const handleItemClick = (nextView: View) => {
    if (nextView === view) return;
    setFade(true);
    ("");
    setTimeout(() => {
      setView(nextView);
      setFade(false);
    }, 500);
  };

  useEffect(() => {
    if (sequence === "flip") {
      setSpin(true);
      setTimeout(() => {
        setSpin(false);
      }, 2000);
      setSequence("");
    }
  }, [sequence]);

  const handleKeyPress = (event: any) => {
    console.log(sequence);
    if (
      event.key === "f" ||
      event.key === "l" ||
      event.key === "i" ||
      event.key === "p"
    ) {
      setSequence(sequence + event.key);
    } else {
      setSequence("");
    }
  };

  return (
    <div
      className={`flex flex-col w-full pl-2 pr-2 flex-shrink flex-grow max-w-md`}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <Navbar>
        <NavbarItem
          title="home"
          currentView={view}
          view={View.HOME}
          onClick={handleItemClick}
        />
        <NavbarItem
          title="about"
          currentView={view}
          view={View.ABOUT}
          onClick={handleItemClick}
        />
        <NavbarItem
          title="contact"
          currentView={view}
          view={View.CONTACT}
          onClick={handleItemClick}
        />
      </Navbar>
      <div className={`${spin ? "animate-spin" : ""}`}>
        <Introduction />
        <div
          className={`transition-all duration-500 ease-in-out ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {view === View.HOME && <Home />}
          {view === View.ABOUT && <About />}
          {view === View.CONTACT && <Contact />}
        </div>
      </div>
    </div>
  );
}

export default App;
