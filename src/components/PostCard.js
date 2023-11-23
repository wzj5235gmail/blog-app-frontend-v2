import React from 'react'
import { Link, Heading, Text, Image, Stack, Divider, Flex, Center, HStack, Box, VStack } from '@chakra-ui/react'
import DOMPurify from 'dompurify'
import TopicTag from './TopicTag'

export default function PostCard({ _id, author, publishDate, coverImage, title, content, tags }) {
  let displayDate = new Date(publishDate).toLocaleDateString()
  function extractContent(s) {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };
  const extract = extractContent(content)

  return (
    <>
      <Flex
        align='center'
        wrap='wrap'
        justify='space-between'
      >
        <Flex
          direction='column'
          py={5}
          gap='1rem'
          maxW={['sm', 'lg']}
          wrap='wrap'
        >
          <HStack spacing={4} align="center">
            {author && (
              <Link href={`/authors/${author._id}`}>
                <HStack spacing={4} align="center">
                  <Image borderRadius="full" boxSize={8} src={author.avatar} alt="Author Profile image" fit='cover' />
                  <Text as="p" fontWeight="medium">{author.name}</Text>
                </HStack>
              </Link>
            )}
            <Text as="p" color="gray.500">{displayDate}</Text>
          </HStack>
          <Heading fontSize="xl" >
            <Link href={`/posts/${_id}`}>
              {title}
            </Link>
          </Heading>
          <Box
            className='post-card-extract'
          >
            <Text
              noOfLines={3}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(extract)
              }}
            />
          </Box>
          <Box
            className='post-card-tags'
          >
            <HStack>
              {tags && tags.map(tag => <TopicTag key={tag._id} {...tag} />)}
            </HStack>
          </Box>
        </Flex>
        <Center mx='1rem'>
          <Link href={`/posts/${_id}`}>
            <Image className='post-card-image' src={coverImage} maxH={200} maxW={200} fit='cover' />
          </Link>
        </Center>
      </Flex>
      <Divider />
    </>

  )
}