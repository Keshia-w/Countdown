import {
    Box,
    Text,
    Flex,
    Card
} from '@chakra-ui/react'

type LettersProps = {
    letters: string[];
  };
 
function Letters ({letters}: LettersProps)  {

    return(
        <Box>
            <Flex justifyContent={"space-between"} gap="10px">
                {Array(10)
                .fill("")
                .map((_, index) => (
                    <Card w="100px" h="100px" key={index}>
                    <Text fontSize="60px">{letters[index] || ""}</Text>
                    </Card>
                ))}
            </Flex>
        </Box>
    )
}

export default Letters;