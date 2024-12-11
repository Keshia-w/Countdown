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
  Input
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

  return (
    <Box alignItems={"center"}>

      <Text fontSize={"50px"} fontWeight={"larger"}>Countdown</Text>

      <Flex justifyContent="center" style={Styles}>
        <Letters />
      </Flex>

      <Flex justifyContent="center" gap="80px" style={Styles}>
          <Button>
            Vowel
          </Button>

          <Button>
            Consonant
          </Button>
      </Flex>

      <Text style={Styles}>Enter all the words you can make from the letters!</Text>

      <Input style={Styles} w="250px"></Input>
    </Box>
  )
}

export default App
