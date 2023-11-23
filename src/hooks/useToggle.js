import { useEffect, useState } from "react"
import { updateUserListFields } from "../apis/Apis"

export default function useToggle(fieldName, itemId) {
  const [toggled, setToggled] = useState(false)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')))

  const handleToggle = async () => {
    if (currentUser) {
      const userData = toggled ?
        await updateUserListFields(fieldName, 'remove', [itemId]) :
        await updateUserListFields(fieldName, 'add', [itemId])
      let newCurrentUser = {
        ...currentUser
      }
      newCurrentUser[fieldName] = userData.data[fieldName]
      localStorage.setItem('currentUser', JSON.stringify(newCurrentUser))
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    } else {
      window.location.pathname = '/login'
    }
  }

  useEffect(() => {
    setToggled(currentUser && currentUser[fieldName] && currentUser[fieldName].map(i => i._id).includes(itemId))
  }, [currentUser])

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
  }, [])

  return {toggled, handleToggle}
}