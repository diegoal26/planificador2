import {create} from 'zustand'
import { Alert } from "react-native";
import { generarId } from "./helpers";
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

export const useSpentStore = create(
  persist((set, get) => ({
    presupuesto: {monto: '', moneda: ''},
    isValidPresupuesto: false,
    gasto: {nombre: '', cantidad: 0, categoria: ''},
    gastos:[],
    gastado: 0,
    categoria: '',
    alertConfig: '',
    modal: false,
    mostrarModal: (value) => {
      set(() => ({
        modal: value
      }))
    },
    elegirCategoria: (value) => {
      set(() => ({
        categoria: value
      }))
    },
    setearAlertConfig: (value) => {
      set(() => ({
        alertConfig: value
      }))
    },
    reiniciarApp: () => {
      set(() => ({
        isValidPresupuesto: false,
        presupuesto: {monto: '', moneda: ''},
        gastos: [],
        gastado: 0,
        categoria: ''
      }))
    },
    editarGastado: (monto) => {
      set(()=>({
        gastado: monto
      }))
    },
    editarPresupuesto: (presupuesto) => {
      set(()=>({
        presupuesto: presupuesto
      }));
    },
    agregarPresupuesto: (presupuesto)=>{
        if(Number(presupuesto.monto) > 0 && presupuesto.moneda !== ''){
            console.log('Presupuesto valido');
            set(()=>({
                presupuesto: presupuesto,
                isValidPresupuesto: true
            }));
          }else{
            Alert.alert('Error', 'El Presupuesto debe ser mayor a cero y se debe elegir una moneda', ['Ok']);
          }
    },
    elegirGasto: (gasto) =>{
      set(() => ({
        gasto: gasto
      }))
    },
    cancelarGasto: () =>{
      set(() => ({
        gasto: {nombre: '', cantidad: 0, categoria: ''}
      }))
    },
    actualizarGasto: (nombre, e) => {
      set((state) => ({
        gasto: {...state.gasto, [nombre] : e}
      }))
    },
    agregarGasto: (gasto) => {
      if([gasto.nombre, gasto.categoria].includes('') || [gasto.nombre, gasto.categoria].includes(undefined)){
        setAlertConfig('Todos los campos son obligatorios.')
        return;
      }else if(Number(gasto.cantidad) === 0){
        setAlertConfig('El gasto debe ser mayor a cero.')
        return;
      }

      if(gasto.id){
        const gastosTmp = get().gastos.filter(gastoState=>gastoState.id !==gasto.id)
        const totalGastado = gastosTmp.reduce((total, gasto)=> Number(gasto.cantidad) + total, 0)
        
        if((Number(gasto.cantidad) + Number(totalGastado)) > Number(get().presupuesto)){
          setAlertConfig('El gasto no puede ser mayor al presupuesto.')
          return;
        }
        const gastosActualizados = get().gastos.map(gastoState => gastoState.id===gasto.id ? gasto : gastoState)

        set(() => ({
          gastos: gastosActualizados
        }))
      }else{
        if(Number(gasto.cantidad) > Number(get().presupuesto - get().gastado)){
          setAlertConfig('El gasto no puede ser mayor al disponible.')
          return;
        }
        gasto.id = generarId();
        gasto.fecha = Date.now();
        set((state) => ({
          gastos: [...state.gastos, gasto]
        }))
      }
      //setModal(false);
      set(() => ({
        modal: false
      }))
    },
    eliminarGasto: (id) => {
        const gastosActual = get().gastos.filter(gastoState=>gastoState.id !== id)
        Alert.alert(
            'Deseas eliminar este gasto?',
            'Un gasto eliminado no se puede recuperar',
            [{text:'No',style:'cancel'},{text:'Si', onPress:()=>{set(()=>({
                gastos: gastosActual
            })
            ); Toast.show('Gasto eliminado',Toast.LONG)}}]
        );
    }
}),{
  name: 'gastos-storage',
  storage: createJSONStorage(()=>AsyncStorage)
}))