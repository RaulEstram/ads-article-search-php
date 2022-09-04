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
    <nav class="navbar navbar-dark bg-dark header">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="./assets/transparent_logo.svg" alt="ads logo" width="30" height="24"
                    class="d-inline-block align-text-top" />
                Busques de articulos del ADS
            </a>
        </div>
    </nav>

    <main class="content">
        <div class="search">
            <form method="post" id="searchForm">
                <div class="input-group mb-3">
                    <span class="input-group-text">Key</span>
                    <input type="text" class="form-control" id="entry" placeholder="Ingresa key a buscar" />
                    <input type="submit" id="btnBuscar" value="Buscar" class="btn btn-success" />
                </div>
            </form>
        </div>
        
        <div id="message">
            
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
                        <th scope="col">Año</th>
                        <th scope="col">Guardar</th>
                    </tr>
                </thead>
                <tbody id="main-table-body"></tbody>
            </table>
        </div>
    </main>
    <div class="content save-all-button">
        <button type="button" class="btn btn-success" id="save-all">
            Guardar todos los articulos
        </button>
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

