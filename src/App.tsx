import { useEffect, useRef, useState } from "react";
import { FileType, fileSystem, File, LogEntry, InitialLogEntry } from "../constants/commands";
import "./App.scss";

function App() {
    const [path, setPath] = useState("~");
    const [command, setCommand] = useState("");
    const [files, setFiles] = useState<File[]>(fileSystem);
    const [broken, setBroken] = useState(false);
    const [old, setOld] = useState(false);
    const [nano, setNano] = useState<any | null>(null);
    const [colors, setColors] = useState<any>({
        titlebar: "#222436",
        background: "#1a1b26",
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("broken") ?? "false")) {
            setBroken(true);
            setOld(true);
        }
    }, []);

    useEffect(() => {
        const file = files.find((e) => e.name === "alacritty.json");
        if (!file || !file.content) {
            setColors({
                titlebar: "#222436",
                background: "#1a1b26",
            });
        } else {
            const c = JSON.parse(file.content ?? "");
            if (!c.colors.titlebar || !c.colors.background) {
                setColors({
                    titlebar: "#222436",
                    background: "#1a1b26",
                });
            } else {
                setColors({
                    titlebar: c.colors.titlebar,
                    background: c.colors.background,
                });
            }
        }
    }, [files]);

    const [log, setLog] = useState<LogEntry[]>(JSON.parse(localStorage.getItem("broken") ?? "false") ? [] : [InitialLogEntry]);

    useEffect(() => {
        if (!terminalRef.current) return;
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }, [log]);

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
        if (nano && e.ctrlKey && e.key === "x") {
            setFiles(files.filter((e) => e.name !== nano.name));
            setFiles((old) => [...old, nano]);
            setNano(null);
        } else if (nano && e.ctrlKey && e.key === "c") {
            setNano(null);
        }
        if (e.key === "Enter") {
            const newLogEntry = { command, output: "", path: path };
            const [cmd, arg1, arg2] = command.trim().split(" ");

            const entry = files.filter((e) => e.path === path);
            const f = entry.filter((e) => e.type === FileType.EXECUTEABLE || e.type === FileType.FILE);
            const folders = entry.filter((e) => e.type === FileType.FOLDER && e.name === arg1);

            setLog((log) => [...log, newLogEntry]);

            if (broken) {
                newLogEntry.output = `unknown command: ${cmd}`;
                setCommand("");
                return;
            }

            switch (cmd) {
                case "nano":
                    const file = f.filter((e) => e.name === arg1)[0];

                    if (!file) {
                        newLogEntry.output = `nano: file not found ${arg1}`;
                    } else {
                        setNano(file);
                    }
                    break;
                case "touch":
                    setFiles((f) => [...f, { name: arg1, path, type: FileType.FILE, content: "" }]);
                    break;
                case "mkdir":
                    setFiles((f) => [...f, { name: arg1, path, type: FileType.FOLDER }]);
                    break;
                case "rm":
                    if (arg1 === "-rf" && arg2 === "/*") {
                        setBroken(true);
                        localStorage.setItem("broken", "true");
                        setFiles([]);
                    }
                    break;
                case "ls":
                    const files = entry.map((e) => e.name);
                    if (!arg1) {
                        newLogEntry.output = files.filter((e) => e.charAt(0) !== ".").join(" ");
                    } else if (arg1 === "-a") {
                        newLogEntry.output = files.join(" ");
                    } else {
                        newLogEntry.output = `zsh: unknown argument ${arg1}`;
                    }
                    break;
                case "clear":
                    setLog([]);
                    break;
                case "cd":
                    if (!arg1) {
                        setPath("~");
                    } else if (arg1 === "..") {
                        const i = path.lastIndexOf("/");
                        if (i !== -1) {
                            setPath(path.substring(0, i));
                        } else {
                            setPath("~");
                        }
                        newLogEntry.output = " ";
                    } else if (folders.length === 0) {
                        newLogEntry.output = "No such folder";
                    } else {
                        setPath(folders[0].path + "/" + folders[0].name);
                        newLogEntry.output = " ";
                    }
                    break;
                case "cat":
                    const x = f.filter((e) => e.name === arg1);
                    if (x.length < 1) {
                        newLogEntry.output = `zsh: file not found: ${arg1}`;
                    } else {
                        newLogEntry.output = x[0].content!;
                    }
                    break;
                case "":
                    newLogEntry.output = "";
                    break;
                case "help":
                    newLogEntry.output = `Available commands are:
                    cat <file> - outputs content of file
                    cd <folder> - changes directory to folder 
                    clear - clears terminal window 
                    ls - lists files and folders in current directory
                    mkdir <name> - creates a new directory with specified name in current path
                    touch <name> - creates a new file with specified name in current path
                    `;
                    break;
                default:
                    newLogEntry.output = `zsh: command not found: ${cmd}`;
                    break;
            }

            setCommand("");
        }
    };

    if (old) {
        return (
            <div className="broken">
                <div className="broken-terminal" ref={terminalRef}>
                    {log.map((entry, index) => (
                        <div key={index} className="log-entry">
                            <div className="broken-arrow">
                                {`grub rescue>`}
                                <div className="output">{entry.command}</div>
                            </div>
                            {entry.output && <div className="output">{entry.output}</div>}
                        </div>
                    ))}
                    <div className="prompt">
                        <div className="broken-arrow">
                            <div>{`grub rescue>`}</div>
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
                </div>
            </div>
        );
    }

    return (
        <div className={old ? "broken-terminal-window" : "terminal-window"} style={{ background: colors.background }}>
            <div className="title-bar" style={{ background: colors.titlebar }}>
                <div className="title-bar-buttons">
                    <div className="title-bar-buttons-red"></div>
                    <div className="title-bar-buttons-yellow"></div>
                    <div className="title-bar-buttons-green"></div>
                </div>
                johan.wulf
            </div>
            {!nano && (
                <div className="terminal" ref={terminalRef}>
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
                </div>
            )}
            {nano && (
<<<<<<< Updated upstream
                <div className="terminal">
                    <textarea
                        className="nano-text"
                        autoFocus
                        value={nano?.content ?? ""}
                        onChange={(e) => setNano((old: any) => ({ ...old, content: e.target.value.trim() }))}
                        onKeyDown={handleKeyDown}
                    />
                </div>
=======
                <>
                    <div className="terminal">
                        <textarea
                            className="nano-text"
                            autoFocus
                            value={nano?.content ?? ""}
                            onChange={(e) => setNano((old: any) => ({ ...old, content: e.target.value.trim() }))}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="nano-bar">
                        <span>^X SAVE</span>
                        <span>^C DISCARD</span>
                    </div>
                </>
>>>>>>> Stashed changes
            )}
        </div>
    );
}

export default App;
