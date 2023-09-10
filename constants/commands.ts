export enum FileType {
    FILE,
    FOLDER,
    EXECUTEABLE,
}

export type Command = {
    command: string;
    args: string[];
};

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
    output: `Welcome to my website!
    This page is created to replicate my terminal setup
    Feel free to move around, create files/folders and edit them

    Interested in knowing more about me? Type "cat about.txt" and press enter
    In the same manner, my contact details can be found by running "cat contact.txt"
    
    If you want to see what commands you can run in this terminal, run the command "help"`,
    path: "~",
};

export const fileSystem: File[] = [
    {
        name: "about.txt",
        type: FileType.FILE,
        path: "~",
        content: `Hello!
        I'm a software engineer based in Sweden.
        I do a bit of everything, frontend, backend, you name it.`,
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
        content: InitialLogEntry.output,
    },
    {
        name: ".config",
        type: FileType.FOLDER,
        path: "~",
    },
    {
        name: "alacritty.json",
        type: FileType.FILE,
        path: "~/.config",
        content: JSON.stringify({
            colors: {
                titlebar: "#222436",
                background: "#1a1b26",
            },
        }),
    },
];

export const HELP_STRING = `Available commands are:
                    cat <file> - outputs content of file
                    cd <folder> - changes directory to folder 
                    clear - clears terminal window 
                    ls - lists files and folders in current directory
                    mkdir <name> - creates a new directory with specified name in current path
                    touch <name> - creates a new file with specified name in current path
                    nano <file> - opens an editor for the specified file
                    `;
