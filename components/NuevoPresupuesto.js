import {Picker} from '@react-native-picker/picker'
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {MaskedTextInput} from 'react-native-mask-text'

import globalStyles from '../styles';
import { useSpentStore } from '../store';

const NuevoPresupuesto = ()=>{
    const {presupuesto, editarPresupuesto, agregarPresupuesto} = useSpentStore()
    console.log(presupuesto)

    return(
        <View style={styles.contenedor}>
            <Text style={styles.label}>Definir presupuesto</Text>
            <MaskedTextInput placeholder='Agrega tu presupuesto'
            type="currency"
            options={{
                groupSeparator: '.'
            }}
            style={styles.input}
            keyboardType='numeric'
            onChangeText={(text, rawText) => {
                /*setPresupuesto(rawText);
                handleChangeMoneda(e);*/
                editarPresupuesto({...presupuesto, monto: rawText});
            }}/>

            <View style={styles.campo}>
                <Picker style={styles.input} selectedValue={presupuesto.moneda}
                onValueChange={e => editarPresupuesto({...presupuesto, moneda: e})}>
                    <Picker.Item label='--Seleccione Moneda--' value=''/>
                    <Picker.Item label='Dólares' value='USD'/>
                    <Picker.Item label='Guaraníes' value='PYG'/>
                </Picker>
            </View>
            
            <Pressable style={({pressed})=>[
                {
                    opacity: pressed ? 0.2 : 1,
                    backgroundColor: '#2277ee'
                },
                styles.boton
            ]} 
            onPress={() => agregarPresupuesto(presupuesto)}>
                <Text style={styles.botonTexto}>Agregar presupuesto</Text>
            </Pressable>
        </View>
    );
}

const styles =StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor
    },
    label:{
        textAlign:'center',
        fontSize: 24,
        color:'#3B82F6'
    },
    input:{
        backgroundColor:'#F5F5F5',
        padding: 10,
        borderRadius: 10,
        textAlign:'center',
        marginTop: 30
    },
    boton:{
        backgroundColor:'#1048A4',
        marginTop:30,
        padding: 10,
        borderRadius:10
    },
    botonTexto:{
        color:'#FFF',
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight: 'bold'
    }
})
export default NuevoPresupuesto