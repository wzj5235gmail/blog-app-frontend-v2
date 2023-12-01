import { Button, Center, Divider, Flex, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getFilteredPosts, getTagById } from "../apis/Apis"
import { useParams } from "react-router-dom"
import PostCard from "../components/Home/PostCard"
import useInterest from "../hooks/useInterest"
import PostCardRec from "../components/PostCardRec"

export default function Topic() {
  const { tagId } = useParams()
  const [tag, setTag] = useState({
    name: ""
  })
  const [tagPosts, setTagPosts] = useState([])
  const { followed, handleFollow } = useInterest(tagId)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)



  useEffect(() => {
    const getTag = async () => {
      const tagData = await getTagById(tagId)
      setTag(tagData.data)
    }
    const getTagPosts = async () => {
      const userPostsData = await await getFilteredPosts("limit=100&tags=" + tagId)
      setTagPosts(userPostsData.data.data)
    }
    getTag()
    getTagPosts()
  }, [])


  return (
    <>
      <VStack my="5rem" gap="2rem">
        <Center>
          <Heading>{tag.name}</Heading>
        </Center>
        {followed ?
          <Button onClick={handleFollow}>Unfollow</Button> :
          <Button onClick={handleFollow} colorScheme="orange">Follow</Button>
        }
        <Divider />
        {tagPosts.length > 0 && !isMobile &&
          <Grid
            templateColumns={['1fr 1fr']}
            gap='1rem'
            mx='2rem'
            mt='2rem'
          >
            {tagPosts.map(post => {
              return <GridItem><PostCardRec key={post._id}  {...post} /></GridItem>
            })}
          </Grid>
        }
        {tagPosts.length > 0 && isMobile &&
          <VStack px='2rem' gap='2rem'>
            {tagPosts.map(post => {
              return <PostCardRec key={post._id}  {...post} />
            })}
          </VStack>
        }
        {tagPosts.length === 0 &&
          <Text>No posts.</Text>
        }
      </VStack>
    </>
  )
}