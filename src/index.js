import {readFileSync} from 'fs'

export default function mockumentBody(path) {
  const htmlFile = readFileSync(path)
  const mockument = document.implementation.createHTMLDocument()
  mockument.documentElement.innerHTML = htmlFile
  return mockument.body
}
