import React from "react"
import { Link, Heading, Text, Avatar, Grid, GridItem } from "@chakra-ui/react"

export default function PostCardSimple({ _id, author, title }) {
  return (
    <Grid
      templateColumns="1fr 2fr 9fr"
      alignItems="center"
      mb="1rem"
      columnGap="1rem"
      fontSize={["xs", null, null, "md"]}
    >
      <GridItem>
        <Link href={`/users/${author._id}`}>
          <Avatar size="sm" src={author.avatar} />
        </Link>
      </GridItem>
      <GridItem>
        <Link href={`/users/${author._id}`}>
          <Text fontWeight="medium" maxW={40}>{author.name}</Text>
        </Link>
      </GridItem>
      <GridItem>
        <Link href={`/posts/${_id}`}>
          <Heading
            fontSize={["sm", null, null, "lg"]}
          >
            {title}
          </Heading>
        </Link>
      </GridItem>
    </Grid>
  )
}