<?php

    require_once '../config/config.php';
    require_once '../libs/database.php';

    try {
        $pages = explode("-", $_POST['page_range']);
        $fpage = $pages[0];
        $lpage = $pages[1];
        $data = array(
            "authors" => $_POST['authors'] != "" ? $_POST['authors'] : NULL,
            "title" => $_POST['title'] != "" ? $_POST['title'] : NULL,
            "pub" => $_POST['pub'] != "" ? $_POST['pub'] : NULL,
            "bibcode" => $_POST['bibcode'] != "" ? $_POST['bibcode'] : NULL, 
            "doi" => $_POST['doi'] != "" ? $_POST['doi'] : NULL,
            "fpage" => $fpage != "" and $fpage != NULL ? $fpage : NULL,
            "lpage" => $fpage != "" and $fpage != NULL ? $lpage : NULL,
            "volume" => $_POST['volume'] != "" ? $_POST['volume'] : NULL,
            "year" => $_POST['year'] != "" ? $_POST['year'] : NULL,
        );
        // TODO: cambiar array para que quede con el query
        try {
            $db = new Database();
            $cursor = $db->connect();
            try {
                $insertQuery = $cursor->prepare("INSERT INTO `DatosADS` (`autores`, `title`, `pub`, `bibcode`, `doi`, `fpage`, `lpage`, `volumen`, `year`) VALUES (:authors , :title, :pub , :bibcode, :doi, :fpage, :lpage, :volume, :year)");
                $insertQuery->execute($data);
                echo json_encode(array("message" => "exito insert" , "data" => array($data))); // TODO: cambiar mensaje
            } catch (\Throwable $th) {
                try {
                    $idQuery = $cursor->prepare("SELECT `id` FROM `DatosADS` WHERE bibcode = :bibcode and doi = :doi;");
                    $idQuery->execute(array(
                        "bibcode" => $_POST['bibcode'], 
                        "doi" => $_POST['doi'],));
                    $idArticle = $idQuery->fetch(PDO::FETCH_ASSOC)['id'];
                    $updateQuery = $cursor->prepare("UPDATE `DatosADS` SET `autores` = :authors, `title` = :title, `pub` = :pub, `bibcode` = :bibcode, `doi` = :doi, `fpage` = :fpage, `lpage` = :lpage, `volumen` = :volume, `year` = :year WHERE `DatosADS`.`id` = :id");
                    $data['id'] = $idArticle;
                    $updateQuery->execute($data);
                    echo json_encode(array("message" => "update", "id" => $idArticle, "data" => $data )); // TODO: cambiar mensaje
                } catch (\Throwable $th) {
                    echo json_encode(array("message" => "error guardar articulo" )); // TODO: cambiar mensaje
                }
            }
        } catch (\Throwable $th) {
            echo json_encode(array("message" => "error en la base de datos" )); // TODO: cambiar mensaje
        }
    } catch (\Throwable $th) {
        echo json_encode(array( "message" => "Se produjo un error inesperado")); // TODO: cambiar mensaje
    }
    
    
?> 