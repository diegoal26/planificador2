import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import globalStyles from "../styles";
import {formatearCantidad, formatearFecha} from '../helpers'
import { useSpentStore } from "../store";

const diccionarioIconos = {
    ahorro: require('../images/icono_ahorro.png'),
    comida: require('../images/icono_comida.png'),
    ocio: require('../images/icono_ocio.png'),
    casa: require('../images/icono_casa.png'),
    salud: require('../images/icono_salud.png'),
    varios: require('../images/icono_gastos.png')
}

const Gasto=({gasto})=>{
    const {mostrarModal, elegirGasto, presupuesto} = useSpentStore();
    const {nombre, cantidad, categoria, id, fecha} = gasto

    const handleAcciones = ()=>{
        mostrarModal(true);
        elegirGasto(gasto);
    }

    return(
        <Pressable onPress={handleAcciones}>
            <View style={styles.contenedor}>
                <View style={styles.contenido}>
                    <View style={styles.contenedorImagen}>
                        <Image style={styles.imagen} source={diccionarioIconos[categoria]}/>
                        <View style={styles.contenedorTexto}>
                            <Text style={styles.categoria}>{categoria}</Text>
                            <Text style={styles.nombre}>{nombre}</Text>
                            <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
                        </View>
                    </View>
                    <Text style={styles.cantidad}>{formatearCantidad(cantidad, presupuesto.moneda)}</Text>
                </View>
            </View>
        </Pressable>);
}

const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor,
        marginBottom:15
    },
    contenido:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    contenedorImagen:{
        flexDirection:'row',
        alignItems:'center',
        flex:1
    },
    imagen:{
        width:80,
        height:80,
        marginRight:20
    },
    contenedorTexto:{
        flex:1
    },
    categoria:{
        color:'#94A3B8',
        fontSize:16,
        fontWeight:'bold',
        textTransform:'uppercase',
        marginBottom:5
    },
    nombre:{
        fontSize:21,
        color:'#64748B',
        marginBottom:5
    },
    cantidad:{
        fontSize:20,
        fontWeight:'bold',
    },
    fecha:{
        fontWeight:'700',
        color:'#DB2777'
    }
})
export default Gasto