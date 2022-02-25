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
import axios from 'axios';

export default function Home({ apiUrl }) {
  // Sample usage: axios.post(`${apiUrl}/generate-design`)

  const [image, setImage] = useState(null)
  const canvas1 = useRef(null)
  const canvas2 = useRef(null)
  const canvas3 = useRef(null)
  const canvas4 = useRef(null)

  const getData = async () => {
    const res = await axios.get('https://httpbin.org/get');
    console.log(res.data)
  }

  useEffect(() => {
    const catImage = new Image()
    // catImage.crossOrigin = "anonymous";
    catImage.onload = () => setImage(catImage)

    getData()

  },[])

  useEffect(() => {
    if (image && canvas1) {
      const ctx1 = canvas1.current.getContext('2d')
      ctx1.fillStyle = "black"
      ctx1.fillRect(0, 0, 600, 512 + 80)
      ctx1.drawImage(image, (600 - 512) / 2, 40)      
      
      const ctx2 = canvas2.current.getContext('2d')
      ctx2.fillStyle = "black"
      ctx2.fillRect(0, 0, 600, 512 + 80)
      ctx2.drawImage(image, (600 - 512) / 2, 40)

      const ctx3 = canvas3.current.getContext('2d')
      ctx3.fillStyle = "black"
      ctx3.fillRect(0, 0, 600, 512 + 80)
      ctx3.drawImage(image, (600 - 512) / 2, 40)

      const ctx4 = canvas4.current.getContext('2d')
      ctx4.fillStyle = "black"
      ctx4.fillRect(0, 0, 600, 512 + 80)
      ctx4.drawImage(image, (600 - 512) / 2, 40)
    }
  }, [image])

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
          <Box h='390'>
            <Center>
              <canvas
                id="canvas"
                ref={canvas1}
                width={270}
                height={390}
              ></canvas>
            </Center>
          </Box>
          <Box h='390'>
            <Center>
              <canvas
                id="canvas"
                ref={canvas2}
                width={270}
                height={390}
              ></canvas>
            </Center>
          </Box>
          <Box h='390'>
            <Center>
              <canvas
                id="canvas"
                ref={canvas2}
                width={270}
                height={390}
              ></canvas>
            </Center>
          </Box>
          <Box h='390'>
            <Center>
              <canvas
                id="canvas"
                ref={canvas2}
                width={270}
                height={390}
              ></canvas>
            </Center>
          </Box>
        </Grid>
        <Grid templateColumns='repeat(4, 1fr)' gap={6} padding={'10px'}>
          <Box h='390' >
            <canvas
              id="canvas"
              ref={canvas4}
              width={270}
              height={390}
            ></canvas>
          </Box>
          <Box h='390' bg='blue.500' ></Box>
          <Box h='390' bg='blue.500' ></Box>
          <Box h='390' bg='blue.500' ></Box>
        </Grid>
        <Grid templateColumns='repeat(4, 1fr)' gap={6} padding={'10px'}>
          <Box h='390' bg='blue.500' ></Box>
          <Box h='390' bg='blue.500' ></Box>
          <Box h='390' bg='blue.500' ></Box>
          <Box h='390' bg='blue.500' ></Box>
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
