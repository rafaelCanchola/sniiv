import Vivienda from "./Oferta/Vivienda";
import {subsidios} from "../json/subsidios";
import React from "react";
import {financiamientos} from "../json/financiamientos";
import {inventarioVivienda} from "../json/inventarioVivienda";

export default function Oferta(){
    return (
        <div>
            <Vivienda data={inventarioVivienda} seccion={'subsidios'} title={'Subsidios CONAVI'} titleCifras={'subsidios'} titlePie={'Modalidad'} titleRow={'Programa presupuestal'} group={'programa_presupuestal'} dimensionAxis={'modalidad'} groupAxis={'acciones'} />
            <Vivienda data={financiamientos} seccion={'financiamientos'}  title={'Financiamientos'} titleCifras={'financiamientos'} titlePie={'Modalidad'} titleRow={'Organismo'} group={'organismo'} dimensionAxis={'modalidad'} groupAxis={'acciones'} />
        </div>

)
}