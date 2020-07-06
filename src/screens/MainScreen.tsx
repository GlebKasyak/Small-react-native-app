import React, { Component, ComponentClass } from "react";
import { observer, inject } from "mobx-react";
import { View, StyleSheet, FlatList, Image, Dimensions } from "react-native";

import { AddTodo, AppTodo, AppLoader, AppError } from "../components";
import { Todo } from "../interfaces/todo";
import { Indentations } from "../../assets/styles";
import { ScreeStoreType } from "../interfaces/screen";
import { TodoStoreType } from "../interfaces/todo";
import { StoreType } from "../store";

type Props = {
    screenStore: ScreeStoreType,
    todoStore: TodoStoreType
};

@observer
class MainScreen extends Component<Props> {
    state = {
        deviceWidth: Dimensions.get("window").width - Indentations.PADDING_HORIZONTAL * 2
    };

    componentDidMount() {
        this.props.todoStore.fetchTodos();

        Dimensions.addEventListener("change", this.update);
    };

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.update);
    };

    update = () => {
        const width = Dimensions.get("window").width - Indentations.PADDING_HORIZONTAL * 2;
        this.setState({ deviceWidth: width });
    };

    render() {
        const { changeScreen } = this.props.screenStore;
        const { addTodo, todos, removeTodo, fetchTodos, loading, error } = this.props.todoStore;

        if(loading) return <AppLoader />;
        if(error) {
            return <AppError onFetch={ fetchTodos } error={ error } />
        }

        return (
            <View >
                <AddTodo onSubmit={ addTodo } />
                { !!todos.length
                    ? (
                        <View style={{ width: this.state.deviceWidth }} >
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
    }
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

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    screenStore: rootStore.screenStore,
    todoStore: rootStore.todoStore
}))(MainScreen as unknown as ComponentClass<{}>)
