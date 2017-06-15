# mockument

A node utility for [Jest](https://github.com/facebook/jest) to create a mocked `document.body` from a local HTML file.

Jest provides a mocked `document` object in your tests, but `document.body` is empty. You could do `document.body.innerHTML = '<div id="app"/>'` in your `beforeEach` hook, but if you need much more HTML than that it can be annoying to write or read it as a JS string. `mockument` allows you to use an HTML file instead.

Pass the `mockument` function the **absolute** path to an HTML file from which you want to generate a `document.body` object. `mockument` will modify Jest's `document` object and set its `document.body` to the one generated from the `<body>` of the HTML file.

Usage example:
```js
import mockument from 'mockument'

describe('something', () => {

  beforeEach(() => {
    mockument(`${__dirname}/../../public/index.html`)
  })
})
```

Note: `mockument` uses and modifies Jest's `document` object, so it will only work if used somewhere where Jest provides it's mock `document` object in scope. It won't be able to find the `document` object if used in other nodejs contexts. (And it won't be able to find node's 'fs' module if used in the browser either!)
