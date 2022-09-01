/* 

FUNCIONAMIENTO DE BUSQUEDA DE ARTICULOS MEDIANTE EL USO DE LA API

*/

// elementos necesarios
$btnBuscar = document.getElementById("btnBuscar");
$table = document.getElementById("main-table-body");
$entry = document.getElementById("entry");

$btnBuscar.addEventListener("click", (e) => {
  // evitamos el funcionamiento por defecto del evento
  e.preventDefault();

  $table.innerHTML = "";

  if ($entry.value === "") {
    window.alert("Ingrese una llave a buscar");
    return;
  }

  if ($entry.value.length < 4) {
    window.alert("La llave a buscar tiene que ser de minimo 4 caracteres");
    return;
  }

  // Opciones de la petición (valores por defecto)
  const options = {
    method: "GET",
    headers: {
      Origin: "*",
      Authorization: "Bearer TnEWAPDi8n5R3taijqXleJDTZ5LNDr2LMJjOOsec",
    },
  };

  // endpoint
  let url =
    "https://aqueous-tundra-22060.herokuapp.com/https://api.adsabs.harvard.edu/v1/search/query?q=" +
    $entry.value +
    "&rows=200&fl=author,title,pub,bibcode,doi,volume,year,page_range,links_data&sort=date desc";

  // funcion async que realizara la peticion HTTPs
  async function getData() {
    try {
      // realizamos la peticion con fetch
      let response = await fetch(url, options),
        data = await response.json();

      // comprobamos que la peticion se realizo correctamente
      if (!response.ok) {
        throw { status: response.status, statusText: response.statusText };
      }

      // proceso de insertar los datos obtenidos al html
      $fragment = document.createDocumentFragment();

      const clean_data = getCleanDataWithAllArticles(data);

      for (const element in clean_data) {
        $tr = document.createElement("tr");

        $index = document.createElement("td");
        $index.textContent = element;
        $tr.appendChild($index);

        $tdbutton = document.createElement("td");
        $html = '<form class="save-element">';

        for (const key in clean_data[element]) {
          $td = document.createElement("td");
          $td.textContent = String(clean_data[element][key]).replaceAll(
            '"',
            "'"
          );
          $tr.appendChild($td);
          // TODO: add save btn
          $html +=
            `<input type="hidden" name="` +
            key +
            `" value="` +
            clean_data[element][key] +
            `">`;
        }
        // insertar boton guardado
        $html += `<input type="submit" value="Guardar" class="btn btn-primary save-data"></form>`;
        $tdbutton.innerHTML = $html;
        $tr.appendChild($tdbutton);

        $fragment.appendChild($tr);
      }
      $table.appendChild($fragment);
    } catch (error) {
      // controlamos nuestros errores
      console.log(error);
      window.alert("Se produjo un error insepesado");
    }
    console.log("add articulos");
  }
  getData();
  setTimeout(addSaveEvent, 2000);
});

// definimos las funciones que se necesitan para acomodar la informacion
function getCleanDataByArticle(data) {
  keys = Object.keys(data);
  return {
    authors: data.author ? data.author.join(", "): "",
    title: data.title?data.title[0]: "",
    pub: data.pub ? data.pub: "",
    url: "url"? "url": "" ,
    bibcode: data.bibcode? data.bibcode : "" ,
    doi: data.doi[0] ? data.doi[0]: "" ,
    page_range: data.page_range? data.page_range: "",
    volume: data.volume? data.volume: "",
    year: data.year? data.year: "",
  };
}

function getCleanDataWithAllArticles(data) {
  const full_data = {};
  count = 1;
  data.response.docs.forEach((element) => {
    const element_data = getCleanDataByArticle(element);
    full_data[count] = element_data;
    count += 1;
  });
  return full_data;
}

/* 

FUNCIONAMIENTO DE PROCESAMIENTO DE GUARDADO DE DATOS MEDIANTE PETICIONES A ARCHIVOS PHP

*/

async function addSaveEvent() {
  
  const $formulario = document.getElementsByClassName("save-element");

  for (const item in $formulario) {
    try {
      $formulario[item].addEventListener("submit", async (e) => {
        e.preventDefault();

        let datos = new FormData($formulario[item]);

        const requests = await fetch("requests/saveDataRequests.php", {
            method: "POST",
            body: datos,
          }),
          data = await requests.json();

        console.log(data);
      });
    } catch (error) {
      // no se le agregan evento a las propiedades que no son un boton
    }
  }
  console.log("add evento");
}


/* 

FUNCIONAMIENTO DE GUARDADO DE TODOS LOS DATOS

*/


const $saveAll = document.getElementById("save-all");

$saveAll.addEventListener("click", (e)=>{
  console.log("hola");
  const $formularios = document.getElementsByClassName("save-data");
  for (const item in $formularios) {
    try {
      $formularios[item].click();
    } catch (error) {
      //pass
    }
  }
})