/*

  VARIABLES QUE SE ESTARAN USANDO GLOBALMENTE

*/

const endpoint = "http://127.0.0.1:8080";
const $alert = document.getElementById("alert"),
  $main = document.getElementById("main"),
  $loadtable = document.getElementById("loadtable"),
  $btnBuscar = document.getElementById("btnBuscar"),
  $tableBody = document.getElementById("main-table-body"),
  $entry = document.getElementById("entry"),
  $message = document.getElementById("message");
let dataArticles = {};

/*

COMPROBAR SI EL USUARIO SI ES VALIDO

*/

// Ejecucion de funcion anonima autoejecutable para saber si el usuario es valido
window.addEventListener("load", (e) => {
  async function getAuthorization() {
    try {
      let response = await fetch(endpoint + "/user/" + id),
        data = await response.json();
      if (data.status) {
        $main.classList.remove("hidden-content");
      } else {
        $main.innerHTML = ``;
        $alert.innerHTML = ` <div class="alert alert-danger" role="alert"> <h4 class="alert-heading"> <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"> <use xlink:href="#exclamation-triangle-fill" /> </svg> Hay un error :( </h4> <p> Para que el contenido de esta página sea visible deberías de acceder desde un usuario válido o desde la página oficial. </p> <hr /> <p class="mb-0"> Prueba a ingresar a la pagina desde <a href="https://www.google.com/">aquí</a> </p> </div>`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  getAuthorization();
});

/* 

FUNCIONAMIENTO DE BUSQUEDA DE ARTICULOS MEDIANTE EL USO DE LA API

*/

// elementos necesarios

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

  // funcion async que realizara la peticion HTTPs
  async function getData() {
    try {
      $loadtable.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
      // realizamos la peticion con fetch
      let response = await fetch(endpoint + "/search/" + $entry.value),
        data = await response.json();
      // comprobamos que la peticion se realizo correctamente
      if (!data["status"]) {
        throw { message: "Error al realizar la busqueda" };
      }

      $fragment = document.createDocumentFragment();

      for (const element in data.data) {
        const article = data.data[element];
        $tr = document.createElement("tr");
        $tr.innerHTML =
          `
          <th>` +
          element +
          `</th>
          <th>` +
          article.authors +
          `</th>
          <th>` +
          article.title +
          `</th>
          <th>` +
          article.pub +
          `</th>
          <th>` +
          article.url +
          `</th>
          <th>` +
          article.bibcode +
          `</th>
          <th>` +
          article.doi +
          `</th>
          <th>` +
          article.page_range +
          `</th>
          <th>` +
          article.volume +
          `</th>
          <th>` +
          article.year +
          `</th>
          <th><button type="button" class="btn btn-primary save-button-table" data-id=` +
          element +
          `>Guardar</button></th>`;
        $fragment.appendChild($tr);
      }
      $loadtable.innerHTML = ``;
      $tableBody.appendChild($fragment);
      dataArticles = data.data;
      console.log(dataArticles);
    } catch (error) {
      window.alert("Se produjo un error insepesado: " + error.message);
    }
  }
  getData();
});

/* 

Realizar peticion para guardar Datos

*/

document.body.addEventListener("click", (e) => {
  async function saveData() {
    try {
      // comprobar si el usuario tiene el articulo

      let data = await post(endpoint + "/userarticle", { user_id: 319, bibcode: "prueba" })
      console.log(data);
    } catch (error) {
      pri;
    }
  }

  saveData();
});

async function post(url, body) {
  let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
    data = await response.json();
  return data;
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
