# Veritact Demo

1. [React 19](https://react.dev)
2. [Vite 7](https://vitejs.dev)
3. [Tailwind CSS v4](https://tailwindcss.com)
4. [Shadcn UI with Base UI](https://ui.shadcn.com)
5. [React Compiler](https://react.dev/learn/react-compiler) - Automatic memoization (no more manual `useMemo` or `useCallback`)
6. [Path Aliases](https://react.dev/learn/importing-files) - Imports using `@/` (eg. `import { Button } from "@/components/ui/button"`)
7. [ESLint](https://eslint.org)

## Tooling

- [TSX TypeScript runtime](https://github.com/privatenumber/ts-runtime-comparison) is used

> Tooling for MacOS/Linux: https://github.com/scoretravel/infra?#tooling

## Development

> [!TIP]
> You need 1password CLI installed to use `.env` file for secret env variables
>
> ```shell
> # Note: If you have multiple 1password accounts, set "OP_ACCOUNT"
> $ op account list --format=json
> $ export OP_ACCOUNT=xxx-yyy-zzz
> 
> # Run a pnpm command after loading env vars via 1password
> # Note: No masking enables logging of sensitive data
> $ op run --env-file=.env --no-masking -- pnpm [command]
> ```

> [!NOTE]
> Check in fixtures using `git lfs`
>
> ```shell
> $ git lfs track "**/fixtures/*.json"
> $ git add "**/fixtures/*.json"
> ```
>
> Check which files are actually tracked by Git LFS `$ git lfs ls-files`
>
> Push all the LFS files to origin `$ git lfs push --all origin`

```shell
# Install dependencies
$ pnpm install

# Start the local server (after loading env vars via 1password)
# No masking enables logging of sensitive data
$ op run --env-file=.env --env-file=.env.local --no-masking -- pnpm run dev
$ op run --env-file=.env --env-file=.env.local --no-masking -- pnpm run dev:no-watch
```

```shell
# Run tests
$ op run --env-file=.env --env-file=.env.local -- pnpm run test
$ op run --env-file=.env --env-file=.env.local --no-masking -- pnpm run test:watch

# To run tests for a specific directory
$ op run --env-file=.env --env-file=.env.local --no-masking -- pnpm run test:watch --dir=src/routes/datalake/vendors/tripadvisor

# Clean test recordings
$ pnpm run clean:recordings
```

```shell
# Run prettier & eslint before committing
$ pnpm run format
$ pnpm run lint
```

```shell
# Updates dependencies
$ pnpm update -i

# Updates all dependencies (ignoring ranges in package.json)
$ pnpm update --latest -i
```

### Adding Components

This template is configured with `components.json`. You can add Shadcn components using the CLI:

```bash
npx shadcn@latest add button
```

or if you have pnpm:

```bash
pnpm dlx shadcn@latest add button
```

### React Compiler

The `babel-plugin-react-compiler` is enabled by default in `vite.config.ts`. You don't need to do anything extra; just write standard React code and let the compiler handle memoization!
