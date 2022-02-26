import { useEffect, useRef, useState } from "react";
import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    Box,
    Lorem,
    Button
} from '@chakra-ui/react'

const CanvasRenderer = ({base64image, textColor, textSize, boxIndex}) => {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)


    const onOpen = () => {
        setIsOpen(true)
    }

    function BasicUsage() {
        return (
          <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>Text</Box>
                </ModalBody>
      
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      }

    return (
        <BasicUsage />
    )
}

export default CanvasRenderer;
