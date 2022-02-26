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
    const canvasRef_2 = useRef(null);
    const [image, setImage] = useState(null)
    const [image_2, setImage_2] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const width = 1080
    const height = 1560
    const divider = 2

    const handleCanvasClick = () => {
        setIsOpen(true)
        const _image = new Image();
        _image.src = `data:image/png;base64,${base64image}`;
        _image.onload = () => setImage_2(_image)
    }

    const handleDownloadClick = () => {
        const _canvas = document.getElementById('canvas_2')
        const pdf = new jsPDF();
        pdf.addImage(_canvas, 'PNG', 0, 0);
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
            ctx.drawImage(image, 0,0, 270, 390)

            ctx.font = `${textSize} Sofia`
            ctx.fillStyle = textColor
            ctx.textAlign = "center"

            ctx.fillText("TEST!", (270 / 2), (390 / 2))
        }

      }, [image])

    useEffect(() => {
        if (image && canvasRef_2) {
            
            const ctx = canvasRef_2.current.getContext('2d')
            ctx.drawImage(image,0, 0, width/divider, height/divider)

            ctx.font = `${textSize} Sofia`
            ctx.fillStyle = textColor
            ctx.textAlign = "center"

            ctx.fillText("TEST!", ((width/divider) / 2), ((height/divider) / 2))
        }

    }, [image_2])

    return (
        image == null ? (
            <Skeleton height='390px' width='270px'/>
        ): (
            <>
                <canvas
                    onClick={handleCanvasClick}
                    id="canvas"
                    ref={canvasRef}
                    width={270}
                    height={390}
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
                                id="canvas_2"
                                ref={canvasRef_2}
                                width={width/divider}
                                height={height/divider}
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
