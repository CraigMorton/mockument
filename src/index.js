import {readFileSync} from 'fs'

export default function mockDoc(pathToHtmlFile) {
  const htmlFile = readFileSync(pathToHtmlFile)
  const htmlDocument = document.implementation.createHTMLDocument();
  htmlDocument.documentElement.innerHTML = htmlFile
  return htmlDocument.body
}
