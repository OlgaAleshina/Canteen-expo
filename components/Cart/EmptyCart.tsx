import React from "react";
import { Icon, Text, VStack, Button } from "native-base";
import AppBar from "../AppBar";
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenProps } from "../../types";

type EmptyCartProps = {
    navigation: ScreenProps["navigation"],
    totalNumber?: number
}
const EmptyCart: React.FC<EmptyCartProps> = ({navigation, totalNumber}) => {
    
    return (
        <>
            <AppBar navigation={navigation} cartCount={totalNumber} title="Корзина"/>
            <VStack>
                <Text>Ваша корзина пуста</Text>
                <Button
                    variant="outline"
                    endIcon={<Icon as={MaterialIcons} name="local-restaurant" size="sm" />}
                    onPress={() => navigation.navigate("Category")}
                    size="xs"
                >
                    Продолжить покупки
                </Button>

            </VStack>
        
        </>
    )
}

export default EmptyCart;