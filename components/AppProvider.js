import { useContext, useEffect } from "react";
import { StyleSheet, View, Modal, ScrollView} from "react-native";
import Header from "./Header";

import ControlPresupuesto from './ControlPresupuesto';
import FormularioGasto from './FormularioGasto';
import ListadoGastos from './ListadoGastos';
import Filtro from "./Filtro";
import { AddIcon, Fab, FabIcon } from '@gluestack-ui/themed';
import { useSpentStore } from "../store";
import NuevoPresupuesto from "./NuevoPresupuesto";

const AppProvider=()=>{
      const {isValidPresupuesto, presupuesto, categoria, modal, mostrarModal, elegirGasto} = useSpentStore()

    /*useEffect(()=>{
        const obtenerPresupuestoStorage = async()=>{
            try{
              const presupuestoStorage = await AsyncStorage.getItem('presupuesto') ?? 0
              if(presupuestoStorage > 0){
                console.log(presupuestoStorage)
                setPresupuesto(presupuestoStorage)
                setIsValidPresupuesto(true)
              }
            } catch (error) {
              console.log(error)
            }
        }
        obtenerPresupuestoStorage()
    }, [])

    useEffect(()=>{
      const obtenerGastosStorage = async()=>{
        try {
          const gastosStorage = await AsyncStorage.getItem('gastos')
          if(gastosStorage?.length > 0){
            setGastos(gastosStorage ? JSON.parse(gastosStorage):[])
          }
        } catch (error) {
          console.log(error)
        }
      }
      obtenerGastosStorage()
    },[])

    useEffect(()=>{
      const guardarGastosStorage = async()=>{
        try {
          await AsyncStorage.setItem('gastos', JSON.stringify(gastos))
        } catch (error) {
          console.log(error)
        }
      }
      guardarGastosStorage();
    },[gastos])*/

    return(
            <View style={styles.contenedor}>
              <ScrollView>
                <View style={styles.header}>
                  <Header/>
                  {isValidPresupuesto ? <ControlPresupuesto/>: <NuevoPresupuesto/>}
                </View>

                {isValidPresupuesto &&(<>
                  <Filtro/>
                  <ListadoGastos categoria={categoria}/>
                </>)}
              </ScrollView>

                {modal && (<Modal animationType='slide'
                visible={modal}><FormularioGasto/></Modal>)}

              {isValidPresupuesto &&
              <Fab size="lg" backgroundColor='#3B82F6'
              placement="bottom right"
              onPress={()=>{mostrarModal(!modal)
              elegirGasto({nombre:'',cantidad:0,categoria:''})}}
              >
                <FabIcon as={AddIcon}/>
              </Fab>
              }

            </View>
    );
}

const styles = StyleSheet.create({
    header:{
      backgroundColor: '#3B82F6',
      minHeight:400
    },
    contenedor:{
      backgroundColor:'#F5F5F5',
      flex: 1,
    },
    imagen:{
      backgroundColor: '#3B82F6',
      width:60,
      height:60,
      position:'absolute',
      bottom:30,
      right:30,
      //left:300
    }
  });

  export default AppProvider;