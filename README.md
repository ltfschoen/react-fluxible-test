# Run

* Run Webpack development server and open
```
npm run dev
open http://localhost:3000
```

# Test

* Run tests
```
npm run test:watch
```

# Debug

* Update webpack.config.js with `devtool: 'source-map'` for browser debugging with breakpoints

# TODO

* [ ] Fix failing tests
* [ ] Write test to access Plugin state value of 'foo' and try and retrieve from Actions and Stores with 
`context.getActionContext().getFoo()`, `context.getStoreContext().getFoo()`, and/or `context.getComponentContext().getFoo()`
as described [here](http://fluxible.io/api/plugins.html)
