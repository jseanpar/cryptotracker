import React, { useState, useEffect } from 'react';
import {
    TextInput,
    View,
    Platform,
    StyleSheet
} from 'react-native';
import Colors from "../../res/colors";



const CoinSearch = ({ allData, setData }) => {

    const [search, setSearch] = useState('');

    const searchFilterFunction = (text) => {

        const filteredData = text
            ? allData.filter(data => {
                const itemData = data.name.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            : allData;
        setData(filteredData);
        setSearch(text);

    };

    return (
        <View>
            <TextInput
                style={[
                    styles.textInput,
                    Platform.OS == 'ios' ?
                        styles.textInputIOS :
                        styles.textInputAndroid
                ]}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                placeholder="Search Character"
                placeholderTextColor="#fff"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        paddingLeft: 20,
        margin: 5,
        color: "#fff",
        backgroundColor: Colors.charade,
    },
    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.zircon
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8
    }
})

export default CoinSearch;