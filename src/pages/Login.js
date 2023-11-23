import { Alert, AlertIcon, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import MyBreadCrumb from "../components/MyBreadCrumb";
import { useState } from "react";
import { loginUser } from "../apis/Apis";

export default function Login() {

  const [form, setForm] = useState({
    usernameOrEmail: '',
    password: ''
  })

  const [fail, setFail] = useState({
    fail: false,
    message: ''
  })

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const data = await loginUser(form)
    setLoading(false)
    if (data.success) {
      setSuccess(true)
      localStorage.setItem('currentUser', JSON.stringify(data.data))
      setTimeout(() => {
        window.location.pathname = '/'
      }, 1000);
    } else {
      setFail({
        fail: true,
        message: data.message
      })
    }
  }

  const handleClear = () => {
    setForm({
      usernameOrEmail: '',
      password: ''
    })
    setFail({
      fail: false,
      message: ''
    })
  }

  const breadcrumb = [
    {
      id: 1,
      path: '/',
      name: 'Home',
      isCurrentPage: false,
    },
    {
      id: 2,
      path: '/login',
      name: 'Login',
      isCurrentPage: true,
    },
  ]

  return (
    <>
      <MyBreadCrumb breadcrumb={breadcrumb} />
      {success && (
        <Alert status='success' mx='auto' my='2rem' maxW='md'>
          <AlertIcon />
          Login successful! Redirecting to home page...
        </Alert>)}
      <VStack direction='column' maxW={['xs']} mx='auto' px='1rem' mb='5rem'>
        <Heading mb='3rem'>Welcome back.</Heading>
        <FormControl isRequired>
          <Flex direction='column' gap='1rem'>
            <FormLabel>Username or Email</FormLabel>
            <Input value={form.usernameOrEmail} type='text' onChange={e => { setForm(prev => { return { ...prev, usernameOrEmail: e.target.value } }) }} />
            <FormErrorMessage>Username or email is required.</FormErrorMessage>
            <FormLabel>Password</FormLabel>
            <Input value={form.password} type='password' onChange={e => { setForm(prev => { return { ...prev, password: e.target.value } }) }} />
            <FormErrorMessage>Password is required.</FormErrorMessage>
            <Button onClick={handleLogin} colorScheme="orange">{loading ? <Spinner /> : 'Login'}</Button>
            {fail.fail && <Text mb='1rem' color='red'>{fail.message}</Text>}
            <Button onClick={handleClear}>Clear</Button>
          </Flex>
        </FormControl>
      </VStack>

    </>
  )
}