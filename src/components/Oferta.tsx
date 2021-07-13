import Vivienda from "./Oferta/Vivienda";
import React from "react";
import {ofertaInventario} from "../json/ofertaInventario";
import {ofertaRegistro} from "../json/ofertaRegistro";

export default function Oferta(){
    return (
        <div>
            <Vivienda data={ofertaInventario} seccion={'ofertaInventario'}  title={'Inventario de Vivienda'} titleCifras={'viviendas'} titlePie={'Tipo de vivienda'} titleRow1={'Avance de Obra'} titleRow2={'Segmento UMA'} aAxis={'tipo_vivienda'} bAxis={'avance_obra'} cAxis={'viviendas'} dAxis={'estado'} eAxis={'segmento'} fAxis={'segmento_uma'} />
            <Vivienda data={ofertaRegistro} seccion={'ofertaRegistro'}  title={'Registro de Vivienda'} titleCifras={'viviendas'} titlePie={'Tipo de vivienda'} titleRow1={'PCU'} titleRow2={'Segmento UMA'} aAxis={'tipo_vivienda'} bAxis={'pcu'} cAxis={'viviendas'} dAxis={'estado'} eAxis={'segmento'} fAxis={'segmento_uma'} />
            <br/><br/><br/>
        </div>

)
}