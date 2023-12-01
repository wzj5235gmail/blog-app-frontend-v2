import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import UserPosts from "../components/Profile/UserPosts"
import Follows from "../components/Profile/Follows"
import Interests from "../components/Profile/Interests"
import LikedPosts from "../components/Profile/LikedPosts"
import Bookmarks from "../components/Profile/Bookmarks"
import ProfileDetail from "../components/Profile/ProfileDetail"
import isAuthenticated from "../isAuthenticated"
import MyBreadCrumb from "../components/MyBreadCrumb"

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    if (!isAuthenticated()) { window.location.pathname = "/login" }
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
  }, [])

  const breadcrumb = [
    {
      id: 1,
      path: "/",
      name: "Home",
      isCurrentPage: false,
    },
    {
      id: 2,
      path: "/profile",
      name: "Profile",
      isCurrentPage: true,
    },
  ]

  return (
    <>
      <MyBreadCrumb breadcrumb={breadcrumb} />
      <Box
        maxW="4xl"
        mx="auto"
        mt="5rem"
      >
        {currentUser &&
          <ProfileDetail currentUser={currentUser} setCurrentUser={setCurrentUser} />}
      </Box>
      <Tabs
        maxW="2xl"
        mx="auto"
        mt="4rem"
        isFitted
      >
        <TabList>
          <Tab fontSize="sm">Posts</Tab>
          <Tab fontSize="sm">Follows</Tab>
          <Tab fontSize="sm">Interests</Tab>
          <Tab fontSize="sm">Likes</Tab>
          <Tab fontSize="sm">Bookmarks</Tab>
        </TabList>

        {currentUser &&
          <TabPanels>
            <TabPanel>
              {currentUser.posts &&
                <UserPosts currentUser={currentUser} />
              }
            </TabPanel>
            <TabPanel>
              {currentUser.follows &&
                <Follows currentUser={currentUser} />
              }
            </TabPanel>
            <TabPanel>
              {currentUser.interests &&
                <Interests currentUser={currentUser} />
              }
            </TabPanel>
            <TabPanel>
              {currentUser.likes &&
                <LikedPosts currentUser={currentUser} />
              }
            </TabPanel>
            <TabPanel>
              {currentUser.savedPosts &&
                <Bookmarks currentUser={currentUser} />
              }
            </TabPanel>
          </TabPanels>
        }
      </Tabs>
    </>
  )
}