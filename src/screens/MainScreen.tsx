import React, { FC, useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, Image, Dimensions } from "react-native";

import { AddTodo, AppTodo } from "../components";
import { ScreenContext } from "../store/screen/screenContext";
import { TodoContext } from "../store/todo/todoContext";
import { Todo } from "../interfaces/todo";
import { Indentations } from "../../assets/styles";

const MainScreen: FC = () => {
    const { addTodo, todos, removeTodo } = useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);

    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get("window").width - Indentations.PADDING_HORIZONTAL * 2
    );

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get("window").width - Indentations.PADDING_HORIZONTAL * 2;
            setDeviceWidth(width);
        };

        Dimensions.addEventListener("change", update);

        return () => {
            Dimensions.removeEventListener("change", update);
        }
    });

    return (
        <View >
            <AddTodo onSubmit={ addTodo } />
            { !!todos.length
                ? (
                    <View style={{ width: deviceWidth }} >
                        <FlatList
                            data={ todos }
                            keyExtractor={ (item: Todo) => item.id }
                            renderItem={({ item }) => (
                                <AppTodo
                                    onDelete={ removeTodo }
                                    todo={ item }
                                    onOpen={ changeScreen }
                                />
                            )}
                        />
                    </View>)
                : (
                    <View style={ styles.imageWrapper } >
                        <Image
                            source={ require('../../assets/noItems.png') }
                            style={ styles.image }
                        />
                    </View>
                )
            }
        </View>
    )
};

const styles = StyleSheet.create({
    imageWrapper: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        height: 300
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    }
});

export default MainScreen;