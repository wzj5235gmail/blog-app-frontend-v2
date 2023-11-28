import { Button, Divider, Flex, HStack, Heading, Input } from "@chakra-ui/react"
import MyBreadCrumb from "../components/MyBreadCrumb"
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import Select from 'react-select'
import { createCategory, createNewPost, createTag, getAllCategories, getAllTags, getPostById, updatePostById } from "../apis/Apis"
import { useParams } from "react-router-dom"


export default function PostEdit() {

  const [selectedCategory, setSelectedCategory] = useState({ value: '', label: '' })
  const [selectedTags, setSelectedTags] = useState([])
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [newTag, setNewTag] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [title, setTitle] = useState('')
  const editorRef = useRef(null)
  const [content, setContent] = useState('')
  const { postId } = useParams()
  const [isUpdate, setIsUpdate] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [draftLoading, setDraftLoading] = useState(false)

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        const res = await getPostById(postId)
        if (res.success) {
          setIsUpdate(true)
          const post = res.data
          setTitle(post.title)
          setContent(post.content)
          setSelectedCategory({ value: post.category._id, label: post.category.name })
          setSelectedTags(post.tags.map(tag => {
            return {
              value: tag._id,
              label: tag.name
            }
          }))
        }
      }
      getPost()
    }

    const getCategories = async () => {
      const res = await getAllCategories()
      setCategories(res.data.data.map(item => {
        return {
          value: item._id,
          label: item.name,
        }
      }))
    }

    const getTags = async () => {
      const res = await getAllTags()
      setTags(res.data.data.map(item => {
        return {
          value: item._id,
          label: item.name,
        }
      }))
    }

    getCategories()

    getTags()
  }, [])

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
      name: 'Edit',
      isCurrentPage: true,
    },
  ]

  const handleSubmit = async (isDraft) => {
    isDraft? setDraftLoading(true) : setSubmitLoading(true)
    const post = {
      title,
      content: content,
      category: selectedCategory.value,
      tags: selectedTags.map(tag => tag.value)
    }
    if (isDraft) {
      post.status = 'draft'
    }
    const res = isUpdate ? await updatePostById(postId, post) : await createNewPost(post)
    const newPostId = res.data._id
    window.location.pathname = '/posts/' + newPostId
  }

  const handleCreate = async (type) => {
    if (type === 'category') {
      const res = await createCategory({ name: newCategory })
      if (res.success) {
        const newOption = { value: res.data._id, label: res.data.name }
        setCategories(prev => [...prev, newOption])
        setSelectedCategory(newOption)
        setNewCategory('')
      } else {
        console.log('Category create failed: ' + res.message)
      }
    } else if (type === 'tag') {
      const res = await createTag({ name: newTag })
      if (res.success) {
        const newOption = { value: res.data._id, label: res.data.name }
        setTags(prev => [...prev, { value: res.data._id, label: res.data.name }])
        setSelectedTags(prev => [...prev, newOption])
        setNewTag('')
      } else {
        console.log('Tag create failed: ' + res.message)
      }
    } else {
      console.log('Cannot create unknown type.')
    }
  }


  return (
    <>
      <MyBreadCrumb breadcrumb={breadcrumb} />
      <Flex
        maxW={['7xl']}
        mx='auto'
        gap='2rem'
        wrap='wrap'
        justify='center'
      >
        <Flex
          direction='column'
          maxW={['4xl']}
          gap='2rem'
          p='2rem'
        >
          <Input
            size='lg'
            fontSize='1.5rem'
            type="text"
            placeholder="Title..." f
            ontWeight={600}
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <Editor
            value={content}
            onEditorChange={(newContent, editor) => setContent(newContent)}
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            onInit={(evt, editor) => editorRef.current = editor}
            init={{
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'image'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help | image',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif font-size: 1rem }',
              placeholder: 'Start writing...'
            }}
          />
        </Flex>
        <Flex
          direction='column'
          gap='1rem'
          w={300}
          p='2rem'
        >
          <Heading size='md'>Category</Heading>
          <Select
            value={selectedCategory}
            options={categories}
            onChange={value => setSelectedCategory(value)}
          />
          <HStack gap='1rem'>
            <Input
              size='sm'
              placeholder="New category"
              onChange={e => setNewCategory(e.target.value)}
              value={newCategory}
            />
            <Button
              size='sm'
              colorScheme="green"
              onClick={() => handleCreate('category')}
            >+</Button>
          </HStack>
          <Divider />
          <Heading size='md'>Tags</Heading>
          <Select
            value={selectedTags}
            isMulti
            options={tags}
            onChange={value => setSelectedTags(value)}
            placeholder=''
          />
          <HStack gap='1rem'>
            <Input
              size='sm'
              placeholder="New tag"
              onChange={e => setNewTag(e.target.value)}
              value={newTag}
            />
            <Button
              size='sm'
              colorScheme="green"
              onClick={() => handleCreate('tag')}
            >+</Button>
          </HStack>
          <Divider />
          <Button
            isDisabled={!title ||!content ||!selectedCategory.value ||!selectedTags.length}
            onClick={() => handleSubmit(false)}
            colorScheme="yellow"
            isLoading={submitLoading}
          >{isUpdate ? 'Update' : 'Publish'}</Button>
          {!isUpdate &&
            <Button
              onClick={() => handleSubmit(true)}
              isDisabled={!title || !content || !selectedCategory.value || !selectedTags.length}
              isLoading={draftLoading}
            >Save as draft</Button>
          }
          <Button onClick={() => window.location.pathname = '/'}>Discard</Button>
        </Flex>
      </Flex>
    </>
  )
}