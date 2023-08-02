import React, { useEffect, useState } from 'react';
import Flex from './components/Flex';
import Box from './components/Box';
import { VscAdd, VscArrowLeft, VscEdit, VscListUnordered, VscTrash } from 'react-icons/vsc';
import axios from 'axios';
import Data from './interface/Data';

function App() {
  const [page, setPage] = useState<'main' | 'edit'>('main');
  const [nowData, setNowData] = useState<null | Data>(null);
  const [error, setError] = useState('');

  useEffect(()=>{
    if(page === 'main') {
      //CORS Error 발생함 - BackEnd에서 컨트롤 필요
      axios.get("http://localhost:3000/random").then(
        e=> setNowData(e.data)
      ).catch(() => setError('명언을 불러오지 못했습니다')); 
    }

  }, [page]);

  if (page === 'main') {
    return (
      <>
        <Flex position={"fixed"} right="64px" top={"64px"}>
          <Flex 
            bg="#2699FB" width={"48px"} height={"48px"} borderRadius={"4px"}
            alignItems="center" justifyContent={"center"}
            onClick={() => setPage('edit')}
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
            style = {{
              whiteSpace:"nowrap"
            }}
            px="32px"
            overflowX={"scroll"}
            mt="64px"
            mb="16px"
            border={"1px solid #707070"}
            alignItems={"center"} justifyContent={"center"} maxWidth={"1000px"}
            width={"100%"} 
            height={"160px"} fontSize={"48px"}
          >
            {error.length > 0 && error}
            {nowData?.message}
          </Flex>
          <Box fontSize={"24px"}>
            {nowData?.author}
          </Box>

        </Flex>
      </>
    );
  }
  return (
    <Flex pt="64px" pl="64px" flexDirection={"column"}>
      <Flex 
        pb="44px"
        style={{
          gap:"44px"
        }}>
        <Flex 
          bg="#2699FB" width={"48px"} height={"48px"} borderRadius={"4px"}
          alignItems="center" justifyContent={"center"}
          onClick={() => setPage('main')}
        >
          <VscArrowLeft color='white' fontSize={"32px"}/>
        </Flex>
        <Flex 
          bg="#2699FB" width={"48px"} height={"48px"} borderRadius={"4px"}
          alignItems="center" justifyContent={"center"}
          onClick={() => setPage('main')}
        >
          <VscAdd color='white' fontSize={"32px"}/>
        </Flex>
      </Flex>

      <Flex width="416px" height="48px">
        <Flex border={"solid 1px #707070"} flex ={1}>
        </Flex>
        <Flex 
          bg="#2699FB" width={"48px"} height={"48px"} borderRadius={"4px"}
          alignItems="center" justifyContent={"center"}
          onClick={() => setPage('main')}
        >
          <VscEdit color='white' fontSize={"32px"}/>
        </Flex>
        <Flex
          bg="#FF0C0C" width={"48px"} height={"48px"} borderRadius={"4px"}
          alignItems="center" justifyContent={"center"}
          onClick={() => setPage('main')}
        >
          <VscTrash color='white' fontSize={"32px"}/>
        </Flex>
        
      </Flex>
    </Flex>
  );
}

export default App;
