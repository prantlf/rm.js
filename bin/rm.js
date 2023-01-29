#!/usr/bin/env node

import { readFileSync } from 'fs'
import { rm, rmdir } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

function getPackage() {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  return JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))
}

function help() {
  console.log(`${getPackage().description}

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
  $ rm.js -fr /tmp/a`)
}

const { argv } = process
const args = []
let   force = false, directory, recursive = false, verbose, dry, cwd

function fail(message) {
  console.error(message)
  process.exit(1)
}

for (let i = 2, l = argv.length; i < l; ++i) {
  const arg = argv[i]
  const match = /^(-|--)(no-)?([a-zA-Z][-a-zA-Z]*)(?:=(.*))?$/.exec(arg)
  if (match) {
    const parseArg = (arg, flag) => {
      switch (arg) {
        case 'c': case 'cwd':
          cwd = match[4] || argv[++i]
          return
        case 'D': case 'dry-run':
          dry = flag
          return
        case 'd': case 'dir':
          directory = flag
          return
        case 'f': case 'force':
          force = flag
          return
        case 'R': case 'r': case 'recursive':
          recursive = flag
          return
        case 'v': case 'verbose':
          verbose = flag
          return
        case 'V': case 'version':
          console.log(getPackage().version)
          process.exit(0)
          break
        case 'h': case 'help':
          help()
          process.exit(0)
      }
      fail(`unknown option: "${arg}"`)
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
  help()
  process.exit(1)
}

let arg
const formatMessage = ({ code, message }) => {
  if (code === 'EISDIR' || code === 'ERR_FS_EISDIR') {
    message = `EISDIR: "${arg}" is a directory`
  } else if (code === 'ENOTEMPTY') {
    message = `ENOTEMPTY: "${arg}" is not empty`
  } else if (code === 'ENOENT') {
    message = `ENOENT: "${arg}" does not exist`
  }
  return message
}

try {
  const files = []
  const directories = []
  const patterns = args.filter(src => {
    if (src.includes('*') || src.includes('?')) return true
    files.push(src)
  })
  if (patterns.length) {
    const glob = (await import('fast-glob')).default
    if (verbose) console.log(patterns.join('\n'))
    const paths = await glob(patterns, {
      cwd, extglob: true, dot: true, onlyFiles: false, markDirectories: true,
      followSymbolicLinks: false
    })
    for (let path of paths) {
      if (cwd) path = join(cwd, path)
      if (path.endsWith('/')) directories.push(path.slice(0, -1))
      else files.push(path)
    }
  }

  for (arg of files.concat(directories)) {
    if (verbose) console.log(arg)
    if (dry) continue
    try {
      await rm(arg, { recursive, force })
    } catch (err) {
      if (directory && (err.code === 'EISDIR' || err.code === 'ERR_FS_EISDIR')) {
        await rmdir(arg)
        continue
      }
      throw err
    }
  }
} catch(err) {
  console.error(formatMessage(err))
  process.exitCode = 1
}
