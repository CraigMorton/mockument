# mockument

A node utility for [Jest](https://github.com/facebook/jest) to create a mocked `document.body` from a local HTML file.

Jest provides a mocked `document` object in your tests, but `document.body` is empty. You could do `document.body.innerHTML = '<div id="app"/>'` in your `beforeEach` hook, but if you have much more HTML than that it can be annoying to copy it in as a JS string.

Pass the `mockument` function the **absolute** path to an HTML file from which you want to generate a `document.body` object. `mockument` will return the `document.body` object created from the `<body>` of the HTML file. You can then assign it to Jest's `document` object.

Usage example:
```js
import mockument from 'mockument'

describe('something', () => {

  beforeEach(() => {
    document.body = mockument(`${__dirname}/../../public/index.html`)
  })
})
```

Note: mockument uses Jest's `document` object internally to create the document from your HTML file, so it will only work if used somewhere where Jest provides it's mock `document` object. It won't be able to find the `document` object if used in other nodejs contexts. (And it won't be able to find node's 'fs' module if used in the browser either!)
