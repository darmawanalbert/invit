import { useEffect, useRef, useState } from "react";
import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    Skeleton,
    Button,
    Box,
    Center
} from '@chakra-ui/react'

import uuid from 'react-uuid'
import { jsPDF } from "jspdf";

const CanvasRenderer = ({base64image, textColor, textSize, partnerOne, partnerTwo, date, place, boxIndex}) => {
    const canvasRef = useRef(null);
    const maxCanvasRef = useRef(null);
    const [image, setImage] = useState(null)
    const [maxImage, setMaxImage] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)

    const width = 270 * 2
    const height = 390 * 2
    const minWidth = 270
    const minHeight = 390

    const handleCanvasClick = () => {
        setIsOpen(true)
        const _image = new Image();
        _image.src = `data:image/png;base64,${base64image}`;
        _image.onload = () => setMaxImage(_image)
    }

    const handleDownloadClick = () => {
        // const _canvas = document.getElementById('canvas')
       
        setIsOpen(false)

        const ctx = maxCanvasRef.current.getContext('2d')

        width = width * 2
        height = height * 2

        const scaledTextSize = (width / minWidth) * textSize
        ctx.canvas.width  = width;
        ctx.canvas.height = height
        
        ctx.drawImage(image, 0,0, width, height)
        ctx.font = `${scaledTextSize}px Caveat Brush`
        ctx.fillStyle = textColor
        ctx.textAlign = "center"

        ctx.fillText(partnerOne, (width/2), 1 * scaledTextSize +  0.25 * (height))
        ctx.fillText("&", (width/2), 2 * scaledTextSize +  0.25 * (height))
        ctx.fillText(partnerTwo, (width/2), 3.0 * scaledTextSize +  0.25 * (height))

        ctx.font = `${10 * (width / minWidth)}px Roboto`
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"
        
        ctx.fillText("You are cordially invited to:", (width/2), 0.2 * (height))
        
        ctx.font = `${14 * (width / minWidth)}px Montserrat`
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"
        ctx.fillText("Wonderful Wedding~~", (width/2), 3.0 * scaledTextSize +  0.35 * (height))
        ctx.fillText(date, (width/2), 3.0 * scaledTextSize +  0.4 * (height))
        ctx.fillText(place, (width/2), 3.0 * scaledTextSize +  0.45 * (height))

        const _canvas = document.getElementById('maxCanvas')
        const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [width, height] });
        pdf.addImage(_canvas, 'PNG', 0, 0, width, height);
        pdf.save(`${uuid()}.pdf`);
        
      }

    useEffect(() => {
        const _image = new Image();
        _image.src = `data:image/png;base64,${base64image}`;
        _image.onload = () => setImage(_image)
    },[]);

    useEffect(() => {
        if (image && canvasRef) {
            const ctx = canvasRef.current.getContext('2d')
            const scaledTextSize = 1.0 * textSize
            ctx.drawImage(image, 0,0, minWidth, minHeight)
            ctx.font = `${scaledTextSize}px Caveat Brush`
            ctx.fillStyle = textColor
            ctx.textAlign = "center"

            ctx.fillText(partnerOne, (minWidth/2), 1 * scaledTextSize +  0.25 * (minHeight))
            ctx.fillText("&", (minWidth/2), 2 * scaledTextSize +  0.25 * (minHeight))
            ctx.fillText(partnerTwo, (minWidth/2), 3.0 * scaledTextSize +  0.25 * (minHeight))

            ctx.font = `10px Roboto`
            ctx.fillStyle = "#000000"
            ctx.textAlign = "center"
            
            ctx.fillText("You are cordially invited to:", (minWidth/2), 0.2 * (minHeight))
            
            ctx.font = `14px Montserrat`
            ctx.fillStyle = "#000000"
            ctx.textAlign = "center"
            ctx.fillText("Wonderful Wedding~~", (minWidth/2), 3.0 * scaledTextSize +  0.35 * (minHeight))
            ctx.fillText(date, (minWidth/2), 3.0 * scaledTextSize +  0.4 * (minHeight))
            ctx.fillText(place, (minWidth/2), 3.0 * scaledTextSize +  0.45 * (minHeight))
        }
      }, [image])

    useEffect(() => {
        if (image && maxCanvasRef) {
            
            const ctx = maxCanvasRef.current.getContext('2d')

            const scaledTextSize = (width / minWidth) * textSize
            ctx.drawImage(image, 0,0, width, height)
            ctx.font = `${scaledTextSize}px Caveat Brush`
            ctx.fillStyle = textColor
            ctx.textAlign = "center"

            ctx.fillText(partnerOne, (width/2), 1 * scaledTextSize +  0.25 * (height))
            ctx.fillText("&", (width/2), 2 * scaledTextSize +  0.25 * (height))
            ctx.fillText(partnerTwo, (width/2), 3.0 * scaledTextSize +  0.25 * (height))

            ctx.font = `${10 * (width / minWidth)}px Roboto`
            ctx.fillStyle = "#000000"
            ctx.textAlign = "center"
            
            ctx.fillText("You are cordially invited to:", (width/2), 0.2 * (height))
            
            ctx.font = `${14 * (width / minWidth)}px Montserrat`
            ctx.fillStyle = "#000000"
            ctx.textAlign = "center"
            ctx.fillText("Wonderful Wedding~~", (width/2), 3.0 * scaledTextSize +  0.35 * (height))
            ctx.fillText(date, (width/2), 3.0 * scaledTextSize +  0.4 * (height))
            ctx.fillText(place, (width/2), 3.0 * scaledTextSize +  0.45 * (height))

        }

    }, [maxImage])

    return (
        image == null ? (
            <Skeleton height='390px' width='270px'/>
        ): (
            <>
                <canvas
                    onClick={handleCanvasClick}
                    id="canvas"
                    ref={canvasRef}
                    width={minWidth}
                    height={minHeight}
                ></canvas>
                <Modal isOpen={isOpen} size='full' onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Preview</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Box>
                        <Center>
                            <canvas
                                id="maxCanvas"
                                ref={maxCanvasRef}
                                width={width}
                                height={height}
                            ></canvas>
                        </Center>
                    </Box>
                    </ModalBody>
        
                    <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost' onClick={handleDownloadClick}>Download</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>
            </>
        )
    )
}

export default CanvasRenderer;
