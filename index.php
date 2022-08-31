<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
    error_log( "Inicio de Pagina");

    $id = $_POST['id'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="./styles/styles.css">
    <title>ADS Search</title>
</head>
<body>
    <h1>hola pagina cargar datos, tu ID es --a: <?php echo $id?></h1>

    <main>
        <div class="search">
            <form method="post" id="searchForm">
                <div class="input-group mb-3">
                    <span class="input-group-text">Key</span>
                    <input type="text" class="form-control" id="entry" placeholder="Ingresa key a buscar">
                    <input type="submit" id="btnBuscar" value="Buscar" class="btn btn-success">
                </div>
            </form>
        </div>

        <div class="table-responsive">
            <table class="table table-striped"> <!-- table-dark -->
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
                <tbody id="main-table-body">
                </tbody>
            </table>
        </div>
    </main>

    <form class="save-element">
        <input type="hidden" name="authors" value="1">
        <input type="hidden" name="title" value="2">
        <input type="hidden" name="pub" value="3">
        <input type="hidden" name="url" value="4">
        <input type="hidden" name="bibcode" value="5">
        <input type="hidden" name="doi" value="6">
        <input type="hidden" name="page_range" value="7">
        <input type="hidden" name="volume" value="8">
        <input type="hidden" name="year" value="9">
        <input type="submit" value="Guardar" class="btn btn-primary">
    </form>
    <form class="save-element">
        <input type="hidden" name="authors" value="Paquita la del barrio">
        <input type="submit" value="Guardar" class="btn btn-primary">
    </form>
    <script src="./scripts/scripts.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>