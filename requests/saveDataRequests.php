<?php

    require_once '../config/config.php';
    require_once '../libs/database.php';

    try {
        $data = array(
            "authors" => $_POST['authors'],
            "title" => $_POST['title'],
            "pub" => $_POST['pub'],
            "bibcode" => $_POST['bibcode'], 
            "doi" => $_POST['doi'],
            "fpage" => $_POST['page_range'],
            "lpage" => $_POST['page_range'],
            "volume" => $_POST['volume'],
            "year" => $_POST['year'],
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