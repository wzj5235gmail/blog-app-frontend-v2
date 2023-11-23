import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Playfair Display', Georgia, 'Times New Roman', Times, serif;`,
    // heading: `'Roboto', 'Open Swans', 'Helvetica Neue', Arial, sans-serif;`,
    body: `'Roboto', 'Open Sans', 'Helvetica Neue', Arial, sans-serif;`,
    // body: `Georgia, 'Times New Roman', Times, serif;`,
  },
})

export default theme