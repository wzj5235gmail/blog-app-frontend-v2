import { Avatar, Button, Divider, Flex, Grid, GridItem, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getFilteredPosts, getUserById } from "../apis/Apis"
import PostCardSimple from "../components/Profile/PostCardSimple"
import useFollow from "../hooks/useFollow"
import { useParams } from "react-router-dom"
import PostCardRec from "../components/PostCardRec"

export default function AuthorProfile() {
  const { userId } = useParams()
  const [user, setUser] = useState({
    avatar: "",
    name: "",
    bio: ""
  })
  const [userPosts, setUserPosts] = useState([])
  const { followed, handleFollow } = useFollow(userId)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)


  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        const userData = await getUserById(userId)
        setUser(userData.data)
      }
      const getUserPosts = async () => {
        const userPostsData = await getFilteredPosts("limit=100&author=" + userId)
        setUserPosts(userPostsData.data.data)
      }
      getUser()
      getUserPosts()
    }
  }, [userId])


  return (
    <>
      <VStack my="5rem" gap="1.5rem">
        <Avatar size="2xl" src={user ? user.avatar : ""} />
        <Heading>{user ? user.name : ""}</Heading>
        <Text px="2rem" maxW={['md', null, null, 'lg']} mx='2rem'>{user ? user.bio : ""}</Text>
        {followed ?
          <Button onClick={handleFollow}>Unfollow</Button> :
          <Button colorScheme="orange" onClick={handleFollow}>Follow</Button>
        }
        <Divider />
        {userPosts.length > 0 && !isMobile &&
          <Grid
            templateColumns={['1fr 1fr']}
            gap='1rem'
            mx='2rem'
            maxW={["2xl"]}
            mt='2rem'
          >
            {userPosts.map(post => {
              return <GridItem><PostCardRec key={post._id}  {...post} /></GridItem>
            })}
          </Grid>
        }
        {userPosts.length > 0 && isMobile &&
          <VStack px='2rem' gap='2rem'>
            {userPosts.map(post => {
              return <PostCardRec key={post._id}  {...post} />
            })}
          </VStack>
        }
        {userPosts.length === 0 &&
          <Text>No posts.</Text>
        }
      </VStack>
    </>
  )
}