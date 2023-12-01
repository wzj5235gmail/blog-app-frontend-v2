import { Box, Center, Divider, Flex, HStack, Heading, SkeletonText, Spinner, Text } from "@chakra-ui/react"
import AuthorToFollowCard from "../components/Home/AuthorToFollowCard"
import { useEffect, useState } from "react"
import { getAllTags, getFeaturedPosts, getFeaturedUsers, getFilteredPosts, getTenTags } from "../apis/Apis"
import TopicTag from "../components/PostDetail/TopicTag"
import InfiniteScroll from "react-infinite-scroll-component"
import FeaturedPostCardSkeleton from "../components/Home/FeaturedPostCardSkeleton"
import PostCard from "../components/Home/PostCard"
import FeaturedCard from "../components/Home/FeaturedCard"
import { FaAngleDown } from "react-icons/fa"


const Home = () => {

  const [posts, setPosts] = useState([])
  const [featured, setFeatured] = useState([])
  const [tags, setTags] = useState([])
  const [authors, setAuthors] = useState([])
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [loading, setLoading] = useState(false)

  function getRandomElement(arr) {
    if (arr.length === 0) {
      return undefined
    }
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  }

  useEffect(() => {
    const retrieveData = async () => {
      const postData = await getFilteredPosts("status=published")
      setPosts(postData?.data?.data)
      const featuredData = await getFeaturedPosts()
      const featuredPosts = []
      const featuredUserPool = featuredData?.data?.data
      while (featuredPosts.length < 3) {
        featuredPosts.push(featuredUserPool.splice([Math.floor(Math.random() * featuredUserPool.length)], 1)[0])
      }
      setFeatured(featuredPosts)
      const tagData = await getAllTags()
      const tags = []
      const tagPool = tagData?.data?.data
      while (tags.length < 6) {
        tags.push(tagPool.splice([Math.floor(Math.random() * tagPool.length)], 1)[0])
      }
      setTags(tags)
      const authorData = await getFeaturedUsers()
      const authors = []
      const authorPool = authorData?.data?.data
      while (authors.length < 3) {
        authors.push(authorPool.splice([Math.floor(Math.random() * authorPool.length)], 1)[0])
      }
      setAuthors(authors)
    }
    retrieveData()
  }, [])


  const fetchData = async () => {
    setLoading(true)
    const res = await getFilteredPosts(`status=published&page=${page}`)
    if (res.success) {
      setLoading(false)
      setPosts(prev => [...prev, ...res.data.data])
      setPage(prev => prev + 1)
      setHasMore(res.data.has_more)
    } else {
      setLoading(false)
      console.log("Failed to fetch data: " + res.message)
    }
  }

  return (
    <>
      <Flex
        justifyContent={["start", null, null, "space-evenly"]}
        maxW={["3xl", null, null, "8xl"]}
        px="2rem"
        mx="auto"
        gap="4rem"
        direction={isMobile ? "column" : "row"}
      >

        {/* Latest Posts */}

        <Flex
          className="home-left latest-posts"
          direction="column"
          gap="1rem"
          mt="2rem"
        >
          <Heading className="title" size="xl">Lastest Posts</Heading>
          {posts && posts.length > 0 ?
            isMobile ? (
              <>
                {posts.map(i => <PostCard key={i.id} {...i} />)}
                {hasMore ? (
                  <Center
                    className="pointer"
                    onClick={fetchData}
                    mt="1rem"
                  >
                    {loading ?
                      <Spinner /> :
                      <HStack mt='1rem' color="gray.500">
                        <FaAngleDown />
                        <Text>Load more...</Text>
                      </HStack>
                    }
                  </Center>
                ) : (
                  <Center color="grey" mt="1rem">End of posts</Center>
                )}
              </>
            ) : (
              <InfiniteScroll
                dataLength={posts.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<Center my="1rem"><Spinner /></Center>}
                endMessage={
                  <Center color="grey" my="1rem">End of posts</Center>
                }
              >
                {posts.map(i => <PostCard key={i.id} {...i} />)}
              </InfiniteScroll>
            ) : (
              <>
                <Box w={["90vw", null, null, null, "3xl"]} my="2rem">
                  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
                </Box>
              </>
            )}
        </Flex>

        <Flex
          className="home-right"
          direction="column"
        >
          {/* Featured Posts */}

          {isMobile && <Divider />}
          <Flex
            className="featured-posts"
            direction="column"
            gap="1.5rem"
            my="2rem"
            mx={[0, null, null, "auto"]}
            px="1rem"
            maxW={["100%", null, null, "sm"]}
          >
            <Heading
              className="title"
              size="md"
            >Featured Posts</Heading>
            {featured && featured.length > 0 ? featured.map(i => <FeaturedCard key={i._id} {...i} />) : (
              <Box w="100%">
                <FeaturedPostCardSkeleton />
                <FeaturedPostCardSkeleton />
                <FeaturedPostCardSkeleton />
              </Box>
            )}
          </Flex>

          <Divider />

          {/* Recommended Topics */}

          <Flex
            className="recommended-topics"
            direction="column"
            gap="1rem"
            my="2rem"
            mx={[0, null, null, "auto"]}
            px="1rem"
            maxW={["100%", null, null, "sm"]}
          >
            <Heading className="title" size="md" mb="1rem">Recommended topics</Heading>
            <HStack wrap="wrap" gap="1rem">
              {tags && tags.length > 0 ? tags.map(tag => <TopicTag key={tag._id} {...tag} />) : (
                <Box w="100%">
                  <SkeletonText noOfLines={3} spacing="4" skeletonHeight="2" />
                </Box>
              )}
            </HStack>

          </Flex>

          <Divider />

          {/* Who to follow */}

          <Flex
            className="who-to-follow"
            direction="column"
            gap="1rem"
            my="2rem"
            mx={[0, null, null, "auto"]}
            px="1rem"
            maxW={["100%", null, null, "sm"]}
          >
            <Heading className="title" size="md" mb="1rem">Who to follow</Heading>
            {authors && authors.length > 0
              ?
              authors.map(i => <AuthorToFollowCard key={i._id} {...i} />)
              :
              (
                <Box w="100%">
                  <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
                </Box>
              )}

          </Flex>

        </Flex>
      </Flex>

    </>
  )
}

export default Home
