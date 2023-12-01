import { Avatar, Button, Center, Flex, Link, Text } from "@chakra-ui/react"
import useToggle from "../../hooks/useToggle"

export default function AuthorToFollowCard({ _id, avatar, name, bio }) {
  const { toggled, handleToggle } = useToggle("follows", _id)

  return (
    <Flex justify="space-between" gap="1rem">
      <Flex gap="1rem">
        <Link href={`/authors/${_id}`}>
          <Avatar src={avatar} size={["sm", null, null, "md"]} />
        </Link>
        <Flex direction="column">
          <Link href={`/authors/${_id}`}>
            <Text
              fontWeight={600}
              noOfLines={1}
            >{name}</Text>
          </Link>
          <Text
            fontSize={["sm", null, null, "md"]}
            noOfLines={2}
          >{bio}</Text>
        </Flex>
      </Flex>
      <Center>
        {
          toggled ?
            <Button size={["xs", null, null, "sm"]} onClick={handleToggle}>Unfollow</Button> :
            <Button colorScheme="orange" size={["xs", null, null, "sm"]} onClick={handleToggle}>Follow</Button>
        }
      </Center>
    </Flex>
  )
}