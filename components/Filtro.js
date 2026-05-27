import {Text, View, StyleSheet} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import globalStyles from '../styles';
import { useContext } from 'react';
import { useSpentStore } from '../store';
const Filtro = ()=>{
    const {categoria, elegirCategoria, gastos} = useSpentStore();

    return(<>{gastos.length > 1 ?
    <View style={styles.contenedor}>
        <Text style={styles.label}>Filtrar Gastos</Text>
        <Picker selectedValue={categoria} onValueChange={e=>elegirCategoria(e)}>
                <Picker.Item label='--Seleccione--' value=''/>
                <Picker.Item label='Ahorro' value='ahorro'/>
                <Picker.Item label='Comida' value='comida'/>
                <Picker.Item label='Ocio' value='ocio'/>
                <Picker.Item label='Casa' value='casa'/>
                <Picker.Item label='Gastos varios' value='varios'/>
            </Picker>
    </View>:null}</>);
}
const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor,
        transform:[{translateY:0}],
        marginTop: 80
    },
    label:{
        fontSize:22,
        fontWeight:'900',
        color:'#64748B'
    }
})

export default Filtro