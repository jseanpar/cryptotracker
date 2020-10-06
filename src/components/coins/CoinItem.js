import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Colors from '../../res/colors';

const CoinItem = ({ item, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.containerImagen}>
                <Image style={styles.imagen}
                    source={{ uri: item.image }}
                />
            </View>
            <View style={styles.row, styles.imagenText}>
                <Text style={styles.firstText}>
                    {item.name}
                </Text>
                <Text style={styles.secondText}>
                    {item.type}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.characterText}>
                    {item.character}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1
    },
    row: {
        flexDirection: "row"
    },
    firstText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 12
    },
    secondText: {
        color: "#fff",
        fontSize: 14,
    },
    characterText: {
        color: "#fff",
        fontSize: 12
    },
    imagen: {
        width: 50,
        height: 50,
        resizeMode: "contain"
    },
    imagenText: {
        paddingTop: 5
    }
})

export default CoinItem;