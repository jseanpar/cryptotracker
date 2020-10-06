import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Colors from '../../res/colors';

const CoinMarketItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.imagen}
                source={{ uri: item.image }}
            />
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.gameSeriesText}>{item.gameSeries}</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.1)",
        borderColor: Colors.zircon,
        borderWidth: 1,
        width: 200,
        padding: 16,
        marginRight: 8,
        alignItems: "center",
        borderRadius: 5
    },
    nameText: {
        color: "#fff",
        fontWeight: "bold"
    },
    gameSeriesText: {
        color: "#fff"
    },
    imagen: {
        width: 50,
        height: 50,
        resizeMode: "contain"
    },
})

export default CoinMarketItem;