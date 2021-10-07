import React from "react";
import {Button, Icon} from "native-base";
import { FontAwesome5 } from '@expo/vector-icons'; 


type ButtonProps = {
    onClearCart: () => void
}

const ClearCartButton: React.FC<ButtonProps> = ({onClearCart}) => {

    
    return (
        <Button
            variant="outline"
            endIcon={<Icon as={FontAwesome5} name="trash" size="sm" color="#000"/>}
            onPress={onClearCart}
            size="xs"
            //color="#000"
            colorScheme="black"
        >
            Очистить корзину
        </Button>
                    
    )
}

export default ClearCartButton;