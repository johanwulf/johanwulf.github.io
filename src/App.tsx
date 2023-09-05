import { useEffect, useRef, useState } from "react";
import { FileType, fileSystem } from "../constants/commands";
import "./App.scss";

function App() {
    const [path, setPath] = useState("~");
    const [command, setCommand] = useState("");
    const [log, setLog] = useState<{ command: string; output: string | null; path: string }[]>([
        {
            command: "./welcome.sh",
            output: "Welcome to my website. If you are comfortable with the terminal and tmux, please have a look around! If not, write help and press enter.",
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
            const cmd = command.split(" ")[0].trim();
            const arg = command.split(" ")[1];

            const entry = fileSystem.filter((e) => e.path === path);
            const files = entry.filter((e) => e.type === FileType.EXECUTEABLE || e.type === FileType.FILE);
            const folders = entry.filter((e) => e.type === FileType.FOLDER && e.name === arg);

            setLog((log) => [...log, newLogEntry]);
            switch (cmd) {
                case "ls":
                    newLogEntry.output = entry.map((e) => e.name).join(" ");
                    break;
                case "clear":
                    setLog([]);
                    break;
                case "cd":
                    if (!arg) {
                        setPath("~");
                    } else if (arg === "..") {
                        setPath("~");
                        newLogEntry.output = " ";
                    } else if (folders.length === 0) {
                        newLogEntry.output = "No such folder";
                    } else {
                        setPath("~/" + folders[0].name);
                        newLogEntry.output = " ";
                    }
                    break;
                case "cat":
                    const f = files.filter((e) => e.name === arg);
                    if (f.length < 1) {
                        newLogEntry.output = `zsh: file not found: ${arg}`;
                    } else {
                        newLogEntry.output = f[0].content!;
                    }
                    break;
                case "":
                    newLogEntry.output = "";
                    break;
                default:
                    newLogEntry.output = `zsh: command not found: ${command.split(" ")[0]}`;
                    break;
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
                            autoFocus
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
