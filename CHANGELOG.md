# [3.0.0](https://github.com/prantlf/rm.js/compare/v2.1.0...v3.0.0) (2023-03-21)


### Bug Fixes

* Rename the bin script to rm-j ([e60f0c0](https://github.com/prantlf/rm.js/commit/e60f0c09e05ffd56e2a7b5d2fe7100d2392f8330))
* Use .mjs extension to enforce the module type ([749ee62](https://github.com/prantlf/rm.js/commit/749ee620f4dedbb7ff05d4bcc40e6b33b5b33786))


### BREAKING CHANGES

* The name of the executable changed from "rm.js" to "rm-j". I'm sorry
for that, but Windows mistake the suffix ".js" to a file extension and try execute it.
NPM creates the original file name too, probably to support Cygwin.

# [2.1.0](https://github.com/prantlf/rm.js/compare/v2.0.0...v2.1.0) (2023-03-04)


### Features

* Add -c|--cwd argument ([8ca555e](https://github.com/prantlf/rm.js/commit/8ca555e699225238283986398fe9947b01993bff))

# [2.0.0](https://github.com/prantlf/rm.js/compare/v1.0.0...v2.0.0) (2023-01-28)


### Bug Fixes

* Fix -d parameter and rename --directory to --dir ([ebc4daa](https://github.com/prantlf/rm.js/commit/ebc4daa029d56692bd44547065f836b6fe6ead71))


### Features

* Support BASH patterns ([8536d65](https://github.com/prantlf/rm.js/commit/8536d657f2221320e56eea17bbf3183d4cacbee1))


### BREAKING CHANGES

* The long argument `directory` was renamed to `dir`. This argument lets empty directories be deleted and from this version on also files.

## 1.0.0

Initial release.
