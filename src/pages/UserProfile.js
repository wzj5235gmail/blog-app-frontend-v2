import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UserPosts from "../components/Profile/UserPosts";
import Follows from "../components/Profile/Follows";
import Interests from "../components/Profile/Interests";
import LikedPosts from "../components/Profile/LikedPosts";
import Bookmarks from "../components/Profile/Bookmarks";
import ProfileDetail from "../components/Profile/ProfileDetail";
import isAuthenticated from "../isAuthenticated";
import MyBreadCrumb from "../components/MyBreadCrumb";

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    if (!isAuthenticated()) { window.location.pathname = '/login' }
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
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
      path: '/profile',
      name: 'Profile',
      isCurrentPage: true,
    },
  ]

  return (
    <>
      <MyBreadCrumb breadcrumb={breadcrumb} />
      <Tabs
        maxW='4xl'
        mx='auto'
        mt='5rem'

      >
        <TabList>
          <Tab>Profile</Tab>
          <Tab>My Posts</Tab>
          <Tab>Follows</Tab>
          <Tab>Interests</Tab>
          <Tab>LikedPosts</Tab>
          <Tab>Bookmarks</Tab>
        </TabList>

        {currentUser &&
          <TabPanels>
            <TabPanel>
              <ProfileDetail currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </TabPanel>
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