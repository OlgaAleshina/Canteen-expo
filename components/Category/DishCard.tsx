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
            _light={{ backgroundColor: 'gray.50' }}
            _dark={{ backgroundColor: 'gray.700' }}
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
                        <Text fontWeight="400">{dish.price} / {dish.weight} {dish.type_measure}</Text>
                    </Stack>
                    <IconButton
                        icon={<Icon as={AntDesign} name="pluscircleo" color="grey" />}
                        borderRadius="full"
                        _pressed={{
                            bg: "orange.600:alpha.20",
                        }}
                        onPress={()=>onAddButton(dish)}
                    />
                </HStack>
            </Stack>
      </Box>
    )
}

export default DishCard;