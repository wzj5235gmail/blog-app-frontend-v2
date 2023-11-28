import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import TopicTag from '../PostDetail/TopicTag';

const Interests = ({ currentUser }) => {
  const userInterests = currentUser.interests || [];

  return (
    <Box my='1rem'>
      {userInterests.length === 0 ?
        <Text>No interests</Text> :
        <HStack gap='1rem' wrap='wrap'>
          {userInterests.map(interest =>
            <TopicTag key={interest._id} {...interest} size='lg' />
          )}
        </HStack>
      }
    </Box>
  );
};

export default Interests;
