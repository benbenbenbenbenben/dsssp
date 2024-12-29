import type { Preview } from '@storybook/react'
import theme from './theme'

const preview: Preview = {
  parameters: {
    docs: {
      theme
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#FFFFFF' }
      ]
    },
    toolbar: {
      show: false
    },
    html: {
      prettier: {
        tabWidth: 2,
        useTabs: false,
        htmlWhitespaceSensitivity: 'strict'
      },
      highlighter: {
        showLineNumbers: true, // default: false
        wrapLines: true // default: true
      }
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Getting Started',
          'Guides',
          {
            name: 'Foundations',
            children: ['Foundations/Theme', 'Foundations/Icons']
          },
          'Container',
          'Components',
          'Roadmap'
        ]
      }
    }
  }
}

export default preview
