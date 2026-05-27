import { useContext } from 'react';
import {Text, View, StyleSheet} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import Gasto from './Gasto';
import { useSpentStore } from '../store';

/*<SwipeListView data={gastosFiltrados} renderItem={(data, row)=><Gasto key={data.item.id} gasto={data.item}/>}
        renderHiddenItem={(data, row)=><View><Text>Hola</Text></View>}>
       </SwipeListView>
)*/
const ListadoGastos=({categoria})=>{
    const {gastos} = useSpentStore();

    let gastosFiltrados = [];
    if(categoria !== ''){
        gastosFiltrados = gastos.filter(gastoTmp=>gastoTmp.categoria === categoria)
    }else{
        gastosFiltrados = gastos
    }

    return(<View style={styles.contenedor}>
        <Text style={styles.titulo}>Gastos</Text>
        
        {gastosFiltrados.length === 0 ? <Text style={styles.noGastos}>No hay gastos</Text>:gastosFiltrados.map(gasto=> 
            (<Gasto key={gasto.id} gasto={gasto}/>))
        
       }
        </View>);

}
const styles = StyleSheet.create({
    contenedor:{
        marginVertical:30
    },
    titulo:{
        color: '#64748B',
        textAlign:'center',
        fontSize:30,
        fontWeight:'700',
        marginTop:10
    },
    noGastos:{
        marginVertical: 20,
        textAlign:'center',
        fontSize:20
    }
})
export default ListadoGastos