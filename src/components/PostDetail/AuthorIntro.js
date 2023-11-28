import { Avatar, Button, Flex, HStack, Heading, Image, Link, Text } from "@chakra-ui/react";
import useToggle from "../../hooks/useToggle";

export default function AuthorIntro({ _id, avatar, name, bio }) {
  // const { followed, handleFollow } = useFollow(_id)
  const { toggled, handleToggle } = useToggle('follows', _id)


  return (
    <>
      <Flex gap='1rem'>
        <Link href={`/authors/${_id}`}><Avatar src={avatar} /></Link>
        <Flex direction='column' gap='.2rem'>
          <HStack gap='1rem' >
            <Link href={`/authors/${_id}`}><Heading size='md'>{name}</Heading></Link>
            {
              toggled ?
                <Button size='xs' onClick={handleToggle}>Unfollow</Button> :
                <Button colorScheme="orange" size='xs' onClick={handleToggle}>Follow</Button>
            }
          </HStack>
          <Text>{bio}</Text>
        </Flex>
      </Flex>
    </>
  )
}