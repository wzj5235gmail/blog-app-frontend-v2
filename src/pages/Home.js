import { Box, Button, Divider, Flex, HStack, Heading, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import FeaturedCard from '../components/FeaturedCard';
import AuthorToFollowCard from '../components/AuthorToFollowCard';
import { useEffect, useState } from 'react';
import { getAllPosts, getFeaturedPosts, getFeaturedUsers, getFilteredPosts, getTenTags } from '../apis/Apis';
import TopicTag from '../components/TopicTag';
import isAuthenticated from '../isAuthenticated';

const Home = () => {

  const [posts, setPosts] = useState([])
  const [featured, setFeatured] = useState([])
  const [tags, setTags] = useState([])
  const [authors, setAuthors] = useState([])

  let nextPage = 2

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const retrieveData = async () => {
      const postData = await getAllPosts()
      setPosts(postData.data && postData.data.data)
      const featuredData = await getFeaturedPosts()
      setFeatured(featuredData.data && featuredData.data.data)
      const tagData = await getTenTags()
      setTags(tagData && tagData.data && tagData.data.data)
      const authorData = await getFeaturedUsers()
      setAuthors(authorData.data && authorData.data.data)
    }
    retrieveData()
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  const handleScroll = async () => {
    if (
      window.scrollY + window.innerHeight - document.documentElement.scrollHeight >= -1
    ) {
      const postData = await getFilteredPosts(`page=${nextPage}`)
      if (postData.data.data) {
        setPosts(prev => [...prev, ...postData.data.data])
        nextPage++
      }
    }
  };

  return (
    <>
      <Flex justifyContent='space-evenly' maxW={['3xl', '4xl', '5xl', '8xl']} px='2rem' mx='auto' wrap='wrap' gap='4rem'>

        {/* Latest Posts */}

        <Flex className='home-left latest-posts' direction='column' gap='1rem' mt='2rem' mb='5rem'>
          <Flex justify='space-between' align='center'>
            <Heading className='title' size='xl'>Lastest Posts</Heading>
            {isAuthenticated() && <Button colorScheme='orange' onClick={() => window.location.pathname = '/edit'}>Create your post</Button>}
          </Flex>
          {posts && posts.length > 0 ? posts.map(i => <PostCard key={i.id} {...i} />) : (
            <Box bg='white'>
              <Box bg='white' w='3xl' my='2rem'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='3' />
              </Box>
              <Box bg='white' w='3xl' my='2rem'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='3' />
              </Box>
              <Box bg='white' w='3xl' my='2rem'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='3' />
              </Box>
            </Box>

          )}
        </Flex>

        <Flex className='home-right' direction='column' maxW={['sm']}>

          {/* Featured Posts */}

          <Flex className='featured-posts' direction='column' gap='1.5rem' my='2rem' mx='auto' px='1rem' w='sm'>
            <Heading className='title' size='md'>Featured Posts</Heading>
            {featured && featured.length > 0 ? featured.map(i => <FeaturedCard key={i._id} {...i} />) : (
              <Box bg='white'>
                <Box bg='white' my='1rem'>
                  <SkeletonCircle size='10' />
                  <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='2' />
                </Box>
                <Box bg='white' my='1rem'>
                  <SkeletonCircle size='10' />
                  <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='2' />
                </Box>
              </Box>
            )}


          </Flex>

          <Divider />

          {/* Recommended Topics */}

          <Flex className='recommended-topics' direction='column' gap='1rem' my='2rem' mx='auto' px='1rem' w='sm'>
            <Heading className='title' size='md' mb='1rem'>Recommended topics</Heading>
            <HStack wrap='wrap' gap='1rem'>
              {tags && tags.length > 0 ? tags.map(tag => <TopicTag key={tag._id} {...tag} />) : (
                <Stack>
                  <Skeleton height='20px' />
                  <Skeleton height='20px' />
                  <Skeleton height='20px' />
                </Stack>
              )}
            </HStack>

          </Flex>

          <Divider />

          {/* Who to follow */}

          <Flex className='who-to-follow' direction='column' gap='1rem' my='2rem' mx='auto' px='1rem' w='sm'>
            <Heading className='title' size='md' mb='1rem'>Who to follow</Heading>
            {authors && authors.length > 0 ? authors.map(i => <AuthorToFollowCard key={i._id} {...i} />) : (
              <Box bg='white'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='2' />
              </Box>
            )}

          </Flex>

        </Flex>
      </Flex>

    </>
  );
}

export default Home;
