import { StyleSheet } from "react-native";

export const colors = {
    darkGray: '#2D2D2D',
    lightgray: '#9B9B9B',
    orange: '#FF9427',

    textPrimary: 'white',
    textSecondary: '#666666',
    background: '#000',
};

export const globalStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
    },
});