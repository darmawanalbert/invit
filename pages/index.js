import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { 
  Box,
  Grid,
  GridItem,
  Flex,
  Spacer,
  Input,
  Button,
  Stack,
  Textarea,
  Center,
  Skeleton
} from '@chakra-ui/react'

import React,
{useState, useEffect, useRef, useMemo} from 'react'
import uuid from 'react-uuid'
import axios from 'axios';
import CanvasRenderer from '../components/CanvasRenderer'

export default function Home({ apiUrl }) {
  // Sample usage: axios.post(`${apiUrl}/generate-design`)

  const [sessionId, setSessionId] = useState('')
  const [invitationList, setInvitationList] = useState([])

  const [partnerOne, setPartnerOne] = useState('Indo')
  const [partnerTwo, setPartnerTwo] = useState('Mee')
  const [date, setDate] = useState('22/02/2022')
  const [place, setPlace] = useState('Melbourne')
  const [generateCanvasList, setGenerateCanvasList] = useState(handleGenerateCanvasList())
  const gridListRef = useRef(null)

  const generateSessionId = () => {
    return uuid()
  }

  function temp_handleGenerateCanvasList(){
    return (<>
      <Box h='390' key='1'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='2'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='3'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='4'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='5'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='6'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='7'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='8'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
    </>)
  }

  function handleGenerateCanvasList() {
    return (invitationList.length === 0 ? (
      <>
        <Box h='390' key='1'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='2'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='3'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='4'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='5'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='6'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='7'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
        <Box h='390' key='8'>
          <Center>
            <Skeleton height='390px' width='270px'/>
          </Center>
        </Box>
      </>
      ) : (
        invitationList.map((invitationObject, index) => (
          <Box h='390'cursor={'pointer'} padding={'10px'} key={String(index)}>
            <Center>
              <CanvasRenderer 
                base64image={invitationObject.bgBase64}
                textColor={invitationObject.textColor}
                textSize={invitationObject.textSize}
                partnerOne={partnerOne}
                partnerTwo={partnerTwo}
                date={date}
                place={place}
                apiUrl={String(apiUrl)}
              />
            </Center>
          </Box>
        ))
      ))
  }

  const handleRandom = async () => {
    setGenerateCanvasList(temp_handleGenerateCanvasList())
    axios.post(`${apiUrl}/generate-design`, {"sessionId" : sessionId, "intent" : "none" }).then(data => {
      setInvitationList(data.data.invitationList)
    }).catch(data => {
      console.log("error color lighter.")
    })
  }

  const handleColorDarker = async () => {
    setGenerateCanvasList(temp_handleGenerateCanvasList())
    axios.post(`${apiUrl}/generate-design`, {"sessionId" : sessionId, "intent" : "color_darker" }).then(data => {
      setInvitationList(data.data.invitationList)
    }).catch(data => {
      console.log("error color darker.")
    })
  }

  const handleColorLighter = async () => {
    setGenerateCanvasList(temp_handleGenerateCanvasList())
    axios.post(`${apiUrl}/generate-design`, {"sessionId" : sessionId, "intent" : "color_lighter" }).then(data => {
      setInvitationList(data.data.invitationList)
    }).catch(data => {
      console.log("error color lighter.")
    })
  }

  const handlePatternDenser = async () => {
    setGenerateCanvasList(temp_handleGenerateCanvasList())
    axios.post(`${apiUrl}/generate-design`, {"sessionId" : sessionId, "intent" : "pattern_denser" }).then(data => {
      setInvitationList(data.data.invitationList)
    }).catch(data => {
      console.log("error pattern denser.")
    })
  }

  const handlePatternSparser = async () => {
    setGenerateCanvasList(temp_handleGenerateCanvasList())
    axios.post(`${apiUrl}/generate-design`, {"sessionId" : sessionId, "intent" : "pattern_sparser" }).then(data => {
      setInvitationList(data.data.invitationList)
    }).catch(data => {
      console.log("error pattern sparser.")
    })
  }

  const handleTextSmaller = async () => {
    setGenerateCanvasList(temp_handleGenerateCanvasList())
    axios.post(`${apiUrl}/generate-design`, {"sessionId" : sessionId, "intent" : "text_smaller" }).then(data => {
      setInvitationList(data.data.invitationList)
    }).catch(data => {
      console.log("error text smaller.")
    })
  }

  const handleTextBigger = async () => {
    setGenerateCanvasList(temp_handleGenerateCanvasList())
    axios.post(`${apiUrl}/generate-design`, {"sessionId" : sessionId, "intent" : "none" }).then(data => {
      setInvitationList(data.data.invitationList)
    }).catch(data => {
      console.log(data)
    })
  }

  const getData = async (sessionId) => {
    const res = await axios.post(`${apiUrl}/generate-design`, {"sessionId" : sessionId, "intent" : "none" });
    return await res.data
  }

  useEffect(() => {
    const sessionId = generateSessionId()
    setSessionId(sessionId)
    getData(sessionId).then(data => {
      setInvitationList(data.invitationList)
    }).catch(data => {
      console.log(data)
    })
  },[])

  useEffect(() => {
    setGenerateCanvasList(temp_handleGenerateCanvasList())
    const timer = setTimeout(() => {
      setGenerateCanvasList(handleGenerateCanvasList())
    }, 1000);
    return () => clearTimeout(timer);
  }, [invitationList])

  return (
    <>
    <Flex as="header" position="fixed" w="100%" bg={'#3a668c'} border={'1px solid #CCC'}>
      <Box p='4' color={'white'} fontSize={'24px'}>
        <b>Alternative Design</b>
      </Box>
      <Spacer />
      <Box p='4' >
        {/* <Button colorScheme='green'>Download</Button> */}
      </Box>
    </Flex>
    <Grid
      padding={'10px'}
      paddingTop={'80px'}
      h='1000px'
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(4, 1fr)'
      gap={4}
    >
      <GridItem colSpan={1} border={'1px solid #CCC'} >
        <Box padding={'10px'} fontSize={'18px'}>
         <b>Detail Information</b>
        </Box>
        <Box padding={'10px'}>
          <Input placeholder='Partner One' value={partnerOne} onChange={(e) => setPartnerOne(e.currentTarget.value) } />
          <Input placeholder='Partner Two' value={partnerTwo} marginTop={'10px'} onChange={(e) => setPartnerTwo(e.currentTarget.value)} />
          <Input type={'date'} placeholder='Date' value={date} marginTop={'10px'} onChange={(e) => setDate(e.currentTarget.value)} />
          <Input placeholder='Place' marginTop={'10px'} value={place} onChange={(e) => setPlace(e.currentTarget.value)}/>
        </Box>
        <Box padding={'10px'}>
          <Textarea placeholder='Tell your story' />
        </Box>
        <Box padding={'10px'} fontSize={'18px'}>
          <b>Intent</b>
        </Box>
        <Box padding={'10px'}>
          <Stack direction='row' spacing={4} align='center'>
            <Button onClick={handleRandom}>Random</Button>
          </Stack>
        </Box>
        <Box padding={'10px'}>
          <b>I want to make the:</b>
        </Box>
        <Box padding={'10px'}>
          1. Color
        </Box>
        <Box padding={'10px'}>
          <Stack direction='row' spacing={4} align='center'>
            <Button onClick={handleColorDarker}>Darker</Button>
            <Button onClick={handleColorLighter}>Lighter</Button>
          </Stack>
        </Box>
        <Box padding={'10px'}>
          2. Pattern
        </Box>
        <Box padding={'10px'}>
          <Stack direction='row' spacing={4} align='center'>
            <Button onClick={handlePatternDenser}>Denser</Button>
            <Button onClick={handlePatternSparser}>Sparser</Button>
          </Stack>
        </Box>
        <Box padding={'10px'}>
          3. Text
        </Box>
        <Box padding={'10px'}>
          <Stack direction='row' spacing={4} align='center'>
            <Button onClick={handleTextSmaller}>Smaller</Button>
            <Button onClick={handleTextBigger}>Bigger</Button>
          </Stack>
        </Box>
        
      </GridItem>        
      <GridItem colSpan={3} border={'1px solid #CCC'} overflow={'scroll'}>
        <Grid templateColumns='repeat(4, 1fr)' gap={6} id="gridListRef" ref={gridListRef}>  
          {generateCanvasList}
        </Grid>
      </GridItem>
    </Grid>
    </>
  )
}

export async function getStaticProps() {
  const apiUrl = process.env.API_URL;
  return {
      props: {
          apiUrl,
      },
  };
}
