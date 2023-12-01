
import { useLocation } from "react-router-dom"
import queryString from "query-string"
import { useEffect } from "react"
import { getUserById } from "../apis/Apis"

export default function Oauth() {
  const location = useLocation()
  useEffect(() => {
    const { userId, token } = queryString.parse(location.search)
    const getUser = async () => {
      const res = await getUserById(userId)
      if (res.success) {
        let currentUser = res.data
        currentUser.token = token
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        window.location.pathname = "/"
      } else {
        console.log("Get user failed: " + res.message)
      }
    }
    getUser()
  }, [])
}