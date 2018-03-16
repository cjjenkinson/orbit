# React Boilerplate 2018

A lightweight starter boilerplate used to bootstrap React applications using functional CSS (CSS Next) features.

Uses Babel, Webpack and configured with [Airbnb](https://github.com/airbnb/javascript/tree/master/react) eslint and prettier out of the box.

File structure:

```md
- dist
  -- index.html
- src
  -- components
  -- containers
     -- App.css
     -- App.js
     -- App.test.js
  -- static
  -- utils
  -- index.js
- .eslintrc
- postcss.config.js
- prettierrc
- package.json
- webpack.config.js
- .env
```
## File Structure

Learn more about [Presentational & Container Components](|https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

- Components: presentational components, recieve data via props and are concerned with presentation only
- Containers: container components, provide data and behaviour and are concerned with how things work
- Static: public image assets, fonts and other related static assets
- Utils: helpers, formatters and a place to store useful tools
- index.js: renders your application from the parent component e.g App

## ESLint & Style Guide (Airbnb)

*The jsx file name extensions rule has been turned off to avoid errors that prevent rendering HTML within React components.

```json
{
  "env": {
      "browser": true,
      "node": true
  },
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
}
```

## Environment Variables

Define your environment variables using .env file.

```shell
touch .env
```

As a starter an API_ENDPOINT variable has been defined in the Webpack config. Adding additional environment variable is as simple as defining the constant name and stringifying the variable in your .env file.

```javascript
new webpack.DefinePlugin({
    API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
    // e.g SERVICE_API_KEY: JSON.stringify(process.env.SERVICE_API_KEY)
}),
```
By defining environment variables inside webpack you'll be able to reference them without defining process.env everytime:

```javascript
fetch(API_ENDPOINT + '/list')
  .then(response => response.json())
  .then(json => console.log(json))
```

## Functional CSS

This boilerplate makes use of functional CSS using CSS Next features and the [basscss library](http://basscss.com/)


