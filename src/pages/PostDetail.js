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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import MyBreadCrumb from "../components/MyBreadCrumb";
import AuthorIntro from "../components/PostDetail/AuthorIntro";
import PostMeta from "../components/PostDetail/PostMeta"
import { useEffect, useRef, useState } from "react";
import * as DOMPurify from 'dompurify';
import { deletePostById, getAllCommentsOfPost, getPostById, updatePostById } from "../apis/Apis";
import { Link, useParams } from "react-router-dom";
import CommentCard from "../components/PostDetail/CommentCard";
import CommentInput from "../components/PostDetail/CommentInput";
import isAuthenticated from "../isAuthenticated";
import TopicTag from "../components/PostDetail/TopicTag";
import { BsThreeDots } from "react-icons/bs";


export default function PostDetail() {
  const [comments, setComments] = useState([])
  const [post, setPost] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const { postId } = useParams()
  const [isAuthor, setIsAuthor] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
  const cancelRef = useRef()
  const [isMobile, setIsMobile] = useState(false)

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
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    setIsAuthor(currentUser && post && post.author && currentUser._id === post.author._id)
  }, [currentUser, post])

  const handleDelete = async () => {
    setDeleteLoading(true)
    const res = await deletePostById(post._id)
    onAlertClose()
    if (res.success) {
      window.location.pathname = '/'
    } else {
      console.log(res.message)
    }
  }

  return (
    <>
      {!isMobile && <MyBreadCrumb breadcrumb={breadcrumb} />}
      <Flex
        direction='column'
        maxW={['xs', 'sm', 'md', 'lg', 'xl', '2xl']}
        mx='auto'
        gap='3rem'
        my='5rem'
      >

        <HStack justify='space-between'>
          <HStack gap='1rem'>
            <Heading>{post.title}</Heading>
            {post.status === 'draft' && <Tag minW='3rem'>Draft</Tag>}
          </HStack>
          <>
            {isAuthor &&
              <Popover
              >
                <PopoverTrigger>
                  <span tabIndex={0}>
                    <BsThreeDots
                      className='pointer'
                      size={20}
                    />
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  maxW={75}
                  fontSize='sm'
                  textAlign='center'
                >
                  <PopoverArrow />
                  <PopoverBody>
                    <Text
                      color='red'
                      className="pointer"
                      onClick={onAlertOpen}
                    >Delete</Text>
                  </PopoverBody>
                  <PopoverBody>
                    <Link
                      className="pointer"
                      to={`/edit/${post._id}`}
                    >Update</Link>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            }
          </>
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

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button
                isLoading={deleteLoading}
                colorScheme='red'
                onClick={handleDelete}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>


    </>
  )
}