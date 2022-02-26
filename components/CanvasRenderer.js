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

const CanvasRenderer = ({base64image, textColor, textSize, boxIndex}) => {
    const canvasRef = useRef(null);
    const maxCanvasRef = useRef(null);
    const [image, setImage] = useState(null)
    const [maxImage, setMaxImage] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)

    const width = 1080
    const height = 1560
    const minWidth = 270
    const minHeight = 390

    const handleCanvasClick = () => {
        setIsOpen(true)
        const _image = new Image();
        _image.src = `data:image/png;base64,${base64image}`;
        _image.onload = () => setMaxImage(_image)
    }

    const handleDownloadClick = () => {
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
            ctx.drawImage(image, 0,0, minWidth, minHeight)

            ctx.font = `${textSize} Sofia`
            ctx.fillStyle = textColor
            ctx.textAlign = "center"

            ctx.fillText("TEST!", (minWidth / 2), (minHeight / 2))
        }
      }, [image])

    useEffect(() => {
        if (image && maxCanvasRef) {
            
            const ctx = maxCanvasRef.current.getContext('2d')
            ctx.drawImage(image,0, 0, width, height)

            ctx.font = `${textSize} Sofia`
            ctx.fillStyle = textColor
            ctx.textAlign = "center"

            ctx.fillText("TEST!", (width / 2), (height / 2))
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
