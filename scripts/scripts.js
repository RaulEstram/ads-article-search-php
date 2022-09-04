/* 

FUNCIONAMIENTO DE BUSQUEDA DE ARTICULOS MEDIANTE EL USO DE LA API

*/

// elementos necesarios
$btnBuscar = document.getElementById("btnBuscar");
$table = document.getElementById("main-table-body");
$entry = document.getElementById("entry");
const $message = document.getElementById("message");
const infoSaveData = {
  success: 0,
  errors: 0,
};

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
  let url = "https://ads-rest-api.herokuapp.com/search/" + $entry.value

  // funcion async que realizara la peticion HTTPs
  async function getData() {
    try {
      // realizamos la peticion con fetch
      let response = await fetch(url),
        data = await response.json();
      // comprobamos que la peticion se realizo correctamente
      if (!response.ok) {
        throw { status: response.status, statusText: response.statusText };
      }
      console.log(data);
      // proceso de insertar los datos obtenidos al html
      $fragment = document.createDocumentFragment();

      for (const element in data) {
        $tr = document.createElement("tr");

        $index = document.createElement("td");
        $index.textContent = element;
        $tr.appendChild($index);

        $tdbutton = document.createElement("td");
        $html = '<form class="save-element">';

        for (const key in data[element]) {
          $td = document.createElement("td");
          $td.textContent = String(data[element][key]).replaceAll(
            '"',
            "'"
          );
          $tr.appendChild($td);
          // TODO: add save btn
          $html +=
            `<input type="hidden" name="` +
            key +
            `" value="` +
            data[element][key] +
            `">`;
        }
        // insertar boton guardado
        $html += `<input type="submit" value="Guardar" class="btn btn-primary save-data"></form>`;
        $tdbutton.innerHTML = $html;
        $tr.appendChild($tdbutton);

        $fragment.appendChild($tr);
      }
      $table.innerHTML = "";
      $table.appendChild($fragment);
    } catch (error) {
      // controlamos nuestros errores
      console.log(error);
      window.alert("Se produjo un error insepesado");
    }
    addSaveEvent();
  }

  getData();
});



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
        if (data.ok) {
          $message.innerHTML =
            `
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </symbol>
          </svg>
          <div class="alert alert-success alert-dismissible fade show align-items-center fixed fix-message centrar-alert" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
              <use xlink:href="#check-circle-fill" />
            </svg>
            <strong>Exito: </strong> ` +
            data.message +
            `
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
          infoSaveData.success += 1;
        } else {
          $message.innerHTML =
            `
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </symbol>
          </svg>
          <div class="alert alert-danger alert-dismissible fade show align-items-center fixed fix-message centrar-alert" role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
              <strong>Exito: </strong> ` +
            data.message +
            ` 
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>`;
          infoSaveData.errors += 1;
        }
      });
    } catch (error) {
      // no se le agregan evento a las propiedades que no son un boton
    }
  }
}

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
