import { Box, Flex, Text, Link, IconButton, Icon } from '@chakra-ui/react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="#FAD773" p={4} className='footer'>
      <Flex justify="space-between" align="center" wrap='wrap'>
        <Text color="black">Your Programmer Blog &copy; 2023</Text>
        <Flex gap={4}>
          <Link href="/about" color="black">
            About
          </Link>
          <Link href="/contact" color="black">
            Contact
          </Link>
          <Link href="/privacy" color="black">
            Privacy Policy
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
