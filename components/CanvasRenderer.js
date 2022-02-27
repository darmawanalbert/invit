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
    Center,
    InputGroup,
    Input
} from '@chakra-ui/react'

import uuid from 'react-uuid'
import { jsPDF } from "jspdf";

import axios from 'axios';

const CanvasRenderer = ({base64image, textColor, textSize, partnerOne, partnerTwo, date, place, apiUrl, sessionId}) => {
    const canvasRef = useRef(null);
    const maxCanvasRef = useRef(null);
    const [image, setImage] = useState(null)
    const [maxImage, setMaxImage] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
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

    const handleShareClick = () => {

        setIsOpen(false)

        setIsOpen(false)

        const ctx = maxCanvasRef.current.getContext('2d')
        ctx.canvas.width = width * 2
        ctx.canvas.height = height * 2
        const scale = (ctx.canvas.width / minWidth)
        const scaledTextSize = scale * textSize
        const gap = 0

        ctx.drawImage(image, 0,0, ctx.canvas.width, ctx.canvas.height)
        
        ctx.font = `${14 * scale}px Montserrat`
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"
        ctx.fillText("JOIN", (ctx.canvas.width/2), 0.2 * (ctx.canvas.height))

        ctx.font = `${20 * scale}px Roboto`
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"
        ctx.fillText(partnerOne, (ctx.canvas.width/2), 0.3 * (ctx.canvas.height))

        ctx.font = `${scaledTextSize}px Caveat Brush`
        ctx.fillStyle = textColor
        ctx.textAlign = "center"

        gap = 1.5 * scaledTextSize +  0.3 * (ctx.canvas.height)
        ctx.fillText(partnerTwo, (ctx.canvas.width/2), gap)

        ctx.font = `${14 * scale}px Montserrat`
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"
        gap = gap + 1.5 * scaledTextSize
        ctx.fillText("Birthday Party!!", (ctx.canvas.width/2), gap)
        ctx.fillText(date, (ctx.canvas.width/2), gap + 0.05 * (ctx.canvas.height))
        ctx.fillText(place, (ctx.canvas.width/2), gap + 0.1 * (ctx.canvas.height))

        const _canvas = document.getElementById('maxCanvas')
        const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [width, height] });
        pdf.addImage(_canvas, 'PNG', 0, 0, width, height);

        const data = {
            "sessionId": sessionId,
            "invitationBase64": `${pdf.output('blob')}`,
            "num": phoneNumber,
            "inviter": `${partnerOne}'s ${partnerTwo}`
        }
        axios.post(`${apiUrl}/send-invitation`, data).then(data => {
            alert(`Invitation has been sent to: ${phoneNumber}`)
        }).catch(data => {
            console.log("error sent invitation.")
        })
    }

    const handleDownloadClick = () => {
       
        setIsOpen(false)

        const ctx = maxCanvasRef.current.getContext('2d')
        ctx.canvas.width = width * 2
        ctx.canvas.height = height * 2
        const scale = (ctx.canvas.width / minWidth)
        const scaledTextSize = scale * textSize
        const gap = 0

        ctx.drawImage(image, 0,0, ctx.canvas.width, ctx.canvas.height)
        
        ctx.font = `${14 * scale}px Montserrat`
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"
        ctx.fillText("JOIN", (ctx.canvas.width/2), 0.2 * (ctx.canvas.height))

        ctx.font = `${20 * scale}px Roboto`
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"
        ctx.fillText(partnerOne, (ctx.canvas.width/2), 0.3 * (ctx.canvas.height))

        ctx.font = `${scaledTextSize}px Caveat Brush`
        ctx.fillStyle = textColor
        ctx.textAlign = "center"

        gap = 1.5 * scaledTextSize +  0.3 * (ctx.canvas.height)
        ctx.fillText(partnerTwo, (ctx.canvas.width/2), gap)

        ctx.font = `${14 * scale}px Montserrat`
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"
        gap = gap + 1.5 * scaledTextSize
        ctx.fillText("Birthday Party!!", (ctx.canvas.width/2), gap)
        ctx.fillText(date, (ctx.canvas.width/2), gap + 0.05 * (ctx.canvas.height))
        ctx.fillText(place, (ctx.canvas.width/2), gap + 0.1 * (ctx.canvas.height))

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
            const scale =  (ctx.canvas.width / minWidth)
            const scaledTextSize = scale * textSize
            const gap = 0

            ctx.drawImage(image, 0,0, ctx.canvas.width, ctx.canvas.height)
            
            ctx.font = `${14 * scale}px Montserrat`
            ctx.fillStyle = "#000000"
            ctx.textAlign = "center"
            ctx.fillText("JOIN", (ctx.canvas.width/2), 0.2 * (ctx.canvas.height))

            ctx.font = `${20 * scale}px Roboto`
            ctx.fillStyle = "#000000"
            ctx.textAlign = "center"
            ctx.fillText(partnerOne, (ctx.canvas.width/2), 0.3 * (ctx.canvas.height))

            ctx.font = `${scaledTextSize}px Caveat Brush`
            ctx.fillStyle = textColor
            ctx.textAlign = "center"

            gap = 1.5 * scaledTextSize +  0.3 * (ctx.canvas.height)
            ctx.fillText(partnerTwo, (ctx.canvas.width/2), gap)

            ctx.font = `${14 * scale}px Montserrat`
            ctx.fillStyle = "#000000"
            ctx.textAlign = "center"
            gap = gap + 1.5 * scaledTextSize
            ctx.fillText("Birthday Party!!", (ctx.canvas.width/2), gap)
            ctx.fillText(date, (ctx.canvas.width/2), gap + 0.05 * (ctx.canvas.height))
            ctx.fillText(place, (ctx.canvas.width/2), gap + 0.1 * (ctx.canvas.height))
        }
      }, [image])

    useEffect(() => {
        if (image && maxCanvasRef) {
            
            const ctx = maxCanvasRef.current.getContext('2d')
            const scale = (ctx.canvas.width / minWidth)
            const scaledTextSize = scale * textSize
            const gap = 0

            ctx.drawImage(image, 0,0, ctx.canvas.width, ctx.canvas.height)
            
            ctx.font = `${14 * scale}px Montserrat`
            ctx.fillStyle = "#000000"
            ctx.textAlign = "center"
            ctx.fillText("JOIN", (ctx.canvas.width/2), 0.2 * (ctx.canvas.height))

            ctx.font = `${20 * scale}px Roboto`
            ctx.fillStyle = "#000000"
            ctx.textAlign = "center"
            ctx.fillText(partnerOne, (ctx.canvas.width/2), 0.3 * (ctx.canvas.height))

            ctx.font = `${scaledTextSize}px Caveat Brush`
            ctx.fillStyle = textColor
            ctx.textAlign = "center"

            gap = 1.5 * scaledTextSize +  0.3 * (ctx.canvas.height)
            ctx.fillText(partnerTwo, (ctx.canvas.width/2), gap)

            ctx.font = `${14 * scale}px Montserrat`
            ctx.fillStyle = "#000000"
            ctx.textAlign = "center"
            gap = gap + 1.5 * scaledTextSize
            ctx.fillText("Birthday Party!!", (ctx.canvas.width/2), gap)
            ctx.fillText(date, (ctx.canvas.width/2), gap + 0.05 * (ctx.canvas.height))
            ctx.fillText(place, (ctx.canvas.width/2), gap + 0.1 * (ctx.canvas.height))

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
                
                {/* Modal Preview */}
                
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
                    <InputGroup size='md'>
                        <Input
                            width={'400px'}
                            type="text"
                            placeholder='Enter phone number'
                            onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                        />
                        <Button onClick={handleShareClick}>
                            Share
                        </Button>
                    </InputGroup>
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
