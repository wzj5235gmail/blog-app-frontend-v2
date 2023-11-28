import { Box, Text } from '@chakra-ui/react';
import PostCardSimple from './PostCardSimple';

export default function UserPosts({ currentUser }) {
  const userPosts = currentUser.posts || []

  return (
    <Box my='1rem'>
      {userPosts.length === 0 ? (
        <Text>No posts</Text>
      ) : (
        <Box>
          {userPosts.length > 0 && userPosts.map(post => {
            return <PostCardSimple key={post._id} {...post} />
          })}
        </Box>
      )}
    </Box>
  );
};