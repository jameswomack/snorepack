# snorepack

💤💤💤

the boringest javascript pack tool in the alpha quadrant™ 

snorepack goes where no person has gone before—to a place where people build meaningless npm packages that waste your time. in this case putting up a spinner for 2h... then merely wrapping your javascript in an iife & optionally executing the result in the node context

## let's go from boring to snoring

**see .snore/* output for results**

converting a commonjs module
```sh
snorepack ./example/cjs.js
```

converting an esm module
```sh
snorepack ./example/esm.js
```

converting a module & auto-executing the result in node
```sh
snorepack ./example/esm.js --preview-output
```

converting a module w/ the default test snore/spinner duration (i.e. reduced from 2h to 5s)
```sh
snorepack ./example/esm.js --snore-duration=test
```

converting a module w/ a specific *other* snore/spinner duration
```sh
snorepack ./example/esm.js --snore-duration=1000
```

print required command format
```sh
snorepack --help
```

## commands for snoretastic development

```sh
npm i && npm link # testing locally, pre-npm publish
npm t
npm run lint
```