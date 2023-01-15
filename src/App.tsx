import { useState } from "react";
import "./App.css";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Home } from "./components/Home";
import { Introduction } from "./components/Introduction";
import { Navbar } from "./components/Navbar/Navbar";
import { NavbarItem } from "./components/Navbar/NavbarItem";

enum View {
  HOME,
  ABOUT,
  CONTACT,
}

function App() {
  const [view, setView] = useState(0);
  const [fade, setFade] = useState(false);

  const handleItemClick = (nextView: View) => {
    if (nextView === view) return;
    setFade(true);
    setTimeout(() => {
      setView(nextView);
      setFade(false);
    }, 500);
  };

  return (
    <div className="flex flex-col content-center w-full max-w-md">
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
      <div className="mr-2 ml-2">
        <Introduction />
        <div
          className={`transition-all duration-500 ease-in-out ${
            fade === false ? "opacity-100" : "opacity-0"
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
