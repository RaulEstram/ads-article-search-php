/* 

FUNCIONAMIENTO DE BUSQUEDA DE ARTICULOS MEDIANTE EL USO DE LA API

*/

// elementos necesarios
$btnBuscar = document.getElementById("btnBuscar");
$table = document.getElementById("main-table-body");
$entry = document.getElementById("entry");
const $message = document.getElementById("message");
let dataArticles = {};

$btnBuscar.addEventListener("click", async (e) => {
  // evitamos el funcionamiento por defecto del evento
  e.preventDefault();

  if ($entry.value === "") {
    window.alert("Ingrese una llave a buscar");
    return;
  }

  if ($entry.value.length < 4) {
    window.alert("La llave a buscar tiene que ser de minimo 4 caracteres");
    return;
  }

  // endpoint
  let url = "http://127.0.0.1:8080/search/" + $entry.value;

  // funcion async que realizara la peticion HTTPs
  async function getData() {
    try {
      // realizamos la peticion con fetch
      let response = await fetch(url),
        data = await response.json();
      // comprobamos que la peticion se realizo correctamente
      if (!data["status"]) {
        throw { message: "Error al realizar la peticion" };
      }
      dataArticles = data["data"];

      $fragment = document.createDocumentFragment();

      for (const element in data["data"]) {
        // fila
        $tr = document.createElement("tr");
        // index de la fila
        $index = document.createElement("td");
        $index.textContent = element;
        $tr.appendChild($index);

        // llenado de informacion
        for (const item in data["data"][element]) {
          $td = document.createElement("td");
          $td.textContent = data["data"][element][item];
          $tr.appendChild($td);
        }

        // boton de guardar
        $td = document.createElement("td");
        let saveButton =
          '<button type="button" class="btn btn-primary save-button-table" data-id=' +
          element +
          ">Guardar</button>";
        $td.innerHTML = saveButton;

        // add row to fragment
        $tr.appendChild($td);
        $fragment.appendChild($tr);
      }
      // borrar data de la tabla si es que hay
      $table.innerHTML = "";
      // inyectar fragment to the table
      $table.appendChild($fragment);
    } catch (error) {
      window.alert("Se produjo un error insepesado: " + error.message);
    }
  }

  getData();
});

/* 

FUNCIONAMIENTO DE PROCESAMIENTO DE GUARDADO DE DATOS MEDIANTE PETICIONES A ARCHIVOS PHP

*/

document.body.addEventListener("click", (e) => {
  if (e.target.matches(".save-button-table")) {
    let url = "http://127.0.0.1:8080/article";
    try {
      let response = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataArticles[e.target.dataset.id]),
      })
        .then((data) => data.json())
        .then((red) => console.log(red));
    } catch (error) {}
  }
});

/* 

FUNCIONAMIENTO DE GUARDADO DE TODOS LOS DATOS

*/

const $saveAll = document.getElementById("save-all");

$saveAll.addEventListener("click", async (e) => {
  const $formularios = document.getElementsByClassName("save-data");
  for (const item in $formularios) {
    try {
      $formularios[item].click();
    } catch (error) {}
  }
});

setTimeout(saludar, 5000);
function saludar() {
  console.log("a");
}
