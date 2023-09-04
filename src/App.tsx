import { useEffect, useRef, useState } from "react";
import "./App.scss";
const validCommands = ["", "help", "clear"];
function App() {
  const [command, setCommand] = useState("");
  const [log, setLog] = useState<{ command: string; output: string | null }[]>(
    []
  );
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
      const newLogEntry = { command: command.split(" ")[0], output: "" };

      setLog((log) => [...log, newLogEntry]);
      if (validCommands.includes(command)) {
        if (command === "help") {
          newLogEntry.output =
            "page is under construction, but it will be super cool once finished - i promise!";
        } else if (command === "clear") {
          setLog([]);
        }
      } else {
        // Handle invalid command
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
            <div className="tilde">~</div>
            <div className="arrow">❯ {entry.command}</div>
            {entry.output && <div className="output">{entry.output}</div>}
          </div>
        ))}
        <div className="prompt">
          <div className="tilde">~</div>{" "}
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
