<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
    error_log( "Inicio de Pagina");

    $id = $_POST['id'];
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <link rel="stylesheet" href="./styles/styles.css" />
    <title>ADS Search</title>
</head>

<body>

    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
            <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </symbol>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
    </svg>

    <nav class="navbar navbar-dark bg-dark header">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="./assets/transparent_logo.svg" alt="ads logo" width="30" height="24"
                    class="d-inline-block align-text-top" />
                Busques de articulos del ADS
            </a>
        </div>
    </nav>
    <div class="content" id="alert"></div>

    <main class="content hidden-content" id="main">
        <div class="search">
            <form method="post" id="searchForm">
                <div class="input-group mb-3">
                    <span class="input-group-text">Key</span>
                    <input type="text" class="form-control" id="entry" placeholder="Ingresa key a buscar" />
                    <input type="submit" id="btnBuscar" value="Buscar" class="btn btn-success" />
                </div>
            </form>
        </div>

        <div class="table-responsive">
            <table class="table table-striped">
                <!-- table-dark -->
                <thead class="table-dark">
                    <tr class="table-dark">
                        <th scope="col">#</th>
                        <th scope="col">Autores</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">PUB</th>
                        <th scope="col">URL</th>
                        <th scope="col">BIBCODE</th>
                        <th scope="col">DOI</th>
                        <th scope="col">Paginas</th>
                        <th scope="col">Volumen</th>
                        <th scope="col">A??o</th>
                        <th scope="col">Guardar</th>
                    </tr>
                </thead>
                <tbody id="main-table-body">
                </tbody>
            </table>
            <div id="loadtable"></div>
        </div>

        <div class="content save-all-button">
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="save-all">
                Guardar todos los articulos
            </button>
        </div>
    </main>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Confirmacion de Accion!</h5>
                    <button type="button" class="btn-close cancel-button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="text-modal">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary cancel-button" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="ok-modal"
                        data-id="">Guardar / Actualizar</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        const id = "<?php echo $id ?>";
    </script>
    <script src="./scripts/scripts.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
</body>

</html>

