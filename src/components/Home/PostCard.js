import React from "react"
import { Link, Heading, Text, Image, Stack, Divider, Flex, Center, HStack, Box, VStack, LinkBox, LinkOverlay } from "@chakra-ui/react"
import DOMPurify from "dompurify"
import TopicTag from "../PostDetail/TopicTag"

export default function PostCard({ _id, author, publishDate, coverImage, title, content, tags }) {
  let displayDate = new Date(publishDate).toLocaleDateString()
  function extractContent(s) {
    var span = document.createElement("span")
    span.innerHTML = s
    return span.textContent || span.innerText
  }
  const extract = extractContent(content)

  return (
    <>
      <LinkBox>
        <Flex
          align="center"
          justify="space-between"
        >
          <Flex
            direction="column"
            py={5}
            gap="1rem"
            maxW={["90vw", null, null, null, "lg"]}
          >
            <HStack spacing={4} align="center">
              {author && (
                <Link href={`/authors/${author._id}`}>
                  <HStack spacing={4} align="center">
                    <Image borderRadius="full" boxSize={8} src={author.avatar} alt="Author Profile image" fit="cover" />
                    <Text fontWeight="medium">{author.name}</Text>
                  </HStack>
                </Link>
              )}
              <Text color="gray.500">{displayDate}</Text>
            </HStack>
            <Heading fontSize={["lg", null, null, "xl"]} >
              <LinkOverlay href={`/posts/${_id}`}>
                {title}
              </LinkOverlay>
            </Heading>
            <Box
              className="post-card-extract"
            >
              <Text
                noOfLines={3}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(extract)
                }}
              />
            </Box>
            <Box
              className="post-card-tags"
            >
              <HStack>
                {tags && tags.map((tag, index) =>
                  index < 3 && <TopicTag key={tag._id} {...tag} />
                )}
              </HStack>
            </Box>
          </Flex>
          <Center mx="1rem" maxW={200} maxH={150} style={{ overflow: 'hidden' }}>
            <Image className="post-card-image" src={coverImage} fit="cover" />
          </Center>
        </Flex>
        <Divider />
      </LinkBox>
    </>

  )
}