import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `Arial, Helvetica, sans-serif;`,
    body: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;`,
  },
  components: {
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
    PostCard: {
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
})

export default theme