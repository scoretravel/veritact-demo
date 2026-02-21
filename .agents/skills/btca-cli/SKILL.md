---
name: btca-cli
description: Invoke this skill when the user says "use btca" or needs to do more detailed research on a specific library
---

1. Check `btca.config.jsonc` for the list of available libraries/resources

2. Ask btca questions about specific libraries/resources

```sh
# Always run from the root of this project
$ btca ask --resource fastify --resource hono --question "How do I integrate Fastify with Hono?"
```
