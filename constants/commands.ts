export enum FileType {
    FILE,
    FOLDER,
    EXECUTEABLE,
}

export type File = {
    name: string;
    type: FileType;
    path: string;
    content?: string;
};

export type LogEntry = {
    command: string;
    output: string;
    path: string;
};

export const InitialLogEntry: LogEntry = {
    command: "./welcome.sh",
    output: "Welcome to my website. If you are comfortable with the terminal and tmux, please have a look around! If not, write help and press enter.",
    path: "~",
};

export const fileSystem: File[] = [
    {
        name: "about.txt",
        type: FileType.FILE,
        path: "~",
        content: "hi im johan",
    },
    {
        name: "readme.txt",
        type: FileType.FILE,
        path: "~",
        content: "actually please don't read me",
    },
    {
        name: "welcome.sh",
        type: FileType.EXECUTEABLE,
        path: "~",
        content: "echo Welcome",
    },
    { name: "fun-things", type: FileType.FOLDER, path: "~" },
    { name: "another.txt", type: FileType.FILE, path: "~/fun-things", content: "Another one" },
];
