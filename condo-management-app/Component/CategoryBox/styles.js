import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.grey,
        padding: 10,
    },
    image: {
        width: 32,
        height: 32,
    },
    imageContainer: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    }
})