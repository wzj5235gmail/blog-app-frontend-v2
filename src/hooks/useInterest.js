import { useEffect, useState } from "react"
import { updateUserListFields } from "../apis/Apis"

export default function useInterest(tagId) {
  const [followed, setFollowed] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const handleFollow = async () => {
    if (currentUser) {
      const userData = followed ?
        await updateUserListFields("interests", "remove", [tagId]) :
        await updateUserListFields("interests", "add", [tagId])
      localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, interests: userData.data.interests }))
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
    } else {
      window.location.pathname = "/login"
    }
  }

  useEffect(() => {
    setFollowed(currentUser && currentUser.follows && currentUser.interests.map(i => i._id).includes(tagId))
  }, [currentUser])

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
  }, [])

  return { followed, handleFollow }
}