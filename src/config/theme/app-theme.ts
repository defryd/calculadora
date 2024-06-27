import { StyleSheet } from "react-native";

export const colors = {
    darkGray: '#2D2D2D',
    lightgray: '#9B9B9B',
    orange: '#FF9427',

    textPrimary: 'white',
    textSecondary: '#666666',
    textBlack: 'black',
    background: '#000',
};

export const globalStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
    },
    calculatorContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 18,
        paddingHorizontal: 10,
    },
    button:{
        height: 80,
        width: 80,
        backgroundColor: colors.darkGray,
        borderRadius: 100,
        justifyContent: 'center',
        marginHorizontal: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.textPrimary,
        fontSize: 30,
        fontWeight: '300',
        padding: 10,
    },
    mainResult:{
        color: colors.textPrimary,
        fontSize: 60,
        fontWeight: '400',
        marginBottom: 10,
        textAlign: 'right',
    },
    subResult:{
        color: colors.textSecondary,
        fontSize: 40,
        fontWeight: '300',
        marginBottom: 10,
        textAlign: 'right',
    },
});