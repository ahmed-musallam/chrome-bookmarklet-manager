# :bookmark: Chrome Bookmarklet Manager

A chrome extension to edit [bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet) with the [monaco editor](https://microsoft.github.io/monaco-editor/).

![bookmarklet manager demo](docs/bookmarklets-manager.gif)


> A bookmarklet is a bookmark stored in a web browser that contains JavaScript commands that add new features to the browser.


## Install
> pending review on chrome store

- Go to `chrome://extensions/`
- Enable `Developer mode` slider
- Download the latest `.ext` from (releases](https://github.com/ahmed-musallam/chrome-bookmarklet-manager/releases)
- Drag `.ext` file onto chrome to install

## Development

- Clone this repo
- Go to `chrome://extensions/`
- Enable `Developer mode` slider
- Click `Load unpacked`
- Aelect the `ext` folder from the cloned repo
- Run `npm run dev`: will watch source changes and build the Js bundle and put it in the `ext` folder.

