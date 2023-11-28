import { Divider, Flex, HStack, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegComment, FaRegBookmark, FaRegThumbsUp, FaThumbsUp, FaShareSquare, FaRegEye, FaBookmark } from "react-icons/fa";
import { likePostById, unlikePostById, updateUserListFields } from "../../apis/Apis";
import useToggle from "../../hooks/useToggle";

export default function PostMeta({ post, setPost, btnRef, onOpen, commentsCount, postId }) {

  const [isLiked, setIsLiked] = useState(false)
  const { toggled, handleToggle } = useToggle('savedPosts', postId)
  const [currentUser, setCurrentUser] = useState({})

  const handleLike = async () => {
    if (currentUser) {
      let userData
      let postData
      if (isLiked) {
        userData = await updateUserListFields('likes', 'remove', [post._id])
        postData = await unlikePostById(post._id)
      } else {
        userData = await updateUserListFields('likes', 'add', [post._id])
        postData = await likePostById(post._id)
      }
      localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, likes: userData.data.likes }))
      setCurrentUser(prev => {
        return {
          ...prev,
          likes: userData.data.likes
        }
      })
      setPost(prev => {
        return {
          ...prev,
          likes: postData.data.likes
        }
      })
    } else {
      window.location.pathname = '/login'
    }
  }

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
  }, [])

  useEffect(() => {
    setIsLiked(currentUser && currentUser.likes && currentUser.likes.map(i => i._id).includes(postId))
  }, [currentUser])


  return (
    <Flex direction='column' gap='1rem'>
      <Divider />
      <Flex justify='space-between'>
        <HStack gap='2rem'>
          <HStack>
            <Tooltip label={isLiked ? 'Unlike' : 'Like'}>
              <span onClick={handleLike} className='pointer'>
                {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
              </span>
            </Tooltip>
            <Text>{post.likes}</Text>
          </HStack>
          <HStack>
            <Tooltip label='Comments'>
              <span className='pointer'>
                <FaRegComment ref={btnRef} colorScheme='teal' onClick={onOpen} />
              </span>
            </Tooltip>
            <Text>{commentsCount}</Text>
          </HStack>
          <HStack>
            <Tooltip label='Views'>
              <span>
                <FaRegEye />
              </span>
            </Tooltip>
            <Text>{post.views}</Text>
          </HStack>
        </HStack>
        <HStack gap='2rem'>
          {currentUser && currentUser.savedPosts &&
            <Tooltip label={toggled ? 'Unsave' : 'Save'}>
              <span onClick={handleToggle} className='pointer'>
                {toggled ? <FaBookmark /> : <FaRegBookmark />}
              </span>
            </Tooltip>
          }
          <Tooltip label='Share'>
            <span>
              <FaShareSquare />
            </span>
          </Tooltip>
        </HStack>
      </Flex>
      <Divider />
    </Flex>
  )
}