import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function PostCardSkeleton() {
  return (
    <Box w='3xl' my='2rem'>
      <SkeletonCircle size='10' />
      <SkeletonText mt='3' noOfLines={3} spacing='4' skeletonHeight='2' />
    </Box>
  )
}