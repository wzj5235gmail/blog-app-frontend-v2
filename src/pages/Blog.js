import {
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import MyBreadCrumb from "../components/MyBreadCrumb"
import Select from "react-select"
import { useParams } from "react-router-dom"
import { getAllCategories, getAllTags, getFilteredPosts } from "../apis/Apis"
import ReactPaginate from "react-paginate"
import PostCard from "../components/Home/PostCard"


export default function Blog() {
  const [articles, setArticles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const [selectedTag, setSelectedTag] = useState({})
  const [availableCategories, setAvailableCategories] = useState([])
  const [availableTags, setAvailableTags] = useState([])
  const { search } = useParams()
  const [desc, setDesc] = useState(true)
  const [sort, setSort] = useState("date")
  const [pageCount, setPageCount] = useState(0)
  const [searchResult, setSearchResult] = useState(search)
  const [isLoading, setIsLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

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

    setIsLoading(true)
    if (search) {
      const getSearchPosts = async () => {
        const data = await getFilteredPosts("status=published&search=" + search)
        data.data.data.length === 0 ? setNoResults(true) : setNoResults(false)
        setSearchResult(search)
        setArticles(data.data.data)
        setPageCount(data.data.pageCount)
        setIsLoading(false)
      }
      getSearchPosts()

    } else {
      const getPosts = async () => {
        const data = await getFilteredPosts("status=published")
        data.data.data.length === 0 ? setNoResults(true) : setNoResults(false)
        setArticles(data.data.data)
        setPageCount(data.data.pageCount)
        setIsLoading(false)
      }
      getPosts()
    }

    setIsMobile(window.innerWidth < 1024)
  }, [])

  const handleTagChange = async (value) => {
    setSelectedTag(value)
  }

  const handleCategoryChange = async (value) => {
    setSelectedCategory(value)
  }

  const handlePageClick = e => {
    setIsLoading(true)
    const getPosts = async () => {
      const data = await getFilteredPosts(`status=published&page=${e.selected + 1}`)
      data.data.data.length === 0 ? setNoResults(true) : setNoResults(false)
      setArticles(data.data.data)
      setIsLoading(false)
    }
    getPosts()
  }

  const handleFilter = async () => {
    setIsLoading(true)
    const order = desc ? "-" : ""
    let sortTerm
    if (sort === "date") {
      sortTerm = "publishDate"
    } else if (sort === "title") {
      sortTerm = "title"
    } else if (sort === "author") {
      sortTerm = "author.name"
    }
    let filterQuery = `order=${order}${sortTerm}`
    if (selectedTag && selectedTag.value) {
      filterQuery += "&tags=" + selectedTag.value
    }
    if (selectedCategory && selectedCategory.value) {
      filterQuery += "&category=" + selectedCategory.value
    }
    const data = await getFilteredPosts(`${filterQuery}`)
    data.data.data.length === 0 ? setNoResults(true) : setNoResults(false)
    setArticles(data.data.data)
    setPageCount(data.data.pageCount)
    setIsLoading(false)
  }

  const breadcrumb = [
    {
      id: 1,
      path: "/",
      name: "Home",
      isCurrentPage: false,
    },
    {
      id: 2,
      path: "/blog",
      name: "Blog",
      isCurrentPage: true,
    },
  ]


  return (
    <>
      <MyBreadCrumb breadcrumb={breadcrumb} />
      <Flex
        maxW={["3xl", "4xl", "5xl", "6xl"]}
        px="2rem"
        mx="auto"
        gap="2rem"
        direction={isMobile ? "column" : "row"}
      >
        {!isMobile &&
          <Flex className="filterOptions" direction="column" gap="1.5rem" mx="auto">

            <Heading size="lg" fontWeight={200}>Category</Heading>
            <Select
              className="select"
              options={availableCategories}
              onChange={handleCategoryChange}
              placeholder="Category"
              isClearable
            />
            <Heading size="lg" fontWeight={200}>Topic</Heading>
            <Select
              className="select"
              options={availableTags}
              onChange={handleTagChange}
              placeholder="Topic"
              isClearable
            />


            <HStack justify="space-between">
              <Heading size="lg" fontWeight={200}>Sort</Heading>
              <Checkbox defaultChecked isChecked={desc} onChange={e => setDesc(e.target.checked)}>Descending</Checkbox>
            </HStack>
            <RadioGroup defaultValue="date" onChange={value => setSort(value)}>
              <Stack>
                <Radio value="date">Date</Radio>
                <Radio value="title">Title</Radio>
              </Stack>
            </RadioGroup>
            <Button colorScheme="yellow" onClick={handleFilter}>Filter</Button>
            <Divider my="2rem" />
          </Flex>
        }
        {isMobile &&
          <Accordion defaultIndex={[-1]} allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontWeight={600}>
                    Filters
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Flex className="filterOptions" direction="column" gap="1.5rem" mx="auto">
                  <Divider />
                  <Heading size="lg" fontWeight={200}>Category</Heading>
                  <Select
                    className="select"
                    options={availableCategories}
                    onChange={handleCategoryChange}
                    placeholder="Category"
                    isClearable
                  />
                  <Heading size="lg" fontWeight={200}>Topic</Heading>
                  <Select
                    className="select"
                    options={availableTags}
                    onChange={handleTagChange}
                    placeholder="Topic"
                    isClearable
                  />
                  <HStack justify="space-between">
                    <Heading size="lg" fontWeight={200}>Sort</Heading>
                    <Checkbox defaultChecked isChecked={desc} onChange={e => setDesc(e.target.checked)}>Descending</Checkbox>
                  </HStack>
                  <RadioGroup defaultValue="date" onChange={value => setSort(value)}>
                    <Stack>
                      <Radio value="date">Date</Radio>
                      <Radio value="title">Title</Radio>
                    </Stack>
                  </RadioGroup>
                  <Button colorScheme="yellow" onClick={handleFilter}>Filter</Button>
                </Flex>
              </AccordionPanel>
            </AccordionItem>

          </Accordion>
        }
        <Flex className="articles" direction="column" mx="auto">
          {searchResult && <Flex gap=".5rem" mb="1.5rem">
            <Heading fontWeight={200}>Results for</Heading>
            <Heading>{searchResult}</Heading>
          </Flex>}
          {isLoading && <Center><Spinner size="lg" /></Center>}
          {articles.length > 0 && (articles.map(i => { return <PostCard key={i._id} {...i} /> }))}
          {noResults && <Heading w={["sm", null, null, "3xl"]}>No results.</Heading>}

          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={isMobile ? 1 : 5}
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