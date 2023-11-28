import React from 'react'
import { Link, Heading, Text, Divider, HStack, Avatar, Box, Grid, GridItem } from '@chakra-ui/react'

export default function PostCardSimple({ _id, author, title }) {
  return (
    <Grid
      templateColumns='1fr 4fr'
      alignItems='center'
      mb='1rem'
    >
      <GridItem>
        <HStack
          gap='1rem'
        >
          <Avatar src={author.avatar} />
          <Text fontWeight="medium" w={40}>{author.name}</Text>
        </HStack>
      </GridItem>
      <GridItem>
        <Heading fontSize="xl" >
          <Link href={`/posts/${_id}`}>
            {title}
          </Link>
        </Heading>
      </GridItem>
    </Grid>
    // <HStack
    //   my='1rem'
    //   px='1rem'
    //   wrap='wrap'
    //   gap='1rem'
    //   justify='left'
    // >
    //   <Link href={`/authors/${author._id}`}>
    //     <HStack
    //       gap='1rem'
    //     >
    //       <Avatar src={author.avatar} />
    //       <Text fontWeight="medium" w={40}>{author.name}</Text>
    //     </HStack>
    //   </Link>
    //   <Heading fontSize="xl" >
    //     <Link href={`/posts/${_id}`}>
    //       {title}
    //     </Link>
    //   </Heading>
    //   <Divider />
    // </HStack>
  )
}