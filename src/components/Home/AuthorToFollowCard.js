import { Avatar, Button, Center, Flex, Link, Text } from "@chakra-ui/react";
import useToggle from "../../hooks/useToggle";

export default function AuthorToFollowCard({ _id, avatar, name, bio }) {
  const { toggled, handleToggle } = useToggle('follows', _id)

  return (
    <Flex justify='space-between' gap='1rem'>
      <Flex gap='1rem'>
        <Link href={`/authors/${_id}`}>
          <Avatar src={avatar} size='md' />
        </Link>
        <Flex direction='column'>
          <Link href={`/authors/${_id}`}>
            <Text fontWeight={600}>{name}</Text>
          </Link>
          <Text>{bio}</Text>
        </Flex>
      </Flex>
      <Center>
        {
          toggled ?
            <Button size='sm' onClick={handleToggle}>Unfollow</Button> :
            <Button colorScheme="orange" size='sm' onClick={handleToggle}>Follow</Button>
        }
      </Center>
    </Flex>
  )
}