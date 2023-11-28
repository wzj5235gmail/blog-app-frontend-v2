import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <footer className='footer'>
      <Flex
        justify='center'
        gap='1rem'
        fontSize='sm'
        color='gray.500'
        py='2rem'
        bgColor='gray.100'
        mt='5rem'
      >
        <Link href='/'>Home</Link>
        <Link href='/blog'>Blog</Link>
        <Link href='/about'>About</Link>
      </Flex>
    </footer>
  )
};

export default Footer
