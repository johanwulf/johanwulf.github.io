import { useEffect, useRef, useState } from "react";
import { FileType, fileSystem, File, LogEntry, InitialLogEntry, HELP_STRING } from "../constants/commands";
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

    const updateLog = (command: string, output: string) => {
        const newLogEntry = { command, output, path };
        setLog((log) => [...log, newLogEntry]);
        return newLogEntry;
    };

    const getFilesInPath = () => {
        return files.filter((file: File) => file.path === path && file.type !== FileType.FOLDER);
    };

    const getFoldersInPath = () => {
        return files.filter((file: File) => file.path === path && file.type === FileType.FOLDER);
    };

    const handleCommand = (command: string) => {
        const [cmd, arg1, arg2] = command.trim().split(" ");
        const pathFiles = files.filter((e: File) => e.path === path);
        const currentFolders = getFoldersInPath();
        const currentFiles = getFilesInPath();

        if (broken) {
            if (!cmd) {
                updateLog("", "");
            } else {
                updateLog(command, `unknown command: ${cmd}`);
            }
            return;
        }

        switch (cmd) {
            case "nano":
                const fileToEdit = currentFiles.find((e) => e.name === arg1);
                if (!fileToEdit) {
                    throw new Error(`nano: file not found: ${arg1 ?? ""}`);
                } else {
                    setNano(fileToEdit);
                }
                updateLog(`${cmd} ${arg1}`, "");
                break;
            case "touch":
                if (!currentFiles.find((e) => e.name === arg1)) {
                    setFiles((f) => [...f, { name: arg1, path, type: FileType.FILE, content: "" }]);
                }
                updateLog(`${cmd} ${arg1}`, "");
                break;
            case "mkdir":
                if (!currentFolders.find((e) => e.name === arg1)) {
                    setFiles((f) => [...f, { name: arg1, path, type: FileType.FOLDER }]);
                    updateLog(`${cmd} ${arg1}`, "");
                } else {
                    throw new Error(`mkdir: directory already exist: ${arg1}`);
                }
                break;
            case "rm":
                if (arg1 === "-rf" && arg2 === "/*") {
                    setBroken(true);
                    localStorage.setItem("broken", "true");
                    updateLog(`${cmd} ${arg1} ${arg2}`, "");
                    setFiles([]);
                } else if (pathFiles.find((file) => file.name === arg1)) {
                    updateLog(`${cmd} ${arg1}`, "");
                    setFiles((f) => [...f.filter((file) => file.name !== arg1)]);
                } else {
                    throw new Error(`rm: file or directory not found: ${arg1}`);
                }
                break;
            case "ls":
                if (!arg1) {
                    updateLog(
                        "ls",
                        pathFiles
                            .map((file) => file.name)
                            .filter((str) => str.charAt(0) !== ".")
                            .join(" ")
                    );
                } else if (arg1 === "-a") {
                    updateLog("ls -a", pathFiles.map((file) => file.name).join(" "));
                } else {
                    throw new Error(`ls: unknown argument: ${arg1}`);
                }
                break;
            case "clear":
                setLog([]);
                break;
            case "cd":
                if (!arg1) {
                    setPath("~");
                    updateLog("cd", "");
                } else if (arg1 === "..") {
                    const i = path.lastIndexOf("/");
                    if (i !== -1) {
                        setPath(path.substring(0, i));
                    } else {
                        setPath("~");
                    }
                    updateLog("cd ..", "");
                } else if (!currentFolders.find((folder) => folder.name === arg1)) {
                    updateLog(`cd ${arg1}`, `cd: no such directory: ${arg1}`);
                } else {
                    const folder = currentFolders.find((folder) => folder.name === arg1);
                    setPath(folder!.path + "/" + folder!.name);
                    updateLog(`cd ${arg1}`, "");
                }
                break;
            case "cat":
                if (!arg1) {
                    throw new Error(`cat: need to specify file`);
                } else if (!files.find((file) => file.name === arg1)) {
                    throw new Error(`cat: file not found: ${arg1}`);
                } else {
                    updateLog(`cat ${arg1}`, files.find((file) => file.name === arg1)!.content ?? "");
                }
                break;
            case "help":
                updateLog(cmd, HELP_STRING);
                break;
            case "":
                updateLog("", "");
                break;
            default:
                throw new Error(`zsh: command not found: ${cmd}`);
        }
    };

    const handleKeyDown = (e: any) => {
        if (nano && e.ctrlKey && e.key === "x") {
            setFiles(files.filter((e) => e.name !== nano.name));
            setFiles((old) => [...old, nano]);
            setNano(null);
        } else if (nano && e.ctrlKey && e.key === "c") {
            setNano(null);
        }

        if (e.key === "Enter") {
            try {
                handleCommand(command);
            } catch (error: any) {
                updateLog(command, error.message);
            } finally {
                setCommand("");
            }
        }
    };

    return (
        <div className={old ? "broken-terminal-window" : "terminal-window"} style={{ background: old ? "#000000" : colors.background }}>
            <div className="title-bar" style={{ background: colors.titlebar }}>
                johan.wulf
            </div>
            {!nano && (
                <div className="terminal" ref={terminalRef}>
                    {log.map((entry, index) => (
                        <div key={index} className="log-entry">
                            {!old && <div className="tilde">{entry.path}</div>}
                            <div className="arrow">
                                {old ? "grub rescue>" : "❯"} <div className="output">{entry.command}</div>
                            </div>
                            {entry.output && <div className="output">{entry.output}</div>}
                        </div>
                    ))}
                    <div className="prompt">
                        {!old && <div className="tilde">{path}</div>}
                        <div className="arrow">
                            <span>{old ? "grub rescue>" : "❯"} </span>
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
            )}
        </div>
    );
}

export default App;
