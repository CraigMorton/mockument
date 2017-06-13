# mockument

A node utility for [Jest](https://github.com/facebook/jest) to create a mocked `document.body` from a local HTML file.

Jest provides a mocked `document` object in your tests, but `document.body` is empty. You could do `document.body.innerHTML = '<div id="app"/>'` in your `beforeEach` hook, but if you have much more HTML than that it can be annoying to copy it in as a JS string.

Pass the `mockument` function the mock `document` object that Jest provides, and the **absolute** path to an HTML file you wish to load into the `document.body` object. `mockument` will return the `document.body` object created from the `<body>` of the HTML file.

Usage example:
```js
import mockument from 'mockument'

describe('something', () => {

  beforeEach(() => {
    document.body = mockument(document, `${__dirname}/../../public/index.html`)
  })
})
```

