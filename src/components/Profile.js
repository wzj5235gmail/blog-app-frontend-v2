import { Avatar, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getFilteredPosts, getUserById } from "../apis/Apis";
import PostCard from "./PostCard";
import useFollow from "../hooks/useFollow";

export default function Profile({ userId }) {
  const [user, setUser] = useState({
    avatar: '',
    name: '',
    bio: ''
  })
  const [userPosts, setUserPosts] = useState([])
  const { followed, handleFollow } = useFollow(userId)


  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        const userData = await getUserById(userId)
        setUser(userData.data)
      }
      const getUserPosts = async () => {
        const userPostsData = await getFilteredPosts('limit=100&author=' + userId)
        setUserPosts(userPostsData.data.data)
      }
      getUser()
      getUserPosts()
    }
  }, [userId])


  return (
    <>
      <VStack my='5rem' gap='2rem'>
        <Avatar size='2xl' src={user ? user.avatar : ''} />
        <Heading>{user ? user.name : ''}</Heading>
        <Text>{user ? user.bio : ''}</Text>
        {followed ?
          <Button onClick={handleFollow}>Unfollow</Button> :
          <Button colorScheme="orange" onClick={handleFollow}>Follow</Button>
        }
        <Flex direction='column' mb='5rem' align='center' mx='2rem'>
          {userPosts.length > 0 && userPosts.map(post => {
            return <PostCard key={post._id}  {...post} />
          })}
        </Flex>
      </VStack>
    </>
  )
}