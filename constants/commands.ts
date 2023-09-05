export enum FileType {
    FILE,
    FOLDER,
    EXECUTEABLE,
}

export const fileSystem = [
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
        content:
            'echo "Welcome to my website. If you are comfortable with the terminal and tmux, please have a look around! If not, write help and press enter."',
    },
    { name: "fun-things", type: FileType.FOLDER, path: "~" },
    { name: "another.txt", type: FileType.FILE, path: "~/fun-things", content: "Another one" },
];
