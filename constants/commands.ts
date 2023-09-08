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
    output: `Welcome! \n Please do not run any commands that would break my lovely website. \n If you need help, type \"help\" and press enter`,
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
        name: "contact.txt",
        type: FileType.FILE,
        path: "~",
        content: `Website: wulf.gg
                  Github: github.com/johanwulf
                  Mail: johan@wulf.gg`,
    },
    {
        name: "welcome.sh",
        type: FileType.EXECUTEABLE,
        path: "~",
        content: `echo Welcome!
                echo "Please do not run any commands that would break my lovely website."
                echo "If you need help, type "help" and press enter"`,
    },
];
