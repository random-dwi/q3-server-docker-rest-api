# q3-server-docker-rest-api
Quake 3 rest API w/ websocket for interacting with RCON.

### Main Libs

1. Socket.io
2. Babel.js with [ES2015 preset](http://babeljs.io/docs/plugins/preset-es2015/)
3. ESLint
4. node-watch
5. scaffolded from [palanik/node-es6-starter](https://github.com/palanik/node-es6-starter)


### Coding style

Airbnb has an excellent [style guide](https://github.com/airbnb/javascript) for ES6. We will follow the guide and adhere to the recommended coding style.
 
## Quick Start
1. Make sure you have recent, stable version of node (>= 8.1.0).

	```
	nave use stable
	node -v
	```
2. Clone or download this repo.

3. Get latest releases of the tools

	```
	npm update --save
	```

## Commands
### Lint
```
npm run lint
```

### Build
```
npm run build
```

### Run
#### ES6 code via babel
```
npm run dev
```

#### ES5 code (Transpiled)
```
npm run build

node lib/
```
or
```
npm start
```

## Code Directories

./src - source code, stays in git repo.

./lib - transpiled ES5 code, not saved in git, gets published to npm.

## License

  [MIT](LICENSE)
