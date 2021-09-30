import React, {useState} from "react";
import {Animated} from "react-native";
import {Box, Pressable, ScrollView} from "native-base";

import { DishBarProps } from "../../types";


const DishBar: React.FC<DishBarProps> = ({categories, onCategoryClick }) => {

    const [index, setIndex] = useState<number| null>(null);
    
    return (
        <ScrollView horizontal={true}>
                {categories.map((item, i) => {
                    const borderColor = index === i ? '#FF0000' : 'coolGray.200';
                    return (
                        <Box
                            borderBottomWidth="3"
                            borderColor={borderColor}
                            p="3"
                            cursor="pointer">
                                <Pressable
                                    onPress={() => {
                                        setIndex(i);
                                        onCategoryClick({id: item.id, name: item.name})
                                    }}>
                                        <Animated.Text>{item.name}</Animated.Text>
                                </Pressable>
                        </Box>
                    )})
                }
        </ScrollView>
    )
}

export default DishBar;