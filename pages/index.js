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
  Center,
  Skeleton,
  Stack,
  Textarea
} from '@chakra-ui/react'

import React,
{useState, useEffect, useRef} from 'react'
import uuid from 'react-uuid'
import axios from 'axios';
import CanvasRenderer from '../components/CanvasRenderer'

export default function Home({ apiUrl }) {
  // Sample usage: axios.post(`${apiUrl}/generate-design`)

  const [sessionId, setSessionId] = useState('')
  const [invitationList, setInvitationList] = useState([])

  const [partnerOne, setPartnerOne] = useState('')
  const [partnerTwo, setPartnerTwo] = useState('')
  const [date, setDate] = useState('')
  const [place, setPlace] = useState('')

  const generateSessionId = () => {
    return uuid()
  }

  const getData = async (sessionId) => {
    const res = await axios.post(`${apiUrl}/generate-design`, {"sessionId" : sessionId});
    return await res.data
  }

  useEffect(() => {
    const sessionId = generateSessionId()
    setSessionId(sessionId)
    getData(sessionId).then(data => {
      setInvitationList(data.invitationList)
    })
  },[])

  return (
    <>
    <Flex as="header" position="fixed" w="100%" bg={'white'} border={'1px solid #CCC'}>
      <Box p='4'>
        Alternative Design
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
        <Box padding={'10px'}>
          Detail Information
        </Box>
        <Box padding={'10px'}>
          <Input placeholder='Partner One' />
          <Input placeholder='Partner Two' marginTop={'10px'}/>
          <Input type={'date'} placeholder='Date' marginTop={'10px'}/>
          <Input placeholder='Place' marginTop={'10px'}/>
        </Box>
        <Box padding={'10px'}>
          <Textarea placeholder='Tell your story' />
        </Box>
        <Box padding={'10px'}>
        <Stack direction='row' spacing={4} align='center'>
          <Button>Darker</Button>
          <Button>Lighter</Button>
        </Stack>
        </Box>
        
      </GridItem>        
      <GridItem colSpan={3} border={'1px solid #CCC'} overflow={'scroll'}>
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {invitationList.length === 0 ? (
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
                    boxIndex={String(index)}
                  />
                </Center>
              </Box>
            ))
          )}  
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
