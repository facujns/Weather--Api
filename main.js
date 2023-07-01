let datos;
const date = new Date();

      // CONVIERTO LA FECHA A SU NOMBRE CON STRING
const opcionesDia = { weekday: 'long' };
const opcionesMes = { month: 'long' };

const nombreDiaSemana = date.toLocaleString(undefined, opcionesDia).split(' ')[0];
const nombreMes = date.toLocaleString(undefined, opcionesMes);

      // CONVIERTO LOS DIAS DE LA SEMANA Y LOS MESES EN MAYUSCULA SOLO LA PRIMER LETRA
const diaSemanaMayus = nombreDiaSemana.charAt(0).toUpperCase() + nombreDiaSemana.slice(1);
const mesMayus = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);


async function obtenerDatosClima(ciudades) {
  try {
     const colores = [
      'linear-gradient(90deg, rgba(23,162,93,1) 0%, rgba(69,249,144,1) 100%)',
      'linear-gradient(90deg, rgba(83,75,249,1) 0%, rgba(81,210,213,1) 100%)',
      'linear-gradient(90deg, rgba(236,182,109,1) 0%, rgba(2242,199,146,1) 100%)'
    
    ];
    const ciudadesConIndice = [...ciudades].map((ciudad, index) => ({ ciudad, index }));

    for (const {ciudad, index} of ciudadesConIndice) {
      const respuesta = await fetch(`http://api.weatherapi.com/v1/current.json?key=61b5ed9a83254897b9441747230107&q=${ciudad}`);
      const datos = await respuesta.json();

      console.log(datos.location.name);
      console.log(datos.current.condition.text);

      // Crear una nueva tarjeta por cada ciudad
      const card = document.createElement('div');
      card.classList.add('w-72', 'max-w-sm', 'overflow-hidden', 'shadow-lg', 'm-10', 'rounded-md');
      
      const colorFondo = colores[index & colores.length]
      
      card.style.background = colorFondo;
      
      card.innerHTML = `
        <div class="h-52 w-72 bg-cover hover:bg-gray flex justify-between">
          <div>
            <p class="text-gray-100 text-md font-medium ml-2 mt-2">${datos.current.condition.text}</p> 
            <p class="text-gray-200 font-medium text-6xl ml-2">${datos.current.temp_c}°</p>
          </div>
          <div>
            <img src=${datos.current.condition.icon} class="w-40 mt-4" alt="Imagen de referencia">
          </div>
        </div>
        <div class="border-t-8 border-t-orange-600">
          <div class="font-medium text-lg text-gray-200 text-lg mb-4 ml-2">${datos.location.name}</div>
          <p class="font-normal text-gray-200 text-sm mb-2 ml-2">${diaSemanaMayus}, ${date.getDate()} ${mesMayus}</p>
        </div>
      `;

      // Agregar la tarjeta al contenedor
      document.getElementById('container').appendChild(card);
    }
  } catch (error) {
    console.log(error);
  }
}

const ciudades = ['Montevideo','Rocha','Maldonado']
obtenerDatosClima(ciudades);