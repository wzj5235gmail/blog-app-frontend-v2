import { Box, Flex, Heading, ListItem, OrderedList, Text } from "@chakra-ui/react";
import MyBreadCrumb from "../components/MyBreadCrumb";

export default function About() {
  const breadcrumb = [
    {
      id: 1,
      path: '/',
      name: 'Home',
      isCurrentPage: false,
    },
    {
      id: 2,
      path: '/about',
      name: 'About',
      isCurrentPage: true,
    },
  ]

  return (
    <>
      <MyBreadCrumb breadcrumb={breadcrumb} />
      <Flex
        direction='column'
        gap='2rem'
        maxW={['xs', 'sm', 'md', 'lg', 'xl', '2xl']}
        mx='auto'
        mb='5rem'
      >
        <Heading size='xl'>Welcome to Our Blog</Heading>
        <Text fontSize='xl' fontWeight='bold' color='gray.700'>A Programmer's Haven</Text>

        <Box as='section'>
          <Heading size='lg' mb='1rem'>Introduction</Heading>
          <Text color='gray.600'>
            Welcome to our blog, a digital sanctuary crafted exclusively for programmers, tech enthusiasts, and coding aficionados! If you're passionate about the world of programming and software development, you've just stumbled upon your new virtual home. In this article, we'll take you on a journey through the diverse and enriching content that our blog has to offer.
          </Text>
        </Box>

        <Box as='section'>
          <Heading size='lg' mb='1rem'>Unveiling a World of Programming Wonders</Heading>
          <Text color='gray.600' pb='1rem'>
            Our blog is more than just a collection of articles; it's a treasure trove of knowledge, insights, and experiences waiting to be discovered. Here's a glimpse of what you can expect:
          </Text>
          <OrderedList spacing='1rem' pl='1rem' color='gray.600'>
            <ListItem>Programming Languages: Dive deep into popular languages like Python, JavaScript, Java, C++, and many more. Explore their intricacies, best practices, and tips to master them.</ListItem>
            <ListItem>Web Development: Stay updated with the latest trends in web development, including frontend and backend technologies, web frameworks, and responsive design.</ListItem>
            <ListItem>Software Engineering: Learn about software architecture, design patterns, and methodologies that can help you build robust and scalable applications.</ListItem>
            <ListItem>Data Science and Machine Learning: Get your hands dirty with data analysis, machine learning, artificial intelligence, and explore how they're shaping the future.</ListItem>
            <ListItem>DevOps and Infrastructure: Discover the world of DevOps, containerization, cloud computing, and tools that streamline development and deployment processes.</ListItem >
            <ListItem>Coding Challenges: Sharpen your skills by tackling coding challenges and puzzles, and learn how to approach complex problems with elegant solutions.</ListItem >
        </OrderedList>
      </Box>

      <Box as='section'>
        <Heading size='lg' mb='1rem'>Navigating the Blog</Heading>
        <Text color='gray.600'>
          Exploring our blog is a breeze. Use our user-friendly interface to search for topics of interest, browse through categories, or use tags to filter content. We also encourage you to subscribe to our newsletter to receive regular updates, featured articles, and exclusive content directly in your inbox.
        </Text>
      </Box>

      <Box as='section'>
        <Heading size='lg' mb='1rem'>Community Engagement</Heading>
        <Text color='gray.600'>
          At our blog, we value the sense of community. Connect with fellow programmers through comments, share your insights, and join the discussion. We believe that the collective wisdom of the community enhances the learning experience for all.
        </Text>
        <Text color='gray.600'>
          Our blog is your ultimate destination for all things programming. Whether you're looking to expand your knowledge, enhance your coding skills, or simply stay informed about the ever-evolving tech landscape, we've got your back. Join us on this exciting journey and immerse yourself in the world of programming wonders. Happy coding!
        </Text>
      </Box>
      </Flex >
      
    </>
  )
}
