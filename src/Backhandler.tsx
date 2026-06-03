import { Component, ReactNode, createElement } from "react";
import { TextStyle, ViewStyle, BackHandler, View } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { BackhandlerProps } from "../typings/BackhandlerProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export class Backhandler extends Component<BackhandlerProps<CustomStyle>> {
    private backHandlerSubscription: ReturnType<typeof BackHandler.addEventListener> | null = null;

    constructor(props: BackhandlerProps<CustomStyle>){
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    //We have to have a render block, or else Mendix Native will crash. Render block is expected.
    render(): ReactNode {
        return (
        <View></View>
        )
    }

    componentDidMount() {
        this.backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        this.backHandlerSubscription?.remove();
    }
    
    handleBackButtonClick() {
        this.props.onBack?.execute();
        return true;
    }
}

