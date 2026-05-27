
/*export const formatearCantidad = cantidad=>{
    return Number(cantidad).toLocaleString('es-PY',{    //'en-US'
        style:'currency',
        currency:'PYG'  //USD
    });
}*/

export const formatearCantidad = (cantidad, moneda)=>{
    if(moneda==='USD'){
        const formateado = new Intl.NumberFormat('en-US',{
            style:'currency',
            currency:'USD'}).format(cantidad);
        return formateado.includes('$')?formateado:'$'+formateado
        
    }else{
        const formateado = new Intl.NumberFormat('es-PY',{
            style:'currency',
            currency:'PYG'}).format(cantidad);
        return formateado.includes('Gs')?formateado:'Gs.'+formateado
    }
    
}

export const formatearFecha = fecha =>{
    const fechaNueva = new Date(fecha)

    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}

export const generarId =() =>{
    const random = Math.random().toString(36).substring(2,11)

    return random
}