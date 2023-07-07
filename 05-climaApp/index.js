require('dotenv').config();

const { pausa, listarLugares } = require('./helpers/inquirer');
const { leerInput, inquirerMenu } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {
  
  const busquedas = new Busquedas();

  do {
    var opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //pedir dato
        const lugarBuscado = await leerInput('Ingrese ciudad: ');
        //buscar lugar
        const lugaresEncontrados = await busquedas.ciudad(lugarBuscado);
        //mostrar lugares
        //seleccionar lugar
        const idSel = await listarLugares(lugaresEncontrados);
        if ( idSel === '0') continue;
        const lugarSel = lugaresEncontrados.find(lugar => lugar.id === idSel);
        //guardar historial
        busquedas.agregarHistorial(lugarSel.nombre);
        //buscar de clima de eleccion
        const tempSel = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
        //mostrar info
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad: ', lugarSel.nombre);
        console.log('Lat: ', lugarSel.lat);
        console.log('Lng: ', lugarSel.lng);
        console.log('Temperatura: ', tempSel.temp);
        console.log('Minima: ', tempSel.min);
        console.log('Maxima: ', tempSel.max);
        console.log('Descripcion: ', tempSel.desc)
        await pausa();
        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, id) => {
          const linea = `${id+1}. `.green + lugar;
          console.log(linea)
        })
        await pausa();
        break;
    }

  } while (opt !== 0);

};

main();