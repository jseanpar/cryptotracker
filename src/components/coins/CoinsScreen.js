import React, { useState, useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    FlatList
} from 'react-native';
import Http from '../../libs/Http';
import CoinItem from './CoinItem';
import CoinSearch from './CoinsSearch';
import Colors from '../../res/colors';

const CoinsScreen = (props) => {

    const [data, setData] = useState({});
    const [loading, setloading] = useState(false);
    const [allData, setAllData] = useState({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setloading(true);
        let coins = await Http.instance.get(`https://www.amiiboapi.com/api/amiibo/`);
        console.log(coins.amiibo);
        setData(coins.amiibo);
        setAllData(coins.amiibo);
        setloading(false);
    };

    function handlePress(item) {
        console.log('go to:', props);
        props.navigation.navigate('CoinDetail', { item });
    }
    return (
        <>
            <View style={styles.container}>
                <CoinSearch allData={allData} setData={setData} />
                {loading ?
                    <ActivityIndicator
                        color="#fff"
                        size="large"
                        style={styles.loader}
                    />
                    : null
                }
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <CoinItem
                            item={item}
                            onPress={() => handlePress(item)}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    titleText: {
        color: "#fff",
        textAlign: "center"
    },
    btn: {
        padding: 8,
        backgroundColor: "blue",
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: '#fff',
        textAlign: "center"
    },
    loader: {
        marginTop: 60
    },
    textInput: {
        height: 40,
        paddingLeft: 20,
        margin: 5,
        color: "#fff"
    }
})
export default CoinsScreen;