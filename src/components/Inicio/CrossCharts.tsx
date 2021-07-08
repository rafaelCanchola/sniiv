import React, {useState} from 'react';
import { PieChart } from "./Graficas/PieChart";
import {RowChart} from "./Graficas/RowChart";
import {MostrarCifras} from "./Graficas/Cifras";
import {DataContext} from './Graficas/CxDContext';
import * as dc from "dc";

import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            display:'flex',
            margin: theme.spacing(2),
        },heading:{
            padding: theme.spacing(2),
            textAlign:"center",
            color: theme.palette.text.secondary,
            minWidth:400,
        },
        paper:{
            padding: theme.spacing(2),
            textAlign:"center",
            color: theme.palette.text.secondary,
            minWidth:400,
            minHeight:300,

        },
    })
);

// @ts-ignore
export default function CrossCharts(props){
    const [modo,setModo] = useState(1);
    const [reiniciarS, setReiniciarS] = useState(false);
    const classes = useStyles();
    const handleCallback = (childData:any) =>{
        setModo(childData)
    }

    return(
        <div className={classes.root}>
                {//@ts-ignore
                    <DataContext seccion={props.seccion} data={props.data} group={props.group} dimensionAxis={props.dimensionAxis} groupAxis={props.groupAxis}>
                        <Grid container spacing={2}>
                            <Grid item md>
                                <Paper elevation={3} className={classes.heading}>
                                    <h1>{props.title}</h1>
                                    <h3>Periodo</h3>
                                    del 30 de abril de 2021
                                    <button onClick={() => {
                                        setReiniciarS(!reiniciarS);
                                        dc.filterAll(props.seccion)
                                    }}>Reiniciar</button>
                                </Paper>
                            </Grid>

                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md  >
                                <Paper elevation={3} className={classes.paper}>
                                    <MostrarCifras modoCallback={handleCallback} modoValue={modo} titulo={'Total de '+props.titleCifras} dashboard={props.seccion}/>
                                </Paper>
                            </Grid>
                            <Grid item md  >
                                <Paper elevation={3} className={classes.paper}>
                                    <PieChart modoValue={modo} titulo={props.titlePie}/>
                                </Paper>
                            </Grid>
                            <Grid item md >
                                <Paper elevation={3} className={classes.paper}>
                                    <RowChart modoValue={modo} titulo={props.titleRow}/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </DataContext>
                }
        </div>
    )
}