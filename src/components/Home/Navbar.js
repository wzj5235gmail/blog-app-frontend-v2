import {
  Flex,
  Image,
  Input,
  Button,
  HStack,
  Link,
  UnorderedList,
  ListItem,
  Text,
  Avatar,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Popover,
  Divider,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import logo from "../../static/logo-no-background.png"
import logoNoWord from "../../static/logo-no-background-no-word.png"
import { useEffect, useRef, useState } from "react"
import { getFilteredPosts } from "../../apis/Apis"
import { FaRegEdit } from "react-icons/fa"
import { FaRegUser } from "react-icons/fa6"
import { CiSearch } from "react-icons/ci"
import { IoExitOutline } from "react-icons/io5"
import { MdExplore } from "react-icons/md"
import { FaUser } from "react-icons/fa"
import { MdOutlineArticle } from "react-icons/md"



export default function Navbar() {

  const searchInitialFocusRef = useRef()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [search, setSearch] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("currentUser")
    window.location.reload()
  }

  const handleSearch = () => window.location.pathname = "/blog/search/" + search

  const handleSearchInputChange = async (e) => {
    const searchValue = e.target.value.trim()
    setSearch(searchValue)
    if (searchValue.length > 0) {
      const res = await getFilteredPosts("status=pubished&search=" + searchValue)
      if (res.success) {
        setShowSuggestions(true)
        setSuggestions(res.data.data)
      } else {
        setShowSuggestions(false)
        setSuggestions([])
      }
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  return (
    <>
      <Flex
        align="center"
        gap="1rem"
        mx="2rem"
        py="1rem"
        justify="space-between"
      >
        <HStack
          className="search-bar"
          gap="2rem"
        >
          <Link href="/">
            {isMobile
              ?
              <Image
                src={logoNoWord}
                alt="logo"
                fit="contain"
                className="logo"
                maxW={50}
              />
              :
              <Image
                src={logo}
                alt="logo"
                fit="contain"
                className="logo"
                maxW={200}
              />
            }
          </Link>
          <Popover
            initialFocusRef={searchInitialFocusRef}
            isOpen={showSuggestions}
          >
            <PopoverTrigger>
              <InputGroup>
                <InputLeftElement>
                  <CiSearch size={25} color="gray.500" />
                </InputLeftElement>
                <Input
                  placeholder="Search"
                  onChange={handleSearchInputChange}
                  onBlur={() => setShowSuggestions(false)}
                  onKeyUp={e => e.key === "Enter" && handleSearch()}
                  ref={searchInitialFocusRef}
                  borderRadius="full"
                  bgColor="gray.100"
                />
              </InputGroup>
            </PopoverTrigger>
            {suggestions.length > 0 &&
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader fontWeight={600}>Posts</PopoverHeader>
                {suggestions.map(suggestion => (
                  <Link href={`/posts/${suggestion._id}`}>
                    <PopoverBody>
                      <HStack>
                        <Avatar
                          src={suggestion.author.avatar}
                          size="sm"
                        />
                        <Text noOfLines={1}>
                          {suggestion.title}
                        </Text>
                      </HStack>
                    </PopoverBody>
                    <Divider />
                  </Link>
                ))}
              </PopoverContent>
            }
          </Popover>
        </HStack>

        <HStack gap={["1em", null, null, "2em"]}>
          <Link href="/blog">
            <HStack>
              <MdExplore size={30} />
              {!isMobile && <span>Explore</span>}
            </HStack>
          </Link>
          {currentUser &&
            <HStack gap={["1em", null, null, "2em"]}>
              <Link href="/edit">
                {isMobile ?
                  <FaRegEdit size={30} /> :
                  <Button
                    gap="0.5em"
                    variant={["link", null, null, "solid"]}
                    colorScheme="yellow"
                  >
                    <FaRegEdit />
                    <span>Write</span>
                  </Button>
                }
              </Link>
              <Popover
                size="sm"
              >
                <PopoverTrigger>
                  <div tabIndex={0}>
                    <Avatar
                      className="pointer"
                      src={currentUser.avatar}
                      size={["sm", null, null, "md"]}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  p="0.5em"
                  fontSize="sm"
                  maxW={150}
                >
                  <Link href="/profile">
                    <PopoverBody>
                      <HStack>
                        <FaRegUser />
                        <span>Profile</span>
                      </HStack>
                    </PopoverBody>
                  </Link>
                  <Divider />
                  <PopoverBody onClick={handleLogout}>
                    <HStack className="pointer">
                      <IoExitOutline />
                      <span>Logout</span>
                    </HStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </HStack>
          }
          {!currentUser && (isMobile
            ?
            <Popover
              size="sm"
            >
              <PopoverTrigger>
                <div tabIndex={0}>
                  <FaUser
                    className="pointer"
                    size={25}
                  />
                </div>
              </PopoverTrigger>
              <PopoverArrow />
              <PopoverContent
                p="0.5em"
                fontSize="sm"
                maxW={130}
              >
                <Link href="/login">
                  <PopoverBody>
                    <HStack>
                      <FaRegUser />
                      <span>Login</span>
                    </HStack>
                  </PopoverBody>
                </Link>
                <Divider />
                <Link href="/signup">
                  <PopoverBody>
                    <HStack>
                      <FaRegEdit />
                      <span>Signup</span>
                    </HStack>
                  </PopoverBody>
                </Link>
              </PopoverContent>
            </Popover>
            :
            <HStack gap="2rem">
              <Link href="/login">
                <span>Login</span>
              </Link>
              <Link href="/signup">
                <span>Signup</span>
              </Link>
            </HStack>)
          }
        </HStack>

      </Flex>

      <Divider />
    </>
  )
}