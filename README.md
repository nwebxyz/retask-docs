# retask-docs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Public documentation for [Retask](https://retask.work) and the Retask CLI, published at https://docs.retask.work.

## Develop

```bash
yarn install
yarn dev         # local dev server
yarn build       # production build into dist/
yarn preview     # preview the production build
```

## CLI command reference

Pages under `src/content/docs/cli/reference/` are **auto-generated** from the CLI's
`retask help-llm` manifest — do not edit them by hand. Regenerate with:

```bash
yarn gen:cli   # requires the `retask` CLI on PATH
```

CI fails if the committed reference is stale; the production build regenerates from
the latest released CLI.

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Released under the [MIT License](LICENSE). Copyright (c) 2026 nweb.
