# snorepack

### 💤💤💤 the boringest javascript pack tool in the alpha quadrant™ 💤💤💤

hey folks! jimmy womack here...
are you *tired* of javascript pack tools that pretend they're doing *all sorts of magic* 🪄 when all they're really doing is unnecessary bullshit that only 2% of the userbase *needs*? want a pack tool that'll do the bare minimum and be *honest* about it for a change? well do *i* have something for you 👉

snorepack goes where no build tool has gone before—to a 💤restful💤 place where good folk build meaningless npm packages that waste your time... but are honest about it. snorepack promises to put up a snoretastic spinner up for 2h... then merely wrap your javascript modules in an iife & optionally execute the result in the node context. now don't worry folks—good ol' snorey will find all your requires|imports and pack those for ya too! snorepack puts everyone to sleep whether they use esm or commonjs—i guarantee it 💰

![guaranteed baby](https://y.yarn.co/3ca10c82-623f-4ec6-8204-bc1a56dc1caf_text.gif)

## commands for snoretastic development

```sh
git clone git@github.com:jameswomack/snorepack.git && cd snorepack
npm i && npm link # local testing pre-npm publish—npm has banned me from the bldg for building packages like this
snorepack ./example/esm.js --preview-output --snore-duration=10000 # override default 2h snore duration
npm t
npm run lint
```

## previews to dream about

w/ this as an entrypoint

![esm-entrypoint](https://user-images.githubusercontent.com/77849/149054899-0c461442-148d-447a-ba60-96126432ed77.png)

& this as one of its imports

![console-esm](https://user-images.githubusercontent.com/77849/149054898-df5ba065-8513-4c88-9711-39b5ef044ec4.png)

snorepack will start snoring like so

<img width="362" alt="example-snoring" src="https://user-images.githubusercontent.com/77849/149054892-65ade3ac-381b-475b-ad88-1627957fda83.png">

& output the results of the packed project like so

<img width="842" alt="example-output-preview" src="https://user-images.githubusercontent.com/77849/149054896-6378b6f8-d361-48f1-b4d1-c5bc5bf8f79e.png">


## 💤 let's go from boring to snoring everyone! 💤

**after running these cmds, see .snore/* output for results**

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
