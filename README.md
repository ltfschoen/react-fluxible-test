# About

Boilerplate Fluxible app (React with server-side rendering) with A-Frame WebVR incorporated. 

# Run

* Run Webpack development server and open
```
npm run dev
```
* Wait until terminal log message `Application listening on port 3001` appears
* Open to the following address in your browser http://localhost:3000
```
open http://localhost:3000
```

* Click the VR menu tab (able to scroll)
* Click and hold the 3D object and drag with mouse to move it
* Click the Goggles icon to enter fullscreen WebVR mode and insert into Google Cardboard or similar equivalent

# Test

* Run tests
```
npm run test:watch
```

# Debug

* Update webpack.config.js with `devtool: 'source-map'` for browser debugging with breakpoints

# TODO

* [X] Add A-Frame WebVR tab with ability to scroll
* [X] Added ES6 Stage-1
* [ ] PostCSS instead of CSS
* [ ] Fix failing tests
* [ ] Write test to access Plugin state value of 'foo' and try and retrieve from Actions and Stores with 
`context.getActionContext().getFoo()`, `context.getStoreContext().getFoo()`, and/or `context.getComponentContext().getFoo()`
as described [here](http://fluxible.io/api/plugins.html)
