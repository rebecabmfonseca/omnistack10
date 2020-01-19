import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

function Main({ navigation }) {
    const [regiaoAtual, setRegiaoAtual] = useState(null);

    useEffect(() => {
        async function carregaPosicaoInicial() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });
                const { latitude, longitude } = coords
                setRegiaoAtual({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }
        carregaPosicaoInicial()
    }, [])

    if (!regiaoAtual) {
        return null;
    }

    return (
        <>
            <MapView initialRegion={regiaoAtual} style={styles.map} >
                <Marker coordinate={{ latitude: -22.8618696, longitude: -43.2763482 }} >
                    <Image style={styles.marker}
                        source={{ uri: "https://avatars3.githubusercontent.com/u/4217842?s=460&v=4" }} />
                    <Callout onPress={() => {
                        navigation.navigate('Profile', { github_user: 'rebecabmfonseca' })
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devNome}>Rebeca</Text>
                            <Text style={styles.devBio}>Biografia nao autorizada.</Text>
                            <Text style={styles.devTechs}>React, Java, Mobile</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.searchForm}>
                <TextInput style={styles.searchInput}
                    placeholder='Buscar Devs por techs..'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                />
                <TouchableOpacity onPress={()=> {}} style={styles.carregaBotao} >
                    <MaterialIcons name="my-location" size={20} color='#FFF' />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    marker: {
        width: 55,
        height: 55,
        borderRadius: 4,
        borderWidth: 0,
        borderColor: '#FFF'
    },
    callout: {
        width: 260
    },
    devNome: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm:{
        position: 'absolute',   
        bottom: 20,
        left:20,
        right:20,
        zIndex:5,
        flexDirection:'row'
    
    },
    searchInput:{
        flex:1,
        height:50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    carregaBotao:{
        width:50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15

    }

})

export default Main;