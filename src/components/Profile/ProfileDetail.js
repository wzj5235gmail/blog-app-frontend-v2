import { Avatar, Flex, HStack, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkOutline, IoClose } from "react-icons/io5";
import { updateUserProfile } from "../../apis/Apis";



export default function ProfileDetail({ currentUser, setCurrentUser }) {
  const [isEditing, setIsEditing] = useState({
    name: false,
    bio: false,
    phone: false,
  })
  let dateJoined = new Date(currentUser.createdAt).toLocaleDateString()

  const handleUpdate = async type => {
    const res = await updateUserProfile(currentUser)
    if (res.success) {
      let prev = JSON.parse(localStorage.getItem('currentUser'))
      prev = { ...prev, ...res.data }
      localStorage.setItem('currentUser', JSON.stringify(prev))
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
      changeIsEditing(type, false)
    } else {
      console.log('Update data failed: ' + res.message)
      alert('Update data failed: ' + res.message)
    }
  }

  const changeIsEditing = (type, isOpen) => {
    setIsEditing(prev => {
      let newState = { ...prev }
      newState[type] = isOpen ? true : false
      return newState
    })
  }

  const onInputChange = (e, type) => {
    setCurrentUser(prev => {
      let newState = { ...prev }
      newState[type] = e.target.value
      return newState
    })
  }


  return (
    <>
      <Flex my='2rem' gap='2rem'>
        <Avatar size='2xl' src={currentUser.avatar} />
        <Flex direction='column' gap='1.5rem'>
          {isEditing.name ?
            <HStack gap='1rem'>
              <Input value={currentUser.name} onChange={e => onInputChange(e, 'name')} />
              <IoCheckmarkOutline size='2rem' className='pointer' onClick={() => handleUpdate('name')} />
              <IoClose size='2rem' className='pointer' onClick={() => changeIsEditing('name', false)} />
            </HStack> :
            <HStack gap='1rem'>
              <Heading>{currentUser.name}</Heading>
              <FaEdit className='pointer' onClick={() => changeIsEditing('name', true)} />
            </HStack>
          }
          {isEditing.bio ?
            <HStack gap='1rem'>
              <Text>Biography:</Text>
              <Input value={currentUser.bio} onChange={e => onInputChange(e, 'bio')} />
              <IoCheckmarkOutline size='2rem' className='pointer' onClick={() => handleUpdate('bio')} />
              <IoClose size='2rem' className='pointer' onClick={() => changeIsEditing('bio', false)} />
            </HStack> :
            <HStack gap='1rem'>
              <Text>Biography:</Text>
              <Text>{currentUser.bio}</Text>
              <FaEdit className='pointer' onClick={() => changeIsEditing('bio', true)} />
            </HStack>
          }
          {isEditing.phone ?
            <HStack gap='1rem'>
              <Text>Phone:</Text>
              <Input value={currentUser.phone} onChange={e => onInputChange(e, 'phone')} />
              <IoCheckmarkOutline size='2rem' className='pointer' onClick={() => handleUpdate('phone')} />
              <IoClose size='2rem' className='pointer' onClick={() => changeIsEditing('phone', false)} />
            </HStack> :
            <HStack gap='1rem'>
              <Text>Phone:</Text>
              <Text>{currentUser.phone}</Text>
              <FaEdit className='pointer' onClick={() => changeIsEditing('phone', true)} />
            </HStack>
          }
          <HStack gap='1rem'>
            <Text>Date joined:</Text>
            <Text>{dateJoined}</Text>
          </HStack>
        </Flex>
      </Flex>
    </>
  )
}