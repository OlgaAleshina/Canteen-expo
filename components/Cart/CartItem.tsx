import React from "react";
import {VStack, HStack, Text, Button, IconButton, Icon} from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { View } from "react-native";

import { CartItemType } from '../../types';


type CartItemProps = {
    dish: CartItemType
}


const CartItem: React.FC<CartItemProps> = ({dish}) => {

    
    return (
    <>
        <HStack pl={2} pr={2} alignItems="center" justifyContent="space-between">
            <VStack >
                <Text>{dish.name}</Text>
                <HStack>
                    <Text>{dish.price} Р /</Text>
                    <Text>{dish.weight} {dish.type_measure}</Text>
                </HStack>
            </VStack>
            <VStack>
                <IconButton icon={<Icon as={FontAwesome5} name="times-circle" />}/>
            </VStack>
        </HStack>
        
        <HStack pl={2} pr={2} alignItems="center" justifyContent="space-between">               
                <HStack alignItems="center">
                    <IconButton icon={<Icon as={AntDesign} name="minuscircleo" color="black"/>} borderRadius="full"/>
                    <Text>{dish.amount}</Text>
                    <IconButton icon={<Icon as={AntDesign} name="pluscircleo" color="black" />} borderRadius="full"/>
                </HStack>
                <Text>{dish.totalPrice} руб</Text>
        </HStack> 
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
/>
    </>
    )
}

export default CartItem;