import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    Image,
    SectionList,
    FlatList,
    Pressable,
    Alert
} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/Http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/Storage';

const DATA = [
    {
        title: "Main dishes",
        data: ["Pizza", "Burger", "Risotto"]
    },
    {
        title: "Sides",
        data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
        title: "Drinks",
        data: ["Water", "Coke", "Beer"]
    },
    {
        title: "Desserts",
        data: ["Cheese Cake", "Ice Cream"]
    }
];

const Item = ({ title }) => (
    <View style={styles.sectionItem}>
        <Text style={styles.itemText}>{title}</Text>
    </View>
);


const CoinsDetailScreen = ({ route, navigation }) => {

    const [loading, setloading] = useState(false);
    const [state, setState] = useState({})
    const [stateList, setStateList] = useState({})
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const { item } = route.params;
        navigation.setOptions({ title: item.name })
        setState(item);
        getMarkets();
        getFavorite(item);
    }, []);

    const getMarkets = async () => {
        setloading(true);
        let coins = await Http.instance.get(`https://www.amiiboapi.com/api/amiibo/`);
        setStateList(coins.amiibo);
        setloading(false);
    }
    const toggleFavorite = async () => {

        if (isFavorite) {
            removeFavorite()
            console.log('se elimino');
        } else {
            addFavorite()
        }
    }

    const addFavorite = async () => {

        const item = JSON.stringify(state);
        const key = `favorite-${state.tail}`;
        const stored = await Storage.instance.store(key, item);
        if (stored) {
            setIsFavorite(true)
        }
    }

    const removeFavorite = async () => {

        Alert.alert("Remove favorite", "Are you sure?", [
            {
                text: "cancel",
                onPress: () => { },
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async () => {
                    const key = `favorite-${state.tail}`;
                    await Storage.instance.remove(key);
                    setIsFavorite(false)
                },
                style: "destructive"
            }
        ])
    }

    const getFavorite = async (item) => {
        try {
            const key = `favorite-${item.tail}`;
            const favStr = await Storage.instance.get(key);
            if (favStr != null) {
                setIsFavorite(true)
            }
        } catch (err) {
            console.log('get favorites err', err)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>
                    <Image
                        style={styles.imageConfig}
                        source={{ uri: state.image }} />
                    <Text style={styles.titleText}>
                        {state.name}
                    </Text>
                </View>
                <Pressable
                    onPress={toggleFavorite}
                    style={[
                        styles.btnFavorite,
                        isFavorite ?
                            styles.btnFavoriteRemove :
                            styles.btnFavoriteAdd
                    ]}
                >
                    <Text style={styles.btnFavoriteText}>
                        {isFavorite ? "Remove favorite" : "Add favorite"}
                    </Text>
                </Pressable>
            </View>
            <SectionList
                style={styles.section}
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
            />
            <View>
                <Text style={styles.titleHorizontal}>Listado Horizontal</Text>
            </View>
            {
                loading ?
                    <ActivityIndicator
                        color="#fff"
                        size="large"
                        style={styles.loader}
                    />
                    : null
            }
            <FlatList
                style={styles.listHorizontal}
                horizontal={true}
                data={stateList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <CoinMarketItem item={item} />
                }
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    row: {
        flexDirection: "row"
    },
    subHeader: {
        backgroundColor: "rgba(0,0,0, 0.1)",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 8
    },
    imageConfig: {
        width: 100,
        height: 100,
        resizeMode: "contain"
    },
    section: {
        maxHeight: 280
    },
    sectionItem: {
        padding: 8,
    },
    sectionHeader: {
        backgroundColor: "rgba(0,0,0,0.2)",
        padding: 8
    },
    itemText: {
        color: Colors.white,
        fontSize: 14
    },
    sectionText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: "bold"
    },
    listHorizontal: {
        maxHeight: 120,
        paddingLeft: 10
    },
    titleHorizontal: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 16,
        marginLeft: 16
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8,
        height: 35
    },
    btnFavoriteText: {
        color: Colors.white,
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine
    }
})

export default CoinsDetailScreen;