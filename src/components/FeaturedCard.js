import { Flex, HStack, Image, Link, Text } from "@chakra-ui/react";

export default function FeaturedCard({ _id, author, title }) {

  return (
    <Flex direction='column' gap='.5rem'>
      <Link href={`/authors/${author._id}`}>
        <HStack>
          <Image src={author.avatar} fit='cover' borderRadius='full' boxSize={6} />
          <Text fontWeight={600} size='xs'>{author.name}</Text>
        </HStack>
      </Link>
      <Link href={`/posts/${_id}`}>
        <Text fontWeight={400}>{title}</Text>
      </Link>
    </Flex>
  )
}