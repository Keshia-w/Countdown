import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import {
  Box,
  Text,
  Button,
  Grid,
  Flex,
  CircularProgress, 
  CircularProgressLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure
} from '@chakra-ui/react'
import Letters from './Components/LetterCardComponent'

const Styles = {
  marginTop: "50px",

}

function App() {
  // const [count, setCount] = useState(0)

  // const fetchAPI = async () => {
  //   const response = await axios.get("http://localhost:5050/api")
  //   console.log(response.data.fruits)
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  const rounds = 1;
  const timer = 0;
  const points = 0;
  const vowels = ["A", "E", "I", "O", "U"];
  const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
  const {isOpen, onOpen, onClose} = useDisclosure({ defaultIsOpen: true});

  //fucntion to increment rounds
  // function startRound () => {
  //   return(

  //   )
  // }

  //function for

  return (
    <Box alignItems={"center"}>

      {/* Learn how to play the game and start the first round */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="500px" height="300px" justifyContent={'space-between'} padding="30px">
          
          <Text fontWeight="bold" fontSize="20px">Welcome to my coding test!</Text>

          <Text fontWeight="bold">Game Rules</Text>

          <Text>1. Select up to 10 vowels and consonants</Text>
          <Text>2. You have 60 seconds to write as many words 
            you can from the letters.
          </Text>
          <Text>3. Each correctly guessed word will accumulate points</Text>
          <Text>4. Play up to 4 rounds</Text>

          <Button backgroundColor="green" color="white" width="120px" marginTop="10px" marginLeft="125px">Start round {rounds}</Button>
        </ModalContent>
      </Modal>

      <Text fontSize={"50px"} fontWeight={"larger"}>Countdown</Text>

      <Flex justifyContent="center" gap ="20px" style={Styles}>

        <Letters />

        <CircularProgress size ="60px" marginTop="15px" color="green.400">
          <CircularProgressLabel>{timer}</CircularProgressLabel>
        </CircularProgress>
      </Flex>

      {/* select up to 10 letters from each */}
      <Flex justifyContent="center" gap="80px" style={Styles}>
          <Button width="150px">
            Vowel
          </Button>

          <Button width="150px">
            Consonant
          </Button>
      </Flex>

      {/* start after 10 letters selected */}
      <Button marginTop="50px" backgroundColor="green" color="white" width="150px" onClick={onOpen}>Start Game!</Button>

      <Text style={Styles}>Enter all the words you can make from the letters!</Text>

      <Input style={Styles} w="250px"></Input>
    </Box>
  )
}

export default App;
