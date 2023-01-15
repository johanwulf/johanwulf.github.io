import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

enum View {
  HOME,
  ABOUT,
  CONTACT,
}

function App() {
  const [view, setView] = useState(0);
  const [fade, setFade] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [modal, showModal] = useState(false);

  const handleItemClick = (nextView: View) => {
    setView(nextView);
    if (nextView === view) return;
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 500);
  };

  const handleLogoClick = () => {
    if (showChat) return;
    setShowChat(true);
    setTimeout(() => {
      setShowChat(false);
    }, 1000);
  };

  const handleButtonClick = (input: string) => {
    switch (input) {
      case "linkedin":
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="artboard phone-3 flex items-center flex-col">
        <div className="navbar bg-zinc-900 mt-4">
          <div className="navbar-middle">
            <button
              className="btn btn-square btn-link btn-ghost"
              onClick={() => handleLogoClick()}
            >
              <img src="/wolf.svg" className="logo" alt="Wolf logo" />
            </button>
            <div className="chat chat-start ">
              <div
                className={`chat-bubble w-20 transition-all duration-1000 ease-in-out bg-sky-600 text-white ${
                  showChat ? "opacity-100" : "opacity-0"
                }`}
              >
                Woof
              </div>
            </div>
            <button
              className={`btn btn-ghost btn-link lowercase ${
                view === View.HOME ? "text-orange-500" : "text-orange-300"
              } no-underline hover:no-underline hover:text-orange-500 font-bold`}
              onClick={() => handleItemClick(View.HOME)}
            >
              home
            </button>
            <button
              className={`btn btn-ghost btn-link lowercase ${
                view === View.ABOUT ? "text-orange-500" : "text-orange-300"
              } no-underline hover:no-underline hover:text-orange-500 font-bold`}
              onClick={() => handleItemClick(View.ABOUT)}
            >
              about
            </button>
            <button
              className={`btn btn-ghost btn-link lowercase ${
                view === View.CONTACT ? "text-orange-500" : "text-orange-300"
              } no-underline hover:no-underline hover:text-orange-500 font-bold`}
              onClick={() => handleItemClick(View.CONTACT)}
            >
              contact
            </button>
          </div>
          <div className="navbar-end gap-5 mr-96"></div>
        </div>
        <div className="grid h-screen justify-items-center">
          <div
            className={`flex flex-col gap-1 transition-all duration-500 ease-in-out absolute w-96 opacity-100 text-white`}
          >
            <p className="text-l font-semibold">Hello!</p>
            <div className="indent-3">
              My name is Johan Wulf and I am a 25-year-old Junior Software
              Engineer currently working at IKEA. I have a passion for
              technology and am always striving to learn new things, both in
              frontend and backend development.
            </div>
            <div className="indent-3">
              I am particularly interested in web development, and have
              experience with languages such as JavaScript, HTML, CSS, and
              Python. I also love working with different frameworks like React,
              Angular and Node.js. When I am not working, I enjoy spending my
              free time training my beloved puppy.
            </div>
          </div>
          <div
            className={`flex flex-col gap-1 transition-all duration-500 ease-in-out absolute w-96 mt-80 ${
              view === View.HOME && fade === false ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-xl text-white font-bold">Biography</h1>
            <div className="flex gap-4">
              <h1 className="text-l text-white font-bold">1998</h1>
              <p className="text-white">Born in Växjö, Sweden</p>
            </div>
            <div className="flex gap-4">
              <h1 className="text-l text-white font-bold">2022</h1>
              <p className="text-white">
                Graduated from Lunds Tekniska Högskola, Bachelor of Science in
                Engineering, Computer Science and Engineering
              </p>
            </div>
            <div className="flex gap-4">
              <h1 className="text-l text-white font-bold">2022</h1>
              <p className="text-white">
                Began working for IKEA as a Junior Software Engineer
              </p>
            </div>
          </div>

          <div
            className={`flex flex-col gap-1 transition-all duration-500 ease-in-out absolute w-96 mt-80 ${
              view === View.ABOUT && fade === false
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <h1 className="text-xl text-white font-bold">About</h1>
            <div className="flex gap-4">
              <h1 className="text-l text-white font-bold">Lorem</h1>
              <p className="text-white">Lorem Ipsum bla bla bla</p>
            </div>
            <div className="flex gap-4">
              <h1 className="text-l text-white font-bold">Lorem</h1>
              <p className="text-white">Lorem Ipsum bla bla bla</p>
            </div>
            <div className="flex gap-4">
              <h1 className="text-l text-white font-bold">Lorem</h1>
              <p className="text-white">Lorem ipsum bla bla bla</p>
            </div>
          </div>

          <div
            className={`flex flex-col gap-2 transition-all duration-500 ease-in-out absolute w-96 mt-80 ${
              view === View.CONTACT && fade === false
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <h1 className="text-xl text-white font-bold">Find me</h1>
            <a
              className="flex gap-4"
              href="https://www.linkedin.com/in/johanwulf/"
              target="_blank"
            >
              <img src="./linkedin.svg" className="invert" />
              <p className="text-white">LinkedIn</p>
            </a>
            <a
              className="flex gap-4"
              href="https://www.github.com/johanwulf"
              target="_blank"
            >
              <img src="./github.svg" className="invert" />
              <p className="text-white">GitHub</p>
            </a>
            <a className="flex gap-4" href="mailto:johan@wulf.gg">
              <img src="./mail.svg" className="invert" />
              <p className="text-white">johan@wulf.gg</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
