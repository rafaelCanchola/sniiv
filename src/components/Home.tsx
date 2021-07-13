import React from 'react';

import CrossCharts from "./Inicio/CrossCharts";
import AccionesCharts from "./Inicio/AccionesCharts";
import {Paper, Tab, Tabs} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {subsidios} from "../json/subsidios";
import {financiamientos} from "../json/financiamientos";
import {pcu} from "../json/pcu";
import {inventario} from "../json/inventario";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            margin: theme.spacing(2),
        },
        paper:{
            padding: theme.spacing(2),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default
        },
    })
);
export default function Home(){
    const classes = useStyles();
    const [value,setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>,newValue:number) => {
        setValue(newValue)
    }
    return(
        <div>
            <Tabs value={value} onChange={handleChange} indicatorColor={"primary"} textColor={"primary"} centered>
                <Tab label={"Subsidios y Financiamientos"}></Tab>
                <Tab label={"Vivienda"}/>
            </Tabs>
            {(value === 0) ?
                    <CrossCharts data={subsidios} seccion={'subsidios'} title={'Subsidios CONAVI'} titleCifras={'subsidios'}
                                 titlePie={'Modalidad'} titleRow={'Programa presupuestal'} group={'programa_presupuestal'}
                                 dimensionAxis={'modalidad'} groupAxis={'acciones'}/> :
                    <AccionesCharts data={inventario} seccion={'inventario'}  title={'Inventario de Vivienda'} titleCifras={'viviendas vigentes'}
                                titlePie={'Segmento'} titleRow={'Avance de obra'} group={'avance_obra'} dimensionAxis={'segmento'}
                                groupAxis={'viviendas'} />
                }
                {(value === 0) ?
                    <CrossCharts data={financiamientos} seccion={'financiamientos'}  title={'Financiamientos'} titleCifras={'financiamientos'} titlePie={'Modalidad'} titleRow={'Organismo'} group={'organismo'} dimensionAxis={'modalidad'} groupAxis={'acciones'} /> :
                    <AccionesCharts data={pcu} seccion={'registro'}  title={'Registro de Vivienda'} titleCifras={'viviendas registradas'} titlePie={'PCU'} titleRow={'Segmento VSM'} group={'segmento'} dimensionAxis={'pcu'} groupAxis={'viviendas'} />
                }
            <br/><br/><br/>
        </div>
    )
}