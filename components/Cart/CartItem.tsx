import React from "react";
import {VStack, HStack, Text,IconButton, Icon, Box} from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { View } from "react-native";

import { CartItemType } from '../../types';


type CartItemProps = {
    dish: CartItemType;
    onCrossButton: ()=>void;
    onAddItem: ()=>void; 
    onDeleteItem: ()=>void;
}


const CartItem: React.FC<CartItemProps> = ({dish, onCrossButton, onAddItem, onDeleteItem}) => {

    
    return (
    <Box key={dish.id}>
        <HStack pl={2} pr={2} alignItems="center" justifyContent="space-between">
            <VStack >
                <Text>{dish.name}</Text>
                <HStack>
                    <Text>{dish.price} Р /</Text>
                    <Text>{dish.weight} {dish.type_measure}</Text>
                </HStack>
            </VStack>
            <VStack>
                <IconButton onPress={onCrossButton} icon={<Icon as={FontAwesome5} name="times-circle" />}/>
            </VStack>
        </HStack>
        
        <HStack pl={2} pr={2} alignItems="center" justifyContent="space-between">               
                <HStack alignItems="center">
                    <IconButton onPress={onDeleteItem} icon={<Icon as={AntDesign} name="minuscircleo" color="black"/>} borderRadius="full"/>
                    <Text>{dish.amount}</Text>
                    <IconButton onPress={onAddItem} icon={<Icon as={AntDesign} name="pluscircleo" color="black" />} borderRadius="full"/>
                </HStack>
                <Text>{dish.totalPrice} руб</Text>
        </HStack> 
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
/>
    </Box>
    )
}

export default CartItem;