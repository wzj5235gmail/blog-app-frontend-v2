import { Link, Tag } from "@chakra-ui/react";

export default function TopicTag({ _id, name, size }) {
  return (
    <Link href={`/topics/${_id}`}>
      <Tag
        size={size ? size : 'md'}
        borderRadius='full'
      >
        {name}
      </Tag>
    </Link>
  )
}