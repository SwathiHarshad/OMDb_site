# OMDB site

Displays films from an
actor supplied by the user with at least paging and sorting options.

This App utilizes:
- [React](https://reactjs.org/)
- [Hooks](https://reactjs.org/docs/hooks-intro.html)

Demo - https://i.imgur.com/O0YEqbe.gif

## Run In Development Mode
You'll need Node & NPM installed on your local development machine.

Run below commands:

```
# install react project dependencies
npm install

# run the app in development mode
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website in the browser.

## Run In Production Mode

Check out `publish` branch which has the production build files.

```
git checkout publish
```

Serve the static files in build folder using below commands:

```
yarn global add serve
serve -s build
```

Open [http://localhost:5000](http://localhost:3000) to view the website in the browser.