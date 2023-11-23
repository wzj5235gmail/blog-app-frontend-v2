import { Button, Checkbox, Divider, Flex, HStack, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import MyBreadCrumb from "../components/MyBreadCrumb";
import Select from 'react-select'
import { useParams } from "react-router-dom";
import { getAllCategories, getAllPosts, getAllTags, getFilteredPosts } from "../apis/Apis";
import ReactPaginate from 'react-paginate';


export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({})
  const [selectedTag, setSelectedTag] = useState({})
  const [availableCategories, setAvailableCategories] = useState([])
  const [availableTags, setAvailableTags] = useState([])
  const { tagId, authorId, search } = useParams()
  const [desc, setDesc] = useState(true)
  const [sort, setSort] = useState('date')
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const getCategories = async () => {
      const data = await getAllCategories()
      setAvailableCategories(data.data.data)
      setAvailableCategories(prev => prev.map(i => { return { value: i._id, label: i.name } }))
    }
    const getTags = async () => {
      const data = await getAllTags()
      setAvailableTags(data.data.data)
      setAvailableTags(prev => prev.map(i => { return { value: i._id, label: i.name } }))
    }
    getCategories()
    getTags()

    if (tagId) {
      const getTagPosts = async () => {
        const data = await getFilteredPosts('tags=' + tagId)
        setArticles(data.data.data)
        setPageCount(data.data.pageCount)
      }
      getTagPosts()

    } else if (authorId) {
      const getAuthorPosts = async () => {
        const data = await getFilteredPosts('author=' + authorId)
        setArticles(data.data.data)
        setPageCount(data.data.pageCount)
      }
      getAuthorPosts()

    } else if (search) {
      const getSearchPosts = async () => {
        const data = await getFilteredPosts('search=' + search)
        setArticles(data.data.data)
        setPageCount(data.data.pageCount)
      }
      getSearchPosts()
    } else {
      const getPosts = async () => {
        const data = await getAllPosts()
        setArticles(data.data.data)
        setPageCount(data.data.pageCount)
      }
      getPosts()
    }
  }, [])

  const handleTagChange = async (value) => {
    setSelectedTag(value)
  }

  const handleCategoryChange = async (value) => {
    setSelectedCategory(value)
  }

  const handlePageClick = e => {
    const getPosts = async () => {
      const data = await getFilteredPosts(`page=${e.selected + 1}`)
      setArticles(data.data.data)
    }
    getPosts()
  }

  const handleFilter = async () => {
    const order = desc ? '-' : ''
    let sortTerm
    if (sort === 'date') {
      sortTerm = 'publishDate'
    } else if (sort === 'title') {
      sortTerm = 'title'
    } else if (sort === 'author') {
      sortTerm = 'author.name'
    }
    let filterQuery = `order=${order}${sortTerm}`
    if (selectedTag && selectedTag.value) {
      filterQuery += '&tags=' + selectedTag.value
    }
    if (selectedCategory && selectedCategory.value) {
      filterQuery += '&category=' + selectedCategory.value
    }
    const data = await getFilteredPosts(`${filterQuery}`)
    setArticles(data.data.data)
    setPageCount(data.data.pageCount)
  }

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
      isCurrentPage: true,
    },
  ]


  return (
    <>
      <MyBreadCrumb breadcrumb={breadcrumb} />
      <Flex maxW={['3xl', '4xl', '5xl', '6xl']} px='2rem' mx='auto' wrap='wrap' gap='2rem'>
        <Flex className="filterOptions" direction='column' gap='1.5rem' mx='auto'>


          <Heading size='lg'>Category</Heading>
          <Select
            className="select"
            options={availableCategories}
            onChange={handleCategoryChange}
            placeholder='Search or select...'
            isClearable
          />
          <Heading size='lg'>Topic</Heading>
          <Select
            className="select"
            options={availableTags}
            onChange={handleTagChange}
            placeholder='Search or select...'
            isClearable
          />


          <HStack justify='space-between'>
            <Heading size='lg'>Sort</Heading>
            <Checkbox defaultChecked isChecked={desc} onChange={e => setDesc(e.target.checked)}>Descending</Checkbox>
          </HStack>
          <RadioGroup defaultValue="date" onChange={value => setSort(value)}>
            <Stack>
              <Radio value='date'>Date</Radio>
              <Radio value='title'>Title</Radio>
            </Stack>
          </RadioGroup>
          <Button onClick={handleFilter}>Filter</Button>
          <Divider my='2rem' />
        </Flex>

        <Flex className="articles" direction='column' mx='auto'>
          {articles && articles.length > 0 ?
            (articles.map(i => { return <PostCard key={i._id} {...i} /> })) :
            <Heading>No results.</Heading>
          }

          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageClassName="page-item"
            breakClassName="page-item"
            activeClassName="active"
            previousClassName="page-item previous"
            nextClassName="page-item next"

          />

        </Flex>

      </Flex>

    </>
  )
}