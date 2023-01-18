import { useEffect, useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Home } from "./components/Home";
import { Introduction } from "./components/Introduction";
import { Navbar } from "./components/Navbar/Navbar";
import { NavbarItem } from "./components/Navbar/NavbarItem";
import { View } from "./types/view";
import "./App.css";

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
      className={`flex flex-col content-center w-full max-w-md`}
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
      <div className={`mr-2 ml-2 ${spin && "animate-spin"}`}>
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
