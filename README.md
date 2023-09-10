# johanwulf.github.io

This is my personal website, [wulf.gg](https://wulf.gg), which features a terminal emulator that recreates my own personal terminal experience. You
can find the configuration for my terminal in my [dotfiles repository](https://github.com/johanwulf/dotfiles).

## Installation

```zsh
git clone https://github.com/johanwulf/johanwulf.github.io
cd johanwulf.github.io
yarn
yarn dev
```

## Usage

The terminal emulator allows visitors to navigate the file system, create new files, and edit them. There is also a "hidden" command `rm -rf /*`,
which any UNIX user would know not to run. If this command is run, a local storage item is set, which "disables" the website.

### Commands

| Command | Arguments   | Explanation                              |
| ------- | ----------- | ---------------------------------------- |
| nano    | file        | opens text editor                        |
| touch   | file        | creates a new file                       |
| mkdir   | folder      | creates a new folder                     |
| rm      | -rf /\*     | deletes all files and "breaks" the page  |
| ls      | -a          | lists unhidden files if -a is not passed |
| clear   |             | clears the terminal log                  |
| cd      | .. ~ folder | changes directory                        |
| cat     | file        | outputs content of file                  |
| help    |             | displays available commands              |

## Configuration

Visitors are able to change the background and title bar colors by going to the `.config` folder and editing the `alacritty.json` file

## Features

-   Terminal emulator that recreates my personal terminal experience
-   File system navigation
-   File creation and editing commands
-   Hidden command `rm -rf /*` (run at your own risk!)
-   Color configuration
