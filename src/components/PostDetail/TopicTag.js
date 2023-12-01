import { Link, Tag, Text } from "@chakra-ui/react"

export default function TopicTag({ _id, name, size }) {
  return (
    <Link href={`/topics/${_id}`}>
      <Tag
        size={size ? size : "md"}
        borderRadius="full"
        _hover={{ color: "white", bgColor: "black", transitionDuration: "0.2s" }}
      >
        <Text noOfLines={1}>
          {name}
        </Text>
      </Tag>
    </Link>
  )
}