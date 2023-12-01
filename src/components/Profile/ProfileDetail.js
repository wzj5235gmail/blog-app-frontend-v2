import {
  Avatar,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"
import { useState } from "react"
import { FaEdit } from "react-icons/fa"
import { IoCheckmarkOutline, IoClose } from "react-icons/io5"
import { updateUserProfile, uploadImage } from "../../apis/Apis"
import { FaRegUser, FaMobileAlt } from "react-icons/fa"



export default function ProfileDetail({ currentUser, setCurrentUser }) {
  const [isEditing, setIsEditing] = useState({
    name: false,
    bio: false,
    phone: false,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newAvatar, setNewAvatar] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState()


  const handleUpdate = async type => {
    const res = await updateUserProfile(currentUser)
    if (res.success) {
      let prev = JSON.parse(localStorage.getItem("currentUser"))
      prev = { ...prev, ...res.data }
      localStorage.setItem("currentUser", JSON.stringify(prev))
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
      changeIsEditing(type, false)
    } else {
      console.log("Update data failed: " + res.message)
      alert("Update data failed: " + res.message)
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

  const handleFileChange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setNewAvatar(reader.result)
    }
    setSelectedAvatar(file)
  }

  const handleUpload = async () => {
    if (!selectedAvatar) {
      console.error("No file selected for upload")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedAvatar)

    let res = await uploadImage(formData)
    if (res.success) {
      const path = res.data.fileUrl.replace("\\", "/")
      res = await updateUserProfile({ avatar: path })
      if (res.success) {
        let prev = JSON.parse(localStorage.getItem("currentUser"))
        prev = { ...prev, ...res.data }
        localStorage.setItem("currentUser", JSON.stringify(prev))
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
        onClose()
        window.location.reload()
      } else {
        console.log("Update data failed:" + res.message)
        alert("Update data failed:" + res.message)
      }
    } else {
      console.log("Upload image failed:" + res.message)
      alert("Upload image failed:" + res.message)
    }
  }

  const myOnClose = () => {
    setNewAvatar(currentUser.avatar)
    onClose()
  }


  return (
    <>
      <Flex
        my="2rem"
        gap="2rem"
        direction="column"
        align="center"
      >
        <VStack gap="2rem">
          <Avatar size="2xl" src={currentUser.avatar} onClick={onOpen} className="pointer" />
          {isEditing.name ?
            <HStack gap="1rem" justify="center">
              <Input
                value={currentUser.name}
                onChange={e => onInputChange(e, "name")} />
              <IoCheckmarkOutline
                size="2rem"
                className="pointer"
                onClick={() => handleUpdate("name")} />
              <IoClose
                size="2rem"
                className="pointer"
                onClick={() => changeIsEditing("name", false)} />
            </HStack> :
            <HStack
              gap="1rem"
              justify="center">
              <Heading>{currentUser.name}</Heading>
              <FaEdit
                className="pointer"
                onClick={() => changeIsEditing("name", true)}
              />
            </HStack>
          }
        </VStack>

        <Grid
          templateAreas={`"bio1 bio2 bio3"
                          "phone1 phone2 phone3"`}
          gridTemplateRows={"1fr 1fr"}
          gridTemplateColumns={"1fr 10fr 1fr"}
          maxW="lg"
          alignItems="center"
          gap="1rem"
          px="2rem"
          color="gray.600"
        >
          <GridItem area={"phone1"}>
            <FaMobileAlt />
          </GridItem>
          <GridItem area={"phone2"}>
            {isEditing.phone
              ?
              <Input value={currentUser.phone} onChange={e => onInputChange(e, "phone")} />
              :
              <Text>{currentUser.phone}</Text>
            }
          </GridItem>
          <GridItem area={"phone3"} justifySelf="right">
            {isEditing.phone
              ?
              <HStack>
                <IoCheckmarkOutline className="pointer" onClick={() => handleUpdate("phone")} />
                <IoClose className="pointer" onClick={() => changeIsEditing("phone", false)} />
              </HStack>
              :
              <FaEdit className="pointer" onClick={() => changeIsEditing("phone", true)} />
            }
          </GridItem>
          <GridItem area={"bio1"}>
            <FaRegUser />
          </GridItem>
          <GridItem area={"bio2"}>
            {isEditing.bio
              ?
              <Textarea value={currentUser.bio} onChange={e => onInputChange(e, "bio")} />
              :
              <Text>{currentUser.bio}</Text>
            }
          </GridItem>
          <GridItem area={"bio3"} justifySelf="right">
            {isEditing.bio
              ?
              <HStack>
                <IoCheckmarkOutline className="pointer" onClick={() => handleUpdate("bio")} />
                <IoClose className="pointer" onClick={() => changeIsEditing("bio", false)} />
              </HStack>
              :
              <FaEdit className="pointer" onClick={() => changeIsEditing("bio", true)} />
            }
          </GridItem>
        </Grid>
      </Flex>

      <Modal isOpen={isOpen} onClose={myOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb="1rem">Change Your Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap="2rem">
              <Avatar size="xl" src={newAvatar ? newAvatar : currentUser.avatar} />
              <input type="file" name="file" id="file" onChange={handleFileChange} className="upload-input" />
              <label for="file" className="upload-label">Choose an image</label>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="yellow"
              onClick={handleUpload} mr={3}
              isDisabled={newAvatar === currentUser.avatar}
            >
              Upload
            </Button>
            <Button onClick={myOnClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}