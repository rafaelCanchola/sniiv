import React from "react";
import {demandaSubsidios} from "../json/demandaSubsidios";
import {demandaFinanciamientos} from "../json/demandaFinanciamientos";
import {Tab, Tabs} from "@material-ui/core";
import RegistroVivienda from "./Oferta/RegistroVivienda";
import Subisidios from "./Demanda/Subisidios";
import Financiamientos from "./Demanda/Financiamientos";

export default function Oferta(){
    const [value,setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>,newValue:number) => {
        setValue(newValue)
    }

    return (
        <div>
            <Tabs value={value} onChange={handleChange} indicatorColor={"primary"} textColor={"primary"} centered>
                <Tab label={"Subsidios"}></Tab>
                <Tab label={"Financiamientos"}/>
            </Tabs>
            {(value === 0)?
                <Subisidios data={demandaSubsidios} seccion={'ofertaInventario'} title={'Inventario de Vivienda'}
                             titleCifras={'subsidios'} titlePie={'Genero'} titlePie2={'Edad'}
                             titleRow1={'Programa presupuestal'} titleRow2={'Salario'} aAxis={'programa_presupuestal'}
                             bAxis={'monto'} cAxis={'acciones'} dAxis={'estado'} eAxis={'genero'} fAxis={'rango_edad'}
                             gAxis={'rango_salarial'}/> :
                <Financiamientos data={demandaFinanciamientos} seccion={'ofertaInventario'} title={'Inventario de Vivienda'}
                            titleCifras={'subsidios'} titlePie={'Genero'} titlePie2={'Edad'}
                            titleRow1={'Programa presupuestal'} titleRow2={'Salario'} aAxis={'organismo'}
                            bAxis={'monto'} cAxis={'acciones'} dAxis={'estado'} eAxis={'genero'} fAxis={'rango_edad'}
                            gAxis={'rango_salarial'}/>
            }
            <br/><br/><br/>
        </div>

)
}