import {
  Flex,
  Heading,
  Tag,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import MyBreadCrumb from "../components/MyBreadCrumb";
import AuthorIntro from "../components/AuthorIntro";
import PostMeta from "../components/PostMeta"
import { useEffect, useRef, useState } from "react";
import * as DOMPurify from 'dompurify';
import { deletePostById, getAllCommentsOfPost, getPostById, updatePostById } from "../apis/Apis";
import { useParams } from "react-router-dom";
import CommentCard from "../components/CommentCard";
import CommentInput from "../components/CommentInput";
import isAuthenticated from "../isAuthenticated";
import TopicTag from "../components/TopicTag";

export default function PostDetail() {
  const [comments, setComments] = useState([])
  const [post, setPost] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const { postId } = useParams()
  const [isAuthor, setIsAuthor] = useState(false)
  const [currentUser, setCurrentUser] = useState({})



  const breadcrumb = [
    {
      id: 1,
      path: '/',
      name: 'Home',
      isCurrentPage: false,
    },
    {
      id: 2,
      path: '/blog',
      name: 'Blog',
      isCurrentPage: false,
    },
    {
      id: 3,
      path: '/blog',
      name: post.title,
      isCurrentPage: true,
    },
  ]

  useEffect(() => {
    const getPost = async () => {
      const post = await getPostById(postId)
      setPost(post.data)
    }
    const getComments = async () => {
      const comments = await getAllCommentsOfPost(postId)
      setComments(comments.data.data)
    }
    getPost()
    getComments()
  }, [postId])

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
  }, [])

  useEffect(() => {
    setIsAuthor(currentUser && post && post.author && currentUser._id === post.author._id)
  }, [currentUser, post])

  return (
    <>
      <MyBreadCrumb breadcrumb={breadcrumb} />
      <Flex direction='column' maxW={['xs', 'sm', 'md', 'lg', 'xl', '2xl']} mx='auto' gap='3rem' mb='5rem'>
        {isAuthor &&
          <Flex justify='end' gap='1rem'>
            <Button colorScheme="red" size='sm' onClick={async () => {
              const res = await deletePostById(post._id)
              window.location.pathname = '/'
            }}>Delete</Button>
            <Button colorScheme="blue" size='sm' onClick={() => window.location.pathname = `/edit/${post._id}`} >Update</Button>
            {post.status === 'draft' && <Button colorScheme="green" size='sm' onClick={async () => {
              const res = await updatePostById(post._id, { status: 'published' })
              if (res.success) {
                setPost(res.data)
              }
            }} >Publish</Button>}
          </Flex>
        }
        <HStack gap='1rem'>
          <Heading>{post.title}</Heading>
          {post.status === 'draft' && <Tag minW='3rem'>Draft</Tag>}
        </HStack>
        {post.author && <AuthorIntro {...post.author} />}
        <PostMeta post={post} btnRef={btnRef} onOpen={onOpen} setPost={setPost} commentsCount={comments.length} postId={postId} />
        <div className="post-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
        <Flex gap='1rem'>
          {post.tags && post.tags.map(tag => <TopicTag key={tag._id} {...tag} />)}
        </Flex>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Comments</DrawerHeader>

          <DrawerBody>
            {isAuthenticated() &&
              <CommentInput
                postId={postId}
                setComments={setComments}
                currentUser={currentUser}
                notShowCancel={true}
              />}
            {comments.length > 0
              ? comments
                .filter(comment => !comment.parentCommentId)
                .map(comment =>
                  <CommentCard
                    key={comment._id}
                    postId={post._id}
                    comment={comment}
                    comments={comments.filter(i => i.parentCommentId)}
                    setComments={setComments}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />)
              : <Text textAlign='center' my='2rem'>No comment</Text>
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </>
  )
}