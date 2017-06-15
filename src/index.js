import {readFileSync} from 'fs'

export default function mockument(path) {
  const htmlFile = readFileSync(path)
  const mockument = document.implementation.createHTMLDocument()
  mockument.documentElement.innerHTML = htmlFile
  document.body = mockument.body
}
