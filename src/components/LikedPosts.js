import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import PostCardSimple from './PostCardSimple';

const LikedPosts = ({ currentUser }) => {
  const likedPosts = currentUser.likes || [];

  return (
    <Box my='1rem'>
      {likedPosts.length === 0 ? (
        <Text>No liked posts available</Text>
      ) : (
        <Box>
          {likedPosts.length > 0 && likedPosts.map(post => <PostCardSimple key={post._id} {...post} />)}
        </Box>
      )}
    </Box>
  );
};

export default LikedPosts;
