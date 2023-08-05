import React, { useEffect, useState } from 'react';
import Flex from './components/Flex';
import Box from './components/Box';
import { VscAdd, VscArrowLeft, VscCheck, VscClose, VscEdit, VscListUnordered, VscTrash } from 'react-icons/vsc';
import axios from 'axios';
import Data from './interface/Data';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  const [page, setPage] = useState<'main' | 'edit'>('main');
  const [nowData, setNowData] = useState<null | Data>(null);
  const [dataList, setDataList] = useState<null | Data[]>(null);
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const [createInput, setCreateInput] = useState<[string, string]>(["", ""]);
  const [editInput, setEditInput] = useState<[string, string]>(["", ""]);
  const [selectedData, setSelectedData] = useState<string | null>('');

  useEffect(()=>{
    if(page === 'main') {
      //CORS Error 발생함 - BackEnd에서 컨트롤 필요
      axios.get("http://localhost:3000/random").then(
        e=> setNowData(e.data)
      ).catch(() => setError('명언을 불러오지 못했습니다')); 
    }
    else { //page === 'edit'
      axios.get("http://localhost:3000/").then(
        e=> setDataList(e.data)
      ).catch(() => setError('명언을 불러오지 못했습니다')); 
    }

  }, [page]);

  if (page === 'main') {
    return (
      <>
        <Flex position={"fixed"} right={["16px","64px","64px"]} top={["16px","64px","64px"]}>
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
            overflowX={"scroll"}
            mt="64px"
            mb="16px"
            px="16px"
            border={"1px solid #707070"}
            alignItems={"center"} justifyContent={"center"} maxWidth={"1000px"}
            width={"100%"} 
            height={"160px"} fontSize={"48px"}
          >
            {error.length > 0 && error}
            <Box 
              width={'100%'} 
              mx="16px"
              style = {{
                whiteSpace:"pre"
              }}
            >
              {nowData?.message}{"   "}
            </Box>
          </Flex>
          <Box fontSize={"24px"}>
            {nowData?.author}
          </Box>

        </Flex>
      </>
    );
  }
  return (
    //mobile 8px, tablet & pc 64px
    <Flex pt={["8px", "64px", "64px"]} pl={["8px", "64px", "64px"]} flexDirection={"column"}>
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
          onClick={() => setCreateMode(prev => !prev)}
        >
          {
            createMode ? 
              <VscClose color="white" fontSize={"32px"}/> :
              <VscAdd color="white" fontSize={"32px"}/>
          }
        </Flex>
      </Flex>

      {
        createMode && 
        //mobile 8px, tablet & pc 64px
        <Flex width={["90%", "416px", "416px", "416px"]} height="48px" mb="16px">
          <Flex 
            border={"solid 1px #707070"} 
            flex ={1} 
            overflowX="scroll"
            style={{
              whiteSpace:'pre'
            }}
          >
            <input
              value= { createInput[0] }
              onChange= {
                (event) => setCreateInput(prev => [event.target.value, prev[1]])
              }
            />
            <input 
              value= { createInput[1] }
              onChange= {
                (event) => setCreateInput(prev => [prev[0], event.target.value])
              }
            />
          </Flex>
          <Flex 
            bg="#2699FB" width={"48px"} height={"48px"} borderRadius={"4px"}
            alignItems="center" justifyContent={"center"}
            onClick={() => {
              if (createInput[0].length === 0 || createInput[1].length === 0) {
                alert("정상적인 값이 아닙니다");
                return;
              }
              
              axios.post('/', {
                "author": createInput[0],
                "message": createInput[1]
              }).then(({ data }) => {
                if(data.rs) {
                  setDataList([]);
                  setCreateInput(["", ""]);
                  setCreateMode(false);
                  alert("생성 완료!");
                  axios.get("/")
                        .then(e => setDataList(e.data))
                        .catch(() => setError("명언을 불러오지 못했습니다."));
                }
                else
                  alert("생성 실패!");
              })
            }}
          >
            <VscCheck color='white' fontSize={"32px"}/>
          </Flex>
        </Flex>
      }
      {
        dataList?.map((data, idx) => 
          <Flex width="1200px" height="48px" mb="16px" key={data.message}>
            <Flex 
              border={"solid 1px #707070"} 
              flex ={1} 
              overflowX="scroll"
              style={{
                whiteSpace:'pre'
              }}
            >
              {
                data.message === selectedData ? 
                <>
                  <input
                    value= { editInput[0] }
                    onChange= {
                      (event) => setEditInput(prev => [event.target.value, prev[1]])
                    }
                  />
                  <input 
                    value= { editInput[1] }
                    onChange= {
                      (event) => setEditInput(prev => [prev[0], event.target.value])
                    }
                  />
                </> : `[${data.author}] ${data.message}`
              }
            </Flex>
            <Flex 
              bg="#2699FB" width={"48px"} height={"48px"} borderRadius={"4px"}
              alignItems="center" justifyContent={"center"}
              onClick={() => {
                if(data.message === selectedData) {
                  axios.put('/' + idx, {
                    "author": editInput[0],
                    "message": editInput[1]
                  }).then(({ data }) => {
                    if(data.rs) {
                      setDataList([]);
                      setEditInput(["", ""]);
                      setSelectedData(null);
                      alert("수정 완료!");
                      axios.get("/")
                            .then(e => setDataList(e.data))
                            .catch(() => setError("명언을 불러오지 못했습니다."));
                    }
                    else
                      alert("수정 실패!");
                  })
                } 
                else {
                  setSelectedData(data.message)
                  setEditInput([data.author, data.message]);
                }
              }}
            > 
              {
                data.message === selectedData ?
                <VscCheck color='white' fontSize={"32px"}/> :
                <VscEdit color='white' fontSize={"32px"}/>
              }
              
            </Flex>
            <Flex
              bg="#FF0C0C" width={"48px"} height={"48px"} borderRadius={"4px"}
              alignItems="center" justifyContent={"center"}
              onClick={() => {
                if(window.confirm("정말 해당 명언을 제거하겠습니까?")) {
                  axios.delete('/'+idx).then(({data}) => {
                    if(data.rs) {
                      // request로 새로운 명언 리스트를 가져오기 전에 
                      // 제거를 진행하면 목록이 잘못 보이는 오류가 있을 수 있어서
                      // 빈 배열을 만들어 둔다. => 깜박 거리는 현상이 있김
                      setDataList([]);
                      alert("제거 완료!");
                      axios.get("/")
                            .then(e => setDataList(e.data))
                            .catch(() => setError("명언을 불러오지 못했습니다."));
                    }
                    else
                      alert("제거 실패!");
                  });
                }
              }}
            >
              <VscTrash color='white' fontSize={"32px"}/>
            </Flex>
          </Flex>
        )
      }

      
    </Flex>
  );
}

export default App;
