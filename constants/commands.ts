export const fileSystem = [
  { name: "about.txt", type: "file", path: "~", content: "hi im johan" },
  {
    name: "readme.txt",
    type: "file",
    path: "~",
    content: "actually please don't read me",
  },
  {
    name: "welcome.sh",
    type: "executeable",
    path: "~",
    content:
      "echo Welcome to my website. If you are comfortable with the terminal and tmux, please have a look around! If not, write help and press enter.",
  },
  { name: "fun-things", type: "folder", path: "~" },
  { name: "another.txt", type: "file", path: "~/fun-things/" },
];
