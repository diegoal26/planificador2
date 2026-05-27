import {useEffect, useState} from 'react';
import { Text, View, Pressable, StyleSheet, Alert } from "react-native";
import globalStyles from "../styles";
import {formatearCantidad} from '../helpers/index'
import CircularProgress from 'react-native-circular-progress-indicator';
import { useSpentStore } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ControlPresupuesto = ()=>{
    const [disponible, setDisponible] = useState(0);
    const [porcentajeGasto, setPorcentajeGasto] = useState(0)
    const {reiniciarApp, gastos, gastado, presupuesto, editarGastado} = useSpentStore()

    useEffect(()=>{
        const totalGastado = gastos.reduce((total, gasto)=> Number(gasto.cantidad) + total, 0)
        console.log("lo gastado "+totalGastado);
        setDisponible(presupuesto.monto - totalGastado);
        editarGastado(totalGastado);
        setPorcentajeGasto((totalGastado*100)/presupuesto.monto)
    },[gastos])

    const resetearApp =()=>{
        Alert.alert('Quieres resetear la app?', 'Esto eliminará el presupuesto y gastos',
        [{text:'No', style:'cancel'},{text:'Si', onPress: async() => {
            reiniciarApp()
        }}])
    }

    return(<View style={styles.contenedor}>
            <View style={styles.centrarGrafica}>
                <CircularProgress value={porcentajeGasto} radius={100} title='Gastado' duration={1000} titleFontSize={20}
                valueSuffix={'%'} inActiveStrokeColor={'#F5F5F5'} inActiveStrokeWidth={20}
                activeStrokeColor={'#3b82f6'} activeStrokeWidth={20}/>
            </View>
            <View style={styles.contenedorTexto}>
                <Pressable style={({pressed})=>[
                {
                    opacity: pressed ? 0.2 : 1,
                    backgroundColor: '#2277ee'
                }, styles.boton
                ]}
                onPress={resetearApp}>
                    <Text style={styles.textoBoton}>Reiniciar App</Text>
                </Pressable>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Presupuesto:{' '}</Text>
                    {formatearCantidad(presupuesto.monto, presupuesto.moneda)}
                </Text>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Disponible:{' '}</Text>
                    {formatearCantidad(disponible, presupuesto.moneda)}
                </Text>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Gastado:{' '}</Text>
                    {formatearCantidad(gastado, presupuesto.moneda)}
                </Text>
            </View>
    </View>);
}
const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor
    },
    centrarGrafica:{
        alignItems:'center'
    },
    imagen:{
        width:200,
        height:200
    },
    contenedorTexto:{
        marginTop: 35
    },
    boton:{
        backgroundColor:'#DB2777',
        padding: 10,
        marginBottom: 40,
        borderRadius: 5
    },
    textoBoton:{
        color:'#FFF',
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight:'bold'
    },
    valor:{
        fontSize:24,
        textAlign:'center',
        marginBottom:10
    },
    label:{
        fontWeight:'700',
        color:'#3B82F6'
    }
})
export default ControlPresupuesto