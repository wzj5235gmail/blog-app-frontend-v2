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
} from "@chakra-ui/react"
import logo from "../static/logo-no-background.png"
import { useState } from "react"


export default function Navbar() {

  const [search, setSearch] = useState('')

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('currentUser')
    window.location.reload()
  }

  const handleSearch = () => window.location.pathname = '/blog/search/' + search

  return (
    <>
      <Flex justify="space-evenly" px='4rem' py='2rem' bgColor='#FAD773' align='center' wrap='wrap' gap='2rem'>
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            htmlWidth='300'
            fit="contain"
            borderRadius=""
            className="logo"
          />
        </Link>
        <HStack
          className="search-bar"
          gap='1rem'
        >
          <Input
            placeholder='Search'
            bg='white'
            onChange={e => setSearch(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && handleSearch()}
            size='sm'
          />
          <Button onClick={handleSearch} size='sm'>Search</Button>
        </HStack>
        <UnorderedList styleType='none'>
          <HStack justify='space-between' wrap='wrap'>
            <HStack gap="2rem" px='2rem' py='1rem' fontWeight={600}>
              <ListItem>
                <Link href='/'>Home</Link>
              </ListItem>
              <ListItem>
                <Link href='/blog'>Blog</Link>
              </ListItem>
              <ListItem>
                <Link href='/about'>About</Link>
              </ListItem>
            </HStack>
            <HStack gap="2rem" px='2rem'>
              <ListItem>
                {currentUser ? (
                  <HStack>
                    <Link href='/profile'>
                      <Avatar size='sm' src={currentUser.avatar} />
                    </Link>
                    <Link href='/profile'>
                      <Text>{currentUser.username}</Text>
                    </Link>
                  </HStack>
                ) : <Link href='/login'>Login</Link>}
              </ListItem>
              <ListItem>
                {currentUser ?
                  <Button size='sm' onClick={handleLogout}>Logout</Button> :
                  <Link href='/signup'>Signup</Link>}
              </ListItem>
            </HStack>
          </HStack>
        </UnorderedList>
      </Flex>

    </>
  )
}