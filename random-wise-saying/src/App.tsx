import React from 'react';
import Flex from './components/Flex';
import Box from './components/Box';
import { VscListUnordered } from 'react-icons/vsc';

function App() {
  return (
    <>
      <Flex position={"fixed"} right="64px" top={"64px"}>
        <Flex 
          bg="#2699FB" width={"48px"} top={"48px"} borderRadius={"4px"}
          alignItems="center" justifyContent={"center"}
        >
          <VscListUnordered color='white' fontSize={"32px"}/>
        </Flex>
      </Flex>
      <Flex 
        flexDirection={"column"} 
        alignItems="center" 
        justifyContent="center"
        height={"100vh"}
        px={"16px"}
      >
        <Box fontSize={"24px"}>
          오늘의 명언
        </Box>
        <Flex
          mt="64px"
          mb="16px"
          border={"1px solid #707070"}
          alignItems={"center"} justifyContent={"center"}
          width={"100%"} 
          height={"160px"} fontSize={"48px"}
        >
          웃으면 복이 옵니다~~~
        </Flex>
        <Box fontSize={"24px"}>
          react study
        </Box>

      </Flex>
    </>
  );
}

export default App;
