import docgen from 'react-docgen-typescript'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Определяем корень проекта
const projectRoot = path.resolve(__dirname, '..')

// Настройки react-docgen-typescript
const options = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true
}

// Путь к файлу с компонентами
const componentPath = path.join(projectRoot, 'src/components/index.ts')

// Парсим компоненты
let components
try {
  components = docgen
    .withCustomConfig(path.join(projectRoot, 'tsconfig.json'), options)
    .parse([componentPath])

  if (!components.length) {
    console.error('No components found. Check your exports or file paths.')
    process.exit(1)
  }
} catch (error) {
  console.error('Error during component parsing:', error)
  process.exit(1)
}

const docsPath = path.join(projectRoot, 'docs/components')
if (!fs.existsSync(docsPath)) {
  fs.mkdirSync(docsPath, { recursive: true })
}

function generateMDX(component) {
  const { displayName, description, props } = component

  const propsTable = props
    ? Object.entries(props)
        .map(([propName, prop]) => {
          const { type, required, defaultValue, description } = prop
          return `| **${propName}** | \`${type.name}\` | ${
            defaultValue ? `\`${defaultValue.value}\`` : '-'
          } | ${description || '-'} | ${required ? 'Yes' : 'No'} |`
        })
        .join('\n')
    : '| No props available | - | - | - | - |'

  return `---
title: ${displayName}
---

# ${displayName}

${description || 'No description available.'}

## Props

| Name          | Type       | Default     | Description       | Required |
|---------------|------------|-------------|-------------------|----------|
${propsTable}
`
}

components.forEach((component) => {
  try {
    const mdxContent = generateMDX(component)
    const mdxPath = path.join(docsPath, `${component.displayName}.mdx`)

    // Проверьте, не является ли mdxPath директорией
    if (fs.existsSync(mdxPath) && fs.lstatSync(mdxPath).isDirectory()) {
      console.error(`The path ${mdxPath} is a directory, not a file.`)
      return
    }

    fs.writeFileSync(mdxPath, mdxContent, 'utf-8')
    console.log(`Generated MDX for ${component.displayName}`)
  } catch (error) {
    console.error(`Error generating MDX for ${component.displayName}:`, error)
  }
})

console.log('MDX generation complete.')
