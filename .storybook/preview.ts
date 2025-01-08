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
          'Demo',
          'Foundations',
          ['Audio Filters', 'Themes', 'Colors', 'Icons'],
          'Container',
          'Components',
          [
            'FrequencyResponseCurve',
            'CompositeCurve',
            'FilterCurve',
            'FilterPoint',
            'FilterGradient',
            'FilterIcon',
            'PointerTracker'
          ],
          'Roadmap'
        ]
      }
    }
  }
}

export default preview
