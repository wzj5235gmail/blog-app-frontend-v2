import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import PostCardSimple from './PostCardSimple';

const Bookmarks = ({ currentUser }) => {
  const bookmarks = currentUser.savedPosts || [];

  return (
    <Box my='1rem'>
      {bookmarks.length === 0 ? (
        <Text>No bookmarks</Text>
      ) : (
        <Box>
          {bookmarks.length > 0 && bookmarks.map(post => {
            return <PostCardSimple key={post._id} {...post} />
          })}
        </Box>
      )}
    </Box>
  );
};

export default Bookmarks;
