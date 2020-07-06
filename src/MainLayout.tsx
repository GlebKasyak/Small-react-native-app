import React, { Component, ComponentClass } from "react";
import { observer, inject } from "mobx-react";
import { View, StyleSheet } from "react-native";

import { NavBar } from "./components";
import { Indentations } from "../assets/styles";
import { ScreeStoreType } from "./interfaces/screen";
import { StoreType } from "./store";
import { MainScreen, TodoScreen } from "./screens";

type Props = {
    screenStore: ScreeStoreType
};

@observer
class MainLayout extends Component<Props> {
    render() {
        const { todoId } = this.props.screenStore;

        return (
            <View >
                <NavBar />
                <View style={ styles.container } >
                    { !!todoId
                        ? <TodoScreen />
                        : <MainScreen />
                    }
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Indentations.PADDING_HORIZONTAL,
        paddingVertical: 20
    },
});

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    screenStore: rootStore.screenStore,
}))(MainLayout as unknown as ComponentClass<{}>)
