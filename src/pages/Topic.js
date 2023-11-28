import { Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getFilteredPosts, getTagById } from "../apis/Apis";
import { useParams } from "react-router-dom";
import PostCard from "../components/Home/PostCard";
import useInterest from "../hooks/useInterest";

export default function Topic() {
  const { tagId } = useParams()
  const [tag, setTag] = useState({
    name: ''
  })
  const [tagPosts, setTagPosts] = useState([])
  const { followed, handleFollow } = useInterest(tagId)


  useEffect(() => {
    const getTag = async () => {
      const tagData = await getTagById(tagId)
      setTag(tagData.data)
    }
    const getTagPosts = async () => {
      const userPostsData = await await getFilteredPosts('limit=100&tags=' + tagId)
      setTagPosts(userPostsData.data.data)
    }
    getTag()
    getTagPosts()
  }, [])


  return (
    <>
      <VStack my='5rem' gap='2rem'>
        <Heading>{tag.name}</Heading>
        {followed ?
          <Button onClick={handleFollow}>Unfollow</Button> :
          <Button onClick={handleFollow} colorScheme="orange">Follow</Button>
        }
        <Flex direction='column' mb='5rem' mx='2rem'>
          {tagPosts.length > 0 && tagPosts.map(post => {
            return <PostCard key={post._id} {...post} />
          })}
        </Flex>
      </VStack>
    </>
  )
}