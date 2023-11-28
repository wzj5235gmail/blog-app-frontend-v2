import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function FeaturedPostCardSkeleton() {
  return (
    <Box my='1rem'>
      <SkeletonText noOfLines={2} spacing='4' skeletonHeight='2' />
    </Box>

  )
}