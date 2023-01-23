# rm.js

[![Latest version](https://img.shields.io/npm/v/@unixcompat/rm.js)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/@unixcompat/rm.js)
](https://www.npmjs.com/package/@unixcompat/rm.js)
[![Coverage](https://codecov.io/gh/prantlf/mkdir.js/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/mkdir.js)

Removes files and directories like the `rm` command.

There are multi-platform file-system commands compatible with `rm` from UN*X implemented for Node.js in JavaScript, like [rimraf], [del-cli] or [del], but they have a different interface and a different behaviour than the `rm` command. Instead of reusing the knowledge of the `rm` command, you would have to learn their new interface. This project aims to provide the well-known interface of the `rm` command.

See also other commands compatible with their counterparts from UN*X - [cat.js], [cp.js] and [mkdir.js].

## Installation

This module can be installed in your project using [NPM], [PNPM] or [Yarn]. Make sure, that you use [Node.js] version 14.8 or newer.

```sh
$ npm i -D @unixcompat/rm.js
$ pnpm i -D @unixcompat/rm.js
$ yarn add -D @unixcompat/rm.js
```

## Command-line Interface

    Usage: rm.js [-Ddfrv] [--] dir...

    Options:
      -D|--dry-run    only print path of each file or directory
      -d|--directory  deletes a directory only if it is empty
      -f|--force      ignores non-existent files and directories
      -r|--recursive  remove files and directories recursively
      -v|--verbose    print path of each removed file or directory
      -V|--version    print version number
      -h|--help       print usage instructions

    Examples:
      $ rm.js a
      $ rm.js -fr /tmp/a

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using `npm test`.

## License

Copyright (c) 2022-2023 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[PNPM]: https://pnpm.io/
[Yarn]: https://yarnpkg.com/
[rimraf]: https://www.npmjs.com/package/rimraf
[del-cli]: https://www.npmjs.com/package/del-cli
[del]: https://www.npmjs.com/package/del
[cat.js]: https://www.npmjs.com/package/@unixcompat/cat.js
[cp.js]: https://www.npmjs.com/package/@unixcompat/cp.js
[mkdir.js]: https://www.npmjs.com/package/@unixcompat/mkdir.js
