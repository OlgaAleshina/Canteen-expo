import React from "react";
import { Badge, HStack, IconButton, Icon, Text, Box } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { AppBarProps } from "../types";


const AppBar: React.FC<AppBarProps> = ({navigation, title, cartCount}) => {
    
    return (
        <>
            <Box safeAreaTop backgroundColor="#6200ee" />
            <HStack bg='#6200ee' px="1" py="1" justifyContent='space-between' alignItems='center'>
                <HStack space={4} alignItems='center'>
                    <IconButton 
                            icon={<Icon size="sm" as={<MaterialIcons name='arrow-back' />} color="white"/>}
                            onPress={()=>navigation.goBack()} />
                    <Text color="white" fontSize={20} fontWeight='bold'>{title}</Text>
                </HStack>
                <HStack space={2} style={{position: "relative"}}>
                    <IconButton 
                    icon={<Icon as={<MaterialIcons name='shopping-cart' />} size='sm' color="white"/>} 
                    onPress={()=>navigation.navigate("Cart")}
                    />
                    {Boolean(cartCount) && (
                        <Badge style={{backgroundColor: "inherit", position: "absolute", right: 0}}>
                            <Text style={{color: "white", fontWeight: "bold"}}>{cartCount}</Text>
                        </Badge>
                    )}
                </HStack>
            </HStack>
        </>
    )
}

export default AppBar;