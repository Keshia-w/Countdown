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
  Textarea,
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
  const vowels = ["A", "E", "I", "O", "U"];
  const consonants = 
  ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", 
  "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];

  const guesses = [""];
  const {isOpen, onOpen, onClose} = useDisclosure({ defaultIsOpen: true});

  //add letters function
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const addVowel = () => {
    if (selectedLetters.length < 10) {
      const randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
      setSelectedLetters([...selectedLetters, randomVowel]);
    }
  };

  const addConsonant = () => {
    if (selectedLetters.length < 10) {
      const randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
      setSelectedLetters([...selectedLetters, randomConsonant]);
    }
  };

  //timer function and round increment
  const [timer, setTimer] = useState<number>(60);
  const [progress, setProgress] = useState<number>(100);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [rounds, setRounds] = useState<number>(1);
  const [points, setPoints] = useState<number>(0);  

  const timerFunction = () => {
    setIsRunning(true);
    let currentTime = 60;
  
    const interval = setInterval(() => {
      currentTime -= 1;
      setTimer(currentTime);
      setProgress((currentTime / 60) * 100);
  
      if (currentTime <= 0) {
        clearInterval(interval);
        setIsRunning(false);
  
        if (rounds < 4) {
          setRounds(prevRounds => prevRounds + 1);
          setTimer(60);  //reset timer
          setProgress(100);  //reset progress
          setSelectedLetters([]);  //clear selected letters
        }
      }
    }, 1000);
  };

    //function to accumulate points
    // const totalPoints = () => {

    // }

    //backend handling
  // const [count, setCount] = useState(0)

  // const fetchAPI = async () => {
  //   const response = await axios.get("http://localhost:5050/api")
  //   console.log(response.data.fruits)
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

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

          <Button 
          backgroundColor="green" 
          color="white" 
          width="120px" 
          marginTop="10px" 
          marginLeft="125px">Start round {rounds}</Button>
        </ModalContent>
      </Modal>

      <Text fontSize={"50px"} fontWeight={"larger"}>Countdown</Text>

      <Flex justifyContent="center" gap ="20px" style={Styles}>

        <Letters letters={selectedLetters}/>

        <CircularProgress
          size="60px" 
          marginTop="15px" 
          color="green.400" 
          value={progress} 
          max={100}>
          <CircularProgressLabel>{timer}</CircularProgressLabel>
        </CircularProgress>
      </Flex>

      {/* add letters */}
      <Flex justifyContent="center" gap="80px" style={Styles}>
          <Button width="150px" onClick={addVowel}>
            Vowel
          </Button>

          <Button width="150px" onClick={addConsonant}>
            Consonant
          </Button>
      </Flex>

      {/* start after 10 letters selected */}
      <Button 
      marginTop="50px" 
      backgroundColor="green" 
      color="white" 
      width="150px"
      onClick={timerFunction}
      isDisabled={isRunning || rounds > 4}>Start Game!</Button>

      <Text style={Styles}>Enter all the words you can make from the letters!</Text>

      <Input style={Styles} w="250px" borderWidth={"3px"}></Input>

      <Textarea marginTop="20px" borderWidth={"3px"}>{guesses}</Textarea>
    </Box>
  )
}

export default App;
