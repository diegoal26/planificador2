import {Text, SafeAreaView, View, TextInput, StyleSheet, Pressable, Alert, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import globalStyles from '../styles';
import { mask, unMask } from 'react-native-mask-text';
import { useSpentStore } from '../store';
import Toast from 'react-native-simple-toast';

const FormularioGasto = ()=>{
    const {mostrarModal, gasto, cancelarGasto, eliminarGasto, actualizarGasto, agregarGasto, alertConfig, setearAlertConfig} = useSpentStore();

    return(<SafeAreaView style={styles.contenedor}>
        <View style={styles.contenedorBotones}>
            <Pressable style={({pressed})=>[
                {
                    opacity: pressed ? 0.2 : 1,
                    backgroundColor: '#2277ee'
                }, styles.btn, styles.btnCancelar
            ]}
            onPress={()=>{
                mostrarModal(false)
                cancelarGasto()}}>
                <Text style={styles.btnTexto}>Cancelar</Text>
            </Pressable>

            {gasto.id && (<Pressable style={({pressed})=>[
                {
                    opacity: pressed ? 0.2 : 1,
                    backgroundColor: '#2277ee'
                }, styles.btn, styles.btnEliminar
            ]} 
            onPress={()=>{eliminarGasto(gasto.id)
                mostrarModal(false)}}>
                <Text style={styles.btnTexto}>Eliminar</Text>
            </Pressable>)}
        </View>
    <ScrollView contentContainerStyle={{minHeight: '100%'}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formulario}>
        
        <Text style={styles.titulo}>{gasto?.id?'Editar Gasto':'Nuevo Gasto'}</Text>
        <View style={styles.campo}>
            <Text style={styles.label}>Nombre Gasto</Text>
            <TextInput placeholder='Nombre del gasto'
            style={styles.input}
            value={gasto.nombre}
            onChangeText={text => actualizarGasto('nombre', text)}
            />
        </View>
        <View style={styles.campo}>
            <Text style={styles.label}>Cantidad Gasto</Text>

            <TextInput keyboardType='numeric' style={styles.input}
            placeholder='Cantidad del gasto'
            value={gasto.cantidad?mask(gasto.cantidad, undefined, 'currency',{groupSeparator: '.'}):0}
            onChangeText={(e) => { const eu = unMask(e); actualizarGasto('cantidad', eu)}}/>
        </View>

        <View style={styles.campo}>
            <Text style={styles.label}>Categoria Gasto</Text>
            <Picker style={styles.input} selectedValue={gasto.categoria} onValueChange={e => actualizarGasto('categoria', e)}>
                <Picker.Item label='--Seleccione--' value=''/>
                <Picker.Item label='Ahorro' value='ahorro'/>
                <Picker.Item label='Comida' value='comida'/>
                <Picker.Item label='Ocio' value='ocio'/>
                <Picker.Item label='Casa' value='casa'/>
                <Picker.Item label='Gastos varios' value='varios'/>
            </Picker>
        </View>
        <Pressable style= {({pressed})=>[
                {
                    opacity: pressed ? 0.2 : 1,
                    backgroundColor: '#2277ee'
                }, styles.submitBtn
            ]}
        onPress={() => {agregarGasto(gasto); Toast.show('Gasto agregado', Toast.LONG)}}>
            <Text style={styles.submitBtnTexto}>{gasto?.nombre?'Guardar Cambios Gasto':'Agregar Gasto'}</Text>
        </Pressable>
        {alertConfig.length > 0 ?
        Alert.alert('Error', alertConfig, [{text:'OK', onPress:()=>setearAlertConfig('')}]):''}
        
    </View>
    </TouchableWithoutFeedback>
    </ScrollView>
    
    </SafeAreaView>);
}
const styles = StyleSheet.create({
    contenedorBotones:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    contenedor:{
        backgroundColor:'#1E40AF',
        flex: 1
    },
    formulario:{
        ...globalStyles.contenedor
    },
    titulo:{
        textAlign:'center',
        fontSize:28,
        marginBottom:30,
        color:'#64748B'
    },
    campo:{
        marginVertical:10
    },
    label:{
        color:'#64748B',
        textTransform:'uppercase',
        fontSize:18,
        fontWeight:'bold'
    },
    input:{
        backgroundColor:'#F5F5F5',
        padding:10,
        borderRadius:10,
        marginTop:10
    },
    submitBtn:{
        backgroundColor:'#3B82F6',
        padding:10,
        marginTop:20
    },
    submitBtnTexto:{
        textAlign:'center',
        color:'#FFF',
        fontWeight: 'bold'
    },
    btn:{
        padding:10,
        marginTop:30,
        marginHorizontal:10,
        flex:1
    },
    btnEliminar:{
        backgroundColor:'red'
    },
    btnCancelar:{
        backgroundColor:'#DB2777',
        
    },
    btnTexto:{
        textTransform:'uppercase',
        color:'#FFF',
        fontWeight:'bold',
        textAlign:'center'
    }
})
export default FormularioGasto