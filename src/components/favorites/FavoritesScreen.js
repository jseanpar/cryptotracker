import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from '../../components/coins/CoinItem';
import Colors from '../../res/colors';
import Storage from '../../libs/Storage';


const FavoriteScreen = ({ navigation }) => {

    const [data, setData] = useState({});

    navigation.addListener('focus', () => getFavorites())

    const handlePress = (item) => {
        navigation.navigate('CoinDetail', { item });
    }

    getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();
            const keys = allKeys.filter(
                (key) => key.includes("favorite-")
            );

            const favs = await Storage.instance.multiGet(keys);

            const favorites = favs.map((fav) => JSON.parse(fav[1]));

            setData(favorites);

        } catch (err) {
            console.log("get favorites err", err)
        }
    }

    return (
        <View style={styles.container}>
            { data.length == 0 ?
                <FavoritesEmptyState />
                : null
            }
            {data.length > 0 ?
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <CoinsItem
                            item={item}
                            onPress={() => handlePress(item)}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center"
    }
})

export default FavoriteScreen;