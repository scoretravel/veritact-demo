# Veritact Demo

1. [React 19](https://react.dev)
2. [Vite 7](https://vitejs.dev)
3. [Tailwind CSS v4](https://tailwindcss.com)
4. [Shadcn UI with Base UI](https://ui.shadcn.com)
5. [React Compiler](https://react.dev/learn/react-compiler) - Automatic memoization (no more manual `useMemo` or `useCallback`)
6. [Path Aliases](https://react.dev/learn/importing-files) - Imports using `@/` (eg. `import { Button } from "@/components/ui/button"`)
7. [ESLint](https://eslint.org)

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

```shell
# Install dependencies
$ pnpm install

# Start the local server (after loading env vars via 1password)
# No masking enables logging of sensitive data
$ op run --env-file=.env --no-masking -- pnpm run dev
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

Add Shadcn components to `components.json` using the CLI:

```shell
pnpm dlx shadcn@latest add button
```
