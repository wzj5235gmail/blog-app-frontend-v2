import { Box, Divider, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AuthorToFollowCard from './AuthorToFollowCard'

export default function Follows({ currentUser }) {
  // const [userFollows, setUserFollows] = useState([])

  // useEffect(() => {
  //   setUserFollows(JSON.parse(localStorage.getItem('currentUser')).follows)
  // }, [JSON.parse(localStorage.getItem('currentUser')).follows])

  const userFollows = currentUser.follows

  return (
    <Box>
      <VStack my='1rem' gap='1rem'>
        {userFollows.length === 0 ?
          <Text>No follows</Text> :
          userFollows.map(follow =>
            <AuthorToFollowCard key={follow._id} {...follow} />
          )
        }
      </VStack>
    </Box>
  )
}