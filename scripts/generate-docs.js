import docgen from 'react-docgen-typescript'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const componentPath = path.join(projectRoot, 'src/components/index.ts')
const docsPath = path.join(projectRoot, 'docs/components.json')

const options = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true
}

const components = docgen
  .withCustomConfig(path.join(projectRoot, 'tsconfig.json'), options)
  .parse([componentPath])

fs.writeFileSync(docsPath, JSON.stringify(components, null, 2))
