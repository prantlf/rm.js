#!/usr/bin/env node

function help() {
  console.log(`${require('../package.json').description}

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
  $ rm.js -fr /tmp/a`)
}

const { argv } = process
const args = []
let   force = false, directory, recursive = false, verbose, dry

for (let i = 2, l = argv.length; i < l; ++i) {
  const arg = argv[i]
  const match = /^(-|--)(no-)?([a-zA-Z][-a-zA-Z]*)(?:=(.*))?$/.exec(arg)
  if (match) {
    const parseArg = (arg, flag) => {
      switch (arg) {
        case 'D': case 'dry-run':
          dry = flag
          return
        case 'd': case 'directory':
          directory = flag
          return
        case 'f': case 'force':
          force = flag
          return
        case 'r': case 'recursive':
          recursive = flag
          return
        case 'v': case 'verbose':
          verbose = flag
          return
        case 'V': case 'version':
          console.log(require('../package.json').version)
          process.exit(0)
          break
        case 'h': case 'help':
          help()
          process.exit(0)
      }
      console.error(`unknown option: "${arg}"`)
      process.exit(1)
    }
    if (match[1] === '-') {
      const flags = match[3].split('')
      for (const flag of flags) parseArg(flag, true)
    } else {
      parseArg(match[3], match[2] !== 'no-')
    }
    continue
  }
  if (arg === '--') {
    args.push(...argv.slice(i + 1, l))
    break
  }
  args.push(arg)
}

if (!args.length) {
  console.error('missing files or directories to remove')
  process.exit(1)
}

const formatErr = ({ message }) => {
  if (message.startsWith('Path is a directory: rm returned EISDIR (is a directory) ')) {
    message = `EISDIR: ${message.substring(57)} is a directory`
  }
  return message
}

(async () => {
  const { rm, rmdir } = require('fs/promises')

  for (const arg of args) {
    if (verbose) console.log(arg)
    if (dry) continue
    if (directory) {
      try {
        await rmdir(arg)
      } catch (err) {
        if (!force) throw err
      }
    } else {
      await rm(arg, { recursive, force })
    }
  }
})().catch(err => {
  console.error(formatErr(err))
  process.exitCode = 1
})
