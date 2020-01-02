# Project Setup

## Installing Dependencies

The package manager of choice for this project is [yarn](https://yarnpkg.com/lang/en/). In order to install dependencies for the client and server, run the following command from the root of the repo

```
$ yarn setup:local
```

**_Note_**:
 You can also use [npm](https://www.npmjs.com/) as your package manager, in which case you could just run `npm run setup:local.` The instructions in this documentation will use yarn commands, and while they are usually interchangeable, consult this [guide](https://yarnpkg.com/lang/en/docs/migrating-from-npm/) if you are adamant about using npm.

Start the app with the start script. This will start both the client and the server simultaneously. The client runs on `localhost:3000` while the server runs on `localhost:3001`. Subsequent services will use the proper ports.

```bash
$ yarn start
```

