# rm.js

[![Latest version](https://img.shields.io/npm/v/@unixcompat/rm.js)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/@unixcompat/rm.js)
](https://www.npmjs.com/package/@unixcompat/rm.js)
[![Coverage](https://codecov.io/gh/prantlf/rm.js/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/rm.js)

Removes files and directories like the `rm` command.

There are multi-platform file-system commands compatible with `rm` from UN*X implemented for Node.js in JavaScript, like [rimraf], [del-cli] or [del], but they have a different interface and a different behaviour than the `rm` command. Instead of reusing the knowledge of the `rm` command, you would have to learn their new interface. This project aims to provide the well-known interface of the `rm` command.

This package offers only command-line interface, because programmatic interface is provided by [`rm`] and [`rmdir`] from [node:fs]. See also other commands compatible with their counterparts from UN*X - [cat.js], [cp.js] and [mkdir.js].

## Synopsis

The following scripts from `package.json` won't work on Windows:

    rm -rf dist
    mkdir -p dist
    cat src/umd-prolog.txt src/code.js src/umd-epilog.txt > dist/index.umd.js
    cp src/index.d.ts dist

Replace them with the following ones, which run on any operating system which is supported by Node.js:

    rm.js -rf dist
    mkdir.js -p dist
    cat.js src/umd-prolog.txt src/code.js src/umd-epilog.txt > dist/index.umd.js
    cp.js src/index.d.ts dist

Notice that the only difference is the suffix `.js` behind the command names.

## Installation

This module can be installed in your project using [NPM], [PNPM] or [Yarn]. Make sure, that you use [Node.js] version 14.18 or newer.

```sh
$ npm i -D @unixcompat/rm.js
$ pnpm i -D @unixcompat/rm.js
$ yarn add -D @unixcompat/rm.js
```

## Command-line Interface

See also `man rm` for the original [POSIX documentation] or for the extended [Linux implementation].

    Usage: rm.js [-Ddfrv] [--] dir...

    Options:
      -c|--cwd <dir>  directory to start looking for the source patterns
      -D|--dry-run    only print path of each file or directory
      -d|--dir        remove files and empty directories as well
      -f|--force      ignore non-existent files and directories
      -R|--recursive  remove files and directories recursively
      -r              the same as -R
      -v|--verbose    print path of each removed file or directory
      -V|--version    print version number
      -h|--help       print usage instructions

    Examples:
      $ rm.js a
      $ rm.js -fr /tmp/a

## Differences

The following options are specific to this command:

    -c|--cwd <dir>  directory to start looking for the source patterns
    -D|--dry-run    only print path of each file or directory

Also, the arguments may be [BASH patterns]. The pattern matching will ignore symbolic links.

The following options from the POSIX version are not supported:

    -i    write a prompt to the standard error before copying
          a file that would overwrite an existing file

The following options from the Linux version are not supported:

    -I    prompt once before removing more than three files, or when removing
          recursively
    --interactive[=WHEN]
          prompt according to WHEN: never, once (-I), or always (-i);
          without WHEN, prompt always
    --one-file-system
          when removing a hierarchy recursively, skip any directory that is
          on a file system different from that of the corresponding command
          line argument
    --no-preserve-root 
          do not treat '/' specially
    --preserve-root[=all]
          do not remove '/' (default); with 'all', reject any command line
          argument on a separate device from its parent

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
[POSIX documentation]: https://man7.org/linux/man-pages/man1/rm.1p.html
[Linux implementation]: https://man7.org/linux/man-pages/man1/rm.1.html
[`rm`]: https://nodejs.org/api/fs.html#fsrmpath-options-callback
[`rmdir`]: https://nodejs.org/api/fs.html#fsrmdirpath-options-callback
[node:fs]: https://nodejs.org/api/fs.html
[BASH patterns]: https://www.linuxjournal.com/content/pattern-matching-bash
