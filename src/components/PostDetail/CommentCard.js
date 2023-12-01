import { Avatar, Flex, HStack, Text, Tooltip } from "@chakra-ui/react"
import CommentInput from "./CommentInput"
import { deleteCommentById, getAllCommentsOfPost, likeCommentById, unlikeCommentById, updateUserListFields } from "../../apis/Apis"
import { useEffect, useState } from "react"
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"


export default function CommentCard({ postId, comment, comments, setComments, currentUser, setCurrentUser, notShowCancel }) {

  const [isShow, setIsShow] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [commentContent, setCommentContent] = useState({ ...comment })

  let createDate = new Date(commentContent.createdAt)
  createDate = createDate.toLocaleDateString()


  const handleReplyClick = () => {
    if (currentUser) {
      setIsShow(!isShow)
    } else {
      window.location.pathname = "/login"
    }
  }

  const handleDelete = async () => {
    const res = await deleteCommentById(commentContent._id)
    if (res.success) {
      const res = await getAllCommentsOfPost(postId)
      setComments(res.data.data)
    }
  }

  const commentInputProps = {
    postId,
    parentCommentId: commentContent._id,
    setIsShow,
  }

  const handleLike = async () => {
    if (currentUser) {
      let userData
      let commentData
      if (isLiked) {
        userData = await updateUserListFields("likedComments", "remove", [commentContent._id])
        commentData = await unlikeCommentById(commentContent._id)
      } else {
        userData = await updateUserListFields("likedComments", "add", [commentContent._id])
        commentData = await likeCommentById(commentContent._id)
      }
      localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, likedComments: userData.data.likedComments }))
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
      setCommentContent(prev => { return { ...prev, likes: commentData.data.likes } })
    } else {
      window.location.pathname = "/login"
    }
  }

  useEffect(() => {
    setIsLiked(currentUser && currentUser.likedComments && currentUser.likedComments.includes(comment._id))
  }, [currentUser])


  return (
    <Flex direction="column" ps="1rem" py="2rem" gap="1rem" fontSize="sm">
      <HStack justify="space-between">
        <HStack>
          <Avatar size="sm" src={commentContent.author.avatar} />
          <Text fontWeight={600}>{commentContent.author.name}</Text>
        </HStack>
        <Text>{createDate}</Text>
      </HStack>
      <Text>{commentContent.content}</Text>
      <Flex justify="space-between">
        <HStack>
          <Tooltip label={isLiked ? "Unlike" : "Like"}>
            <span onClick={handleLike} className="pointer">
              {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
            </span>
          </Tooltip>
          <Text>{commentContent.likes}</Text>
        </HStack>
        <HStack>
          {currentUser && currentUser._id === commentContent.author._id &&
            <Text className="pointer" onClick={handleDelete} color="red">Delete</Text>
          }
          <Text className="pointer" onClick={handleReplyClick}>Reply</Text>
        </HStack>
      </Flex>
      {isShow && (<CommentInput
        {...commentInputProps}
        setComments={setComments}
      />)}
      {comments && comments
        .filter(i => i.parentCommentId === commentContent._id)
        .map(i =>
          <CommentCard
            key={comment._id}
            comments={comments.filter(i => i.parentCommentId !== commentContent._id)}
            comment={i}
            postId={postId}
            setComments={setComments}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />)}
    </Flex>
  )
}