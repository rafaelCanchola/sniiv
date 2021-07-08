import React from 'react';

import CrossCharts from "./Inicio/CrossCharts";
import AccionesCharts from "./Inicio/AccionesCharts";
import {subsidios} from "../json/subsidios";
import {financiamientos} from "../json/financiamientos";
import {pcu} from "../json/pcu";
import {inventario} from "../json/inventario";

export default function Home(){

    return(
        <div>
            <CrossCharts data={subsidios} seccion={'subsidios'} title={'Subsidios CONAVI'} titleCifras={'subsidios'} titlePie={'Modalidad'} titleRow={'Programa presupuestal'} group={'programa_presupuestal'} dimensionAxis={'modalidad'} groupAxis={'acciones'} />
            <CrossCharts data={financiamientos} seccion={'financiamientos'}  title={'Financiamientos'} titleCifras={'financiamientos'} titlePie={'Modalidad'} titleRow={'Organismo'} group={'organismo'} dimensionAxis={'modalidad'} groupAxis={'acciones'} />
            <AccionesCharts data={inventario} seccion={'inventario'}  title={'Inventario de Vivienda'} titleCifras={'viviendas vigentes'} titlePie={'Segmento'} titleRow={'Avance de obra'} group={'avance_obra'} dimensionAxis={'segmento'} groupAxis={'viviendas'} />
            <AccionesCharts data={pcu} seccion={'registro'}  title={'Registro de Vivienda'} titleCifras={'viviendas registradas'} titlePie={'PCU'} titleRow={'Segmento VSM'} group={'segmento'} dimensionAxis={'pcu'} groupAxis={'viviendas'} />

        </div>
    )
}