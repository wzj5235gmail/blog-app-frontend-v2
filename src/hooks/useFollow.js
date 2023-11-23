import { useEffect, useState } from "react"
import { updateUserListFields } from "../apis/Apis"

export default function useFollow(userId) {
  const [followed, setFollowed] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const handleFollow = async () => {
    if (currentUser) {
      const userData = followed ?
        await updateUserListFields('follows', 'remove', [userId]) :
        await updateUserListFields('follows', 'add', [userId])
      localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, follows: userData.data.follows }))
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    } else {
      window.location.pathname = '/login'
    }
  }

  useEffect(() => {
    setFollowed(currentUser && currentUser.follows && currentUser.follows.map(i => i._id).includes(userId))
  }, [currentUser])

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
  }, [])

  return {followed, handleFollow}
}