import React, {useState} from 'react';
import { PieChart } from "../Graficas/Vivienda/PieChart";
import {RowChart} from "../Graficas/Vivienda/RowChart";
import {RowChart2} from "../Graficas/Vivienda/RowChart2";
import {DataContext} from '../Graficas/Context/ViviendaContext';
import {MostrarAcciones} from "../Graficas/Vivienda/Acciones";
import * as dc from "dc";


import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TuneIcon from '@material-ui/icons/Tune';
import {ChoropletChart} from "../Graficas/Vivienda/ChoropletChart";
import {BarChart} from "../Graficas/Vivienda/BarChart";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

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
        formControl:{
            minWidth:120,
        }
    })
);

const inventarioYear = [
    2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006
]

// @ts-ignore
export default function RegistroVivienda(props){
    const [modo,setModo] = useState(1);
    const [reiniciarS, setReiniciarS] = useState(false);
    const [rango0, setRango0] = useState(props.rangos[0]);
    const [rango1, setRango1] = useState(props.rangos[1]);

    const classes = useStyles();

    const handleCallback = (childData:any) =>{
        setModo(childData)
    }
    const handleYearIni = (event: React.ChangeEvent<{value:unknown}>) => {
        setRango0(event.target.value as number)
    }
    const handleYearFin = (event: React.ChangeEvent<{value:unknown}>) => {
        setRango1(event.target.value as number)
    }

    return(
        <div className={classes.root}>
            {//@ts-ignore
                <DataContext seccion={props.seccion} data={props.data} aAxis={props.aAxis} bAxis={props.bAxis} cAxis={props.cAxis} dAxis={props.dAxis} eAxis={props.eAxis} fAxis={props.fAxis} map={props.map}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={3} className={classes.paper}>
                                <h1>{props.title}</h1>
                                <h5>{"del 30 de abril de 2021"}</h5>
                                <AutorenewIcon fontSize={'large'} onClick={() => {
                                    setReiniciarS(!reiniciarS);
                                    dc.filterAll(props.seccion)
                                }}/>
                                <TuneIcon fontSize={'large'}/>
                            </Paper>
                            <Paper elevation={3} className={classes.paper}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id={'demo-simple-select-helper-label'}>Año Inicio</InputLabel>
                                    <Select labelId={'demo-simple-select-helper-label'}
                                            id={'demo-simple-select-helper'}
                                            value={rango0}
                                            onChange={handleYearIni}>
                                        {inventarioYear.map((year,key) => <MenuItem value={year} key={key}>{year}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id={'demo-simple-select-helper-label'}>Año Fin</InputLabel>
                                    <Select labelId={'demo-simple-select-helper-label'}
                                            id={'demo-simple-select-helper'}
                                            value={rango1}
                                            onChange={handleYearFin}>
                                        {inventarioYear.map((year,key) => <MenuItem value={year} key={key}>{year}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <Button variant={'contained'} color={'primary'} size={'large'} onClick={() => props.callBack(
                                        (rango0 <= rango1)?[rango0,rango1]:[rango1,rango0]
                                    )}>Actualizar</Button>
                                </FormControl>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item xs={12} sm={12}  md={7}>
                            <Paper elevation={3} className={classes.paper}>
                                <ChoropletChart modoValue={modo} titulo={'Estados'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} >
                            <Paper elevation={3} className={classes.paper}>
                                <MostrarAcciones modoCallback={handleCallback} modoValue={modo} titulo={'Total de '+props.titleCifras} dashboard={props.seccion}/>
                            </Paper>
                            <Paper elevation={3} className={classes.paper}>
                                <BarChart modoValue={modo} titulo={'Segmento'}></BarChart>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Paper elevation={3} className={classes.paper}>
                                <PieChart modoValue={modo} titulo={props.titlePie}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Paper elevation={3} className={classes.paper}>
                                <RowChart modoValue={modo} titulo={props.titleRow1}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Paper elevation={3} className={classes.paper}>
                                <RowChart2 modoValue={modo} titulo={props.titleRow2}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </DataContext>
            }
        </div>
    )
}