import docgen from 'react-docgen-typescript'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true
}

const componentPath = path.join(__dirname, 'src/components/index.ts')
const components = docgen
  .withCustomConfig('./tsconfig.json', options)
  .parse([componentPath])

fs.writeFileSync(
  path.join(__dirname, '../docs', 'components.json'),
  JSON.stringify(components, null, 2)
)
