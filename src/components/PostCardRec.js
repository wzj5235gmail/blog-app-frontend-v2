import { Box, Card, CardBody, CardHeader, Center, Heading, Image, Link, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"
import DOMPurify from "dompurify"

export default function PostCardRec({ _id, title, content, coverImage }) {
  function extractContent(s) {
    var span = document.createElement("span")
    span.innerHTML = s
    return span.textContent || span.innerText
  }
  const extract = extractContent(content)

  return (
    <LinkBox>
      <Card
        maxW={['90vw', null, null, 400]}
      >
        <Center
          w="100%"
          h={200}
          style={{ overflow: 'hidden' }}
          borderRadius='10px 10px 0 0'
        >
          <Image
            src={coverImage}
            objectFit='cover'
            borderRadius='10px 10px 0 0'
          />
        </Center>
        <CardHeader>
          <LinkOverlay href={'/posts/' + _id}>
            <Text
              as="h3"
              fontWeight={600}
              noOfLines={1}
            >
              {title}
            </Text>
          </LinkOverlay>
        </CardHeader>
        <CardBody pt='0'>
          <Text
            noOfLines={5}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(extract)
            }}
          />
        </CardBody>
      </Card>
    </LinkBox>

  )
}
