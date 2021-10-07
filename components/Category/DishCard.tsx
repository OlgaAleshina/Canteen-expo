import React from "react";
import {Box, AspectRatio, Image, Stack, Heading, Text, IconButton, Icon, HStack} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { DishCartProps} from "../../types";

const DishCard: React.FC<DishCartProps> = ({dish, onAddButton}) => {

    return (
        <Box
            mt="2"
            pb="2"
            width="100%"
            shadow={1}
            key={dish.name}
            _light={{ backgroundColor: 'primary.background_card_dish' }}
            _dark={{ backgroundColor: 'primary.background_card_dish' }}
        >
            {dish.photo && (
                <Box>
                    <AspectRatio ratio={16 / 9}>
                        <Image
                        source={{uri: `${dish.photo}`}}
                        alt="image"
                        />
                    </AspectRatio>
                </Box>
            )}
            <Stack pl="2" pr="2" space={3}>
                <Stack space={2}>
                    <Heading size="md" ml="-1">
                    {dish.name}
                    </Heading>
                </Stack>
                <HStack alignItems="center" space={4} justifyContent="space-between">
                    <Stack width="70%">
                        <Text fontWeight="400" fontSize="xs">{dish.structure}</Text>
                        <Text fontWeight="400">
                            <Text color="primary.price_card_dish">{dish.price} Р</Text>
                             / {dish.weight} {dish.type_measure}
                        </Text>
                    </Stack>
                    <IconButton
                        bg="red"
                        icon={<Icon as={AntDesign} name="pluscircleo" color="primary.button_send_to_bucket" />}
                        borderRadius="full"
                        onPress={()=>onAddButton(dish)}
                    />
                </HStack>
            </Stack>
      </Box>
    )
}

export default DishCard;