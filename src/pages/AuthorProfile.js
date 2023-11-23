import { useParams } from "react-router-dom";
import Profile from "../components/Profile";
export default function AuthorProfile() {
  const { userId } = useParams()

  return <Profile userId={userId} />
}