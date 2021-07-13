import Vivienda from "./Oferta/Vivienda";
import React from "react";
import {ofertaInventario} from "../json/ofertaInventario";
import {ofertaRegistro} from "../json/ofertaRegistro";
import {Tab, Tabs} from "@material-ui/core";
import RegistroVivienda from "./Oferta/RegistroVivienda";


export default function Oferta(){
    const [value,setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>,newValue:number) => {
        setValue(newValue)
    }

    return (
        <div>
            <Tabs value={value} onChange={handleChange} indicatorColor={"primary"} textColor={"primary"} centered>
                <Tab label={"Inventario de Vivienda"}></Tab>
                <Tab label={"Registro de Vivienda"}/>
            </Tabs>
            {(value === 0)?
                <Vivienda data={ofertaInventario} seccion={'ofertaInventario'}  title={'Inventario de Vivienda'} titleCifras={'viviendas'} titlePie={'Tipo de vivienda'} titleRow1={'Avance de Obra'} titleRow2={'Segmento UMA'} aAxis={'tipo_vivienda'} bAxis={'avance_obra'} cAxis={'viviendas'} dAxis={'estado'} eAxis={'segmento'} fAxis={'segmento_uma'} /> :
                <RegistroVivienda data={ofertaRegistro} seccion={'ofertaRegistro'}  title={'Registro de Vivienda'} titleCifras={'viviendas'} titlePie={'Tipo de vivienda'} titleRow1={'PCU'} titleRow2={'Segmento UMA'} aAxis={'tipo_vivienda'} bAxis={'pcu'} cAxis={'viviendas'} dAxis={'estado'} eAxis={'segmento'} fAxis={'segmento_uma'} />
            }
            <br/><br/><br/>
        </div>

)
}