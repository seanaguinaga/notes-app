# Relay Modern Example

[Relay Modern](https://relay.dev/) is a new version of Relay designed from the ground up to be easier to use, more extensible and, most of all, able to improve performance on mobile devices. Relay Modern accomplishes this with static queries and ahead-of-time code generation.

Download schema introspection data from configured Relay endpoint

```bash
npm run schema
# or
yarn schema
```

Run Relay ahead-of-time compilation (should be re-run after any edits to components that query data with Relay)

```bash
npm run relay
# or
yarn relay
```

_In a new terminal_

Run the project

```bash
npm run dev
# or
yarn dev
```

Relay 11: https://github.com/facebook/relay/releases/tag/v11.0.0
Relay Hooks: https://github.com/facebook/relay/issues/3371

_Things to steal from:_

https://danielwoelfel.com/post/1/ssr-with-relay-on-nextjs-how-to-determine-if-data-is-from-the-cache-or-network

_Why styled-components tgz?_

Check out first unreleased feature!

https://github.com/styled-components/styled-components/blob/master/CHANGELOG.md

_Feat. relay-nextjs_

https://github.com/RevereCRE/relay-nextjs
