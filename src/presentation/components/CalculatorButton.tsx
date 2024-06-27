import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { colors, globalStyles } from '../../config/theme/app-theme'

interface Props {
    label: string;
    color?: string;
    doubleSize? : boolean;
    blackText?: boolean;
}

export const CalculatorButton = ({label, color = colors.darkGray, doubleSize = false, blackText = false }: Props) => {
    return (
        <Pressable style={ ({pressed}) => ({
            ...globalStyles.button,
            backgroundColor: pressed ? 'rgb(0, 255, 4)' : color || globalStyles.button.backgroundColor,
            width: (doubleSize) ? 180 : 80,
            opacity: (pressed) ? 0.8 : 1,
        }) }>
            <Text style={{
                ...globalStyles.buttonText,
                color: (blackText) ? colors.textBlack : colors.textPrimary,
            }}>{ label }</Text>
        </Pressable>
    )
}
