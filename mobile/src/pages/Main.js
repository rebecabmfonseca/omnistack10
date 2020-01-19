import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api';

function Main({ navigation }) {
    const [regiaoAtual, setRegiaoAtual] = useState(null);
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState('')

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

    function handleRegionChanged(region) {
        console.log(region)
        setRegiaoAtual(region)
    }

    async function carregaDevs() {
        const { latitude, longitude } = regiaoAtual
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });
        console.log(response.data)
        setDevs(response.data)
    }
    carregaDevs()

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={regiaoAtual} style={styles.map} >
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={
                        { latitude: dev.location.coordinates[1],
                          longitude: dev.location.coordinates[0] }} >
                        <Image style={styles.marker}
                            source={{ uri: dev.avatar_url }} />
                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_user: dev.github_user })
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devNome}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput style={styles.searchInput}
                    placeholder='Buscar Devs por techs..'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={techs}
                    onChangeText={text => setTechs(text)}
                />
                <TouchableOpacity onPress={carregaDevs} style={styles.carregaBotao} >
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
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'

    },
    searchInput: {
        flex: 1,
        height: 50,
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
    carregaBotao: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15

    }

})

export default Main;