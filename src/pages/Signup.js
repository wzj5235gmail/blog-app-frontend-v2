import { Alert, AlertIcon, Avatar, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, Link, Spinner, Text, VStack } from "@chakra-ui/react"
import MyBreadCrumb from "../components/MyBreadCrumb"
import { registerUser } from "../apis/Apis"
import { useState } from "react"
import google from "../static/google.png"


export default function Signup() {

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  })

  const [formInvalid, setFormInvalid] = useState({
    username: false,
    password: false,
    email: false,
    name: false,
  })

  const [fail, setFail] = useState({ fail: false, message: "" })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClear = () => {
    setForm({
      username: "",
      password: "",
      email: "",
      name: "",
    })
    setFormInvalid({
      username: false,
      password: false,
      email: false,
      name: false,
    })
    setFail({
      fail: false,
      message: ""
    })
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true)
      const data = await registerUser(form)
      setLoading(false)
      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          window.location.pathname = "/login"
        }, 2000)
      } else {
        setFail({ fail: true, message: data.message })
      }
    }
  }

  const isStrongPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasRequiredLength = password.length >= 8
    return hasUpperCase && hasLowerCase && hasDigit && hasRequiredLength
  }

  const isEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    let isValid = true
    if (form.username.trim().length < 3) {
      setFormInvalid(prev => { return { ...prev, username: true } })
      isValid = false
    }
    if (!isStrongPassword(form.password)) {
      setFormInvalid(prev => { return { ...prev, password: true } })
      isValid = false
    }
    if (!isEmail(form.email)) {
      setFormInvalid(prev => { return { ...prev, email: true } })
      isValid = false
    }
    if (form.name.trim().length < 3) {
      setFormInvalid(prev => { return { ...prev, name: true } })
      isValid = false
    }
    return isValid
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
      path: "/signup",
      name: "Signup",
      isCurrentPage: true,
    },
  ]

  return (
    <>
      <MyBreadCrumb breadcrumb={breadcrumb} />
      {success && (
        <Alert status="success" mx="auto" my="2rem" maxW="md">
          <AlertIcon />
          Successful! Redirecting to login...
        </Alert>)}
      <VStack direction="column" maxW={["xs"]} mx="auto" px="1rem" mb="5rem">

        <Heading mb="3rem">Join us now.</Heading>
        <FormControl>
          <Flex direction="column" gap="1rem">
            <FormLabel>Username</FormLabel>
            <Input type="text" value={form.username} onChange={e => {
              setForm(prev => { return { ...prev, username: e.target.value } })
              setFormInvalid(prev => { return { ...prev, username: false } })
            }} />
            {formInvalid.username && <Text color="red">Username invalid.</Text>}
            <FormLabel>Email</FormLabel>
            <Input type="email" value={form.email} onChange={e => {
              setForm(prev => { return { ...prev, email: e.target.value } })
              setFormInvalid(prev => { return { ...prev, email: false } })
            }} />
            {formInvalid.email && <Text color="red">Email invalid.</Text>}
            <FormLabel>Password</FormLabel>
            <Input type="password" value={form.password} onChange={e => {
              setForm(prev => { return { ...prev, password: e.target.value } })
              setFormInvalid(prev => { return { ...prev, password: false } })
            }} />
            {formInvalid.password && <Text color="red">Password invalid.</Text>}
            <FormLabel>Name</FormLabel>
            <Input type="text" value={form.name} onChange={e => {
              setForm(prev => { return { ...prev, name: e.target.value } })
              setFormInvalid(prev => { return { ...prev, name: false } })
            }} />
            {formInvalid.name && <Text color="red">Name invalid.</Text>}
            <Button mt="2rem" colorScheme="orange" onClick={handleSubmit}>{loading ? <Spinner /> : "Sign up"}</Button>
            {fail.fail && <Text color="red">{fail.message}</Text>}

            <Button onClick={handleClear}>Clear</Button>
          </Flex>
        </FormControl>
        <Link textDecor="none" href="http://127.0.0.1:5000/auth/google">
          <HStack>
            <Avatar src={google} boxSize="1rem" />
            <Text fontWeight={600}>Sign in with Google</Text>
          </HStack>
        </Link>
      </VStack>
    </>
  )
}