import { useEffect, useRef, useState } from "react";
import { fileSystem } from "../constants/commands";
import "./App.scss";

const validCommands = ["ls", "cd", "clear"];

function App() {
  const [path, setPath] = useState("~");
  const [command, setCommand] = useState("");
  const [log, setLog] = useState<
    { command: string; output: string | null; path: string }[]
  >([
    {
      command: "./welcome.sh",
      output:
        "Welcome to my website. If you are comfortable with the terminal and tmux, please have a look around! If not, write help and press enter.",
      path: "~",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      const newLogEntry = { command, output: "", path: path };
      const c = command.split(" ")[0];
      const a = command.split(" ")[1];

      setLog((log) => [...log, newLogEntry]);
      if (validCommands.includes(c)) {
        if (command === "ls") {
          newLogEntry.output = fileSystem
            .filter((e) => e.path === path)
            .map((e) => e.name)
            .join(" ");
        } else if (command === "clear") {
          setLog([]);
        } else if (command === "./welcome.sh") {
          newLogEntry.output =
            "Welcome to my website. If you are comfortable with the terminal and tmux, please have a look around! If not, write help and press enter.";
        } else if (c === "cd") {
          const f = fileSystem
            .filter((e) => e.path === path && e.type == "folder")
            .map((e) => e.name);

          if (a === "..") {
            setPath("~");
            newLogEntry.output = " ";
          } else if (a === "" || a === " ") {
            setPath("~");
            newLogEntry.output = " ";
          } else if (f.length === 0) {
            newLogEntry.output = "No such folder";
          } else {
            setPath(f[0]);
            newLogEntry.output = " ";
          }
        }
      } else {
        newLogEntry.output = `zsh: command not found: ${command.split(" ")[0]}`;
      }

      setCommand("");
    }
  };
  return (
    <div className="main-content">
      <div className="title-bar">
        <div className="title-bar-buttons">
          <div className="title-bar-buttons-red"></div>
          <div className="title-bar-buttons-yellow"></div>
          <div className="title-bar-buttons-green"></div>
        </div>
        johan.wulf - tmux
      </div>
      <div className="terminal">
        {log.map((entry, index) => (
          <div key={index} className="log-entry">
            <div className="tilde">{entry.path}</div>
            <div className="arrow">
              ❯ <div className="output">{entry.command}</div>
            </div>
            {entry.output && <div className="output">{entry.output}</div>}
          </div>
        ))}
        <div className="prompt">
          <div className="tilde">{path}</div>{" "}
          <div className="arrow">
            ❯{" "}
            <input
              ref={inputRef}
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="text"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="tmux">1:home* 2:projects 3:about</div>
      </div>
    </div>
  );
}

export default App;
