import { Card, CardBody, Text, Textarea, Flex, Avatar, Button, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { createComment } from '../apis/Apis'


export default function CommentInput({ postId, parentCommentId, setIsShow, setComments, currentUser, notShowCancel }) {
  const [content, setContent] = useState('')

  const avatar = currentUser ? currentUser.avatar : ''
  const name = currentUser ? currentUser.name : ''

  const handleRespond = async () => {
    const data = {
      postId,
      content,
      parentCommentId
    }
    const res = await createComment(data)
    if (res.success) {
      setComments(prev => [...prev, res.data])
      setIsShow && setIsShow(false)
      setContent('')
    } else {
      alert(res.message)
    }
  }

  return (
    <Card>
      <CardBody>
        <Flex direction='column' gap='1rem'>
          <HStack gap='1rem'>
            <Avatar size='sm' src={avatar} />
            <Text>{name}</Text>
          </HStack>
          <Textarea value={content} onChange={e => setContent(e.target.value)}>{content}</Textarea>
          <Flex justify='end' gap='1rem'>
            {!notShowCancel && <Button size='sm' onClick={() => setIsShow(false)}>Cancel</Button>}
            <Button colorScheme='yellow' size='sm' onClick={handleRespond}>Respond</Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}