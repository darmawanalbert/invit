import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Grid, GridItem, Flex, Spacer, Input, Button, Center } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'

import React, {useState, useEffect, useRef} from 'react'
import uuid from 'react-uuid'
import axios from 'axios';
import CanvasRenderer from '../components/CanvasRenderer'

export default function Home({ apiUrl }) {
  // Sample usage: axios.post(`${apiUrl}/generate-design`)

  const [image, setImage] = useState(null)
  const [sessionId, setSessionId] = useState('')
  const [invitationList, setInvitationList] = useState([])

  const generateSessionId = () => {
    return uuid()
  }

  const getData = async (sessionId) => {
    const res = await axios.post(`${apiUrl}/generate-design`, {"sessionId" : sessionId});
    return await res.data
  }

  useEffect(() => {
    setSessionId(generateSessionId())
    getData(sessionId).then(data => {
      console.log(data.invitationList)
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
        <Button colorScheme='green'>Download</Button>
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
          Text Data
        </Box>
        <Box padding={'10px'}>
          <Input placeholder='Data text' />
          <Input placeholder='Data text' marginTop={'10px'}/>
          <Input placeholder='Data text' marginTop={'10px'}/>
          <Input placeholder='Data text' marginTop={'10px'}/>
        </Box>
        <Box padding={'10px'}>
          Slider Data 1
        </Box>
        <Box padding={'10px'}>
        <Slider aria-label='slider-ex-1' defaultValue={30}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        </Box>
        <Box padding={'10px'}>
          Slider Data 1
        </Box>
        <Box padding={'10px'}>
        <Slider aria-label='slider-ex-1' defaultValue={30}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        </Box>
        <Box padding={'10px'}>
          Slider Data 1
        </Box>
        <Box padding={'10px'}>
        <Slider aria-label='slider-ex-1' defaultValue={30}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        </Box>
      </GridItem>        
      <GridItem colSpan={3} border={'1px solid #CCC'} overflow={'scroll'}>
        <Grid templateColumns='repeat(4, 1fr)' gap={6} padding={'10px'}>
          {
            invitationList.map((invitationObject, index) => (
              <Box h='390' key={String(index)}>
                <Center>
                  <CanvasRenderer 
                    image={invitationObject.bgBase64}
                    textColor={invitationObject.textColor}
                    textSize={invitationObject.textSize}
                  />
                </Center>
              </Box>
            ))
          }
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
