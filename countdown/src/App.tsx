import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios' 
import {
  Box,
  Text,
  Button,
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
  marginTop: "40px",

}

function App() {
  const vowels = ["A", "E", "I", "O", "U"];
  const consonants = 
  ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", 
  "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];

  //for popup modal
  const {isOpen, onClose} = useDisclosure({ defaultIsOpen: true});

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

  const [rounds, setRounds] = useState<number>(0);
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
  
        // Find the longest word and open the modal
        (async () => {
          const longest = await findLongestWord();
          setLongestWord(longest || "No valid words found!");
          onRoundEndOpen();
        })();
      }
    }, 1000);
  };

  //guesses function
  const [currentWord, setCurrentWord] = useState<string>("");

  const [guessedWords, setGuessedWords] = useState<string[]>([]);

  const handleWordSubmit = async () => {
    if (currentWord.length === 0 || !isValidWord(currentWord)) {
      alert("Invalid word based on selected letters!");
      setCurrentWord("");
      return;
    }
  
    const isRealWord = await checkWordValidity(currentWord);
  
    if (isRealWord) {
      setGuessedWords([...guessedWords, currentWord]);
      setPoints((prevPoints) => prevPoints + currentWord.length);
    } else {
      alert(`${currentWord} is not a valid word!`);
    }
  
    setCurrentWord("");
  };

  //word validation
  const isValidWord = (word: string): boolean => {
    const letterMap: { [key: string]: number } = {};
    for (const letter of selectedLetters) {
      letterMap[letter] = (letterMap[letter] || 0) + 1;
    }
  
    for (const letter of word) {
      if (!letterMap[letter] || letterMap[letter] <= 0) {
        return false;
      }
      letterMap[letter]--;
    }
    return true;
  };

  const checkWordValidity = async (word: string): Promise<boolean> => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      console.log("API response:", response.data);
  
      // Check if the response contains valid meanings
      return Array.isArray(response.data) && response.data.length > 0;
    } catch (error) {
      console.error("Word not found:", word, error);
      return false;
    }
  };

  //find and display longest possible word
  const [longestWord, setLongestWord] = useState<string>("");

  const findLongestWord = async () => {
    let longest = "";
    for (const word of guessedWords) {
      if (word.length > longest.length) {
        longest = word;
      }
    }
    return longest;
  };

  const {
    isOpen: isRoundEndOpen,
    onOpen: onRoundEndOpen,
    onClose: onRoundEndClose
  } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    if (!isRunning && timer === 0) {
      (async () => {
        const longest = await findLongestWord();
        setLongestWord(longest || "No valid words found!");
        onRoundEndOpen();  // Trigger the round-end modal
      })();
    }
  }, [isRunning, timer]);

  return (
    <Box alignItems={"center"}>

      {/* Learn how to play the game and start the first round */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent 
        width="500px" 
        height="300px" 
        justifyContent={'space-between'} 
        padding="30px">
          
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
            marginLeft="125px"
            onClick={() => {
              onClose();
              setRounds(1);
            }}
          >
            Start round {rounds + 1}
          </Button>
        </ModalContent>
      </Modal>

      <Text fontSize={"50px"} fontWeight={"larger"}>Countdown</Text>

      <Text fontSize={"20px"} fontWeight={"md"}>Round: {rounds}</Text>

      <Flex justifyContent="center" gap ="20px" style={Styles}>

        <Letters letters={selectedLetters}/>

        <CircularProgress
          size="60px" 
          marginTop="15px" 
          color="green.400" 
          value={progress} 
          max={100}>
          <CircularProgressLabel></CircularProgressLabel>
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
      isDisabled={isRunning || rounds > 4}>Start!</Button>

      <Text style={Styles}>Enter all the words you can make from the letters!</Text>
  
      <Flex justifyContent="center" gap ="20px">
        <Input 
        style={Styles} 
        w="250px" 
        borderWidth={"3px"}   value={currentWord}
        onChange={(e) => setCurrentWord(e.target.value.toUpperCase())}></Input>

        <Button
        marginTop="40px"
          onClick={handleWordSubmit}
          isDisabled={isRunning === false || currentWord.length === 0}
        >
          Submit
        </Button>
      </Flex>

      <Text style={Styles}>Your guesses will display below: </Text>

      <Textarea 
      marginTop="20px" 
      borderWidth={"3px"}
      value={guessedWords.join("\n")}
      isReadOnly></Textarea>

      <Text fontSize="20px">
        Total Points: {points}
      </Text>

      <Modal isOpen={isRoundEndOpen} onClose={onRoundEndClose}>
        <ModalOverlay />
        <ModalContent width="500px" height="300px" padding="20px">
          <Text fontSize="20px" fontWeight="bold">Round {rounds - 1} Results</Text>
          <Text>Total Points: {points}</Text>
          <Text>Longest Word: {longestWord}</Text>
          <Button
            marginTop="20px"
            onClick={() => {
              onRoundEndClose();
              if (rounds < 4) {
                setRounds(rounds + 1);
                setSelectedLetters([]);
                setTimer(60);
                setProgress(100);
              }
            }}
          >
            {rounds < 4 ? "Start Next Round" : "Game Over"}
          </Button>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default App;
