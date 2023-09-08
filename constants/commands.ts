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
        commands: [{ command: "cat", result: "hi im johan" }],
    },
    {
        name: "readme.txt",
        type: FileType.FILE,
        path: "~",
        content: "actually please don't read me",
        commands: [{ command: "cat", result: "actually please don't read me" }],
    },
    {
        name: "welcome.sh",
        type: FileType.EXECUTEABLE,
        path: "~",
        commands: [
            { command: "./", result: "Welcome!" },
            { command: "cat", result: "echo Welcome!" },
        ],
    },
    { name: "fun-things", type: FileType.FOLDER, path: "~" },
    { name: "another.txt", type: FileType.FILE, path: "~/fun-things", content: "Another one" },
];
