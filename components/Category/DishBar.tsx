import React, {useState} from "react";
import {Animated} from "react-native";
import {Box, Pressable, ScrollView} from "native-base";

import { DishBarProps } from "../../types";


const DishBar: React.FC<DishBarProps> = ({categories, onCategoryClick }) => {

    const [index, setIndex] = useState<number| null>(null);
    
    return (
        <ScrollView horizontal={true}>
                {categories.map((item, i) => {
                    const borderColor = index === i ? '#FF0000' : '#fff';
                    return (
                        <Box
                            borderBottomWidth="3"
                            bg="primary.menu_scroll"
                            borderColor={borderColor}
                            p="3"
                            key={item.id}
                            >
                                <Pressable
                                color="primary.text_menu_scroll"
                                    onPress={() => {
                                        setIndex(i);
                                        onCategoryClick({id: item.id, name: item.name})
                                    }}>
                                        {item.name}
                                </Pressable>
                        </Box>
                    )})
                }
        </ScrollView>
    )
}

export default DishBar;