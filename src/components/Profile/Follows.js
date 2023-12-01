import { Box, Text, VStack } from "@chakra-ui/react"
import AuthorToFollowCard from "../Home/AuthorToFollowCard"

export default function Follows({ currentUser }) {

  const userFollows = currentUser.follows

  return (
    <Box>
      {userFollows.length === 0 ?
        <Text>No follows</Text> :
        <VStack my="1rem" gap="1rem">
          {userFollows.map(follow => <AuthorToFollowCard key={follow._id} {...follow} />)}
        </VStack>
      }
    </Box>
  )
}