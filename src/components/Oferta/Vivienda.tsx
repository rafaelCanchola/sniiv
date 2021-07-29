import React, {useState} from 'react';
import * as dc from "dc";
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TuneIcon from '@material-ui/icons/Tune';

import {ChoropletChart} from "../Graficas/Vivienda/ChoropletChart";
import {BarChart} from "../Graficas/Vivienda/BarChart";
import {PieChart} from "../Graficas/Vivienda/PieChart";
import {RowChart} from "../Graficas/Vivienda/RowChart";
import {RowChart2} from "../Graficas/Vivienda/RowChart2";
import {MostrarAcciones} from "../Graficas/Vivienda/Acciones";
import {DataContext} from '../Graficas/Context/ViviendaContext';
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
    2021,2020,2019,2018,2017,2016,2015,2014
]
const inventarioMonth = [
    1,2,3,4,5,6,7,8,9,10,11,12
]
const monthName = [
    '',
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
]

// @ts-ignore
export default function Vivienda(props){
    const [modo,setModo] = useState(1);
    const [reiniciarS, setReiniciarS] = useState(false);
    const [inventarioRango0, setInventarioRango0] = useState(props.rangos[0]);
    const [inventarioRango1, setInventarioRango1] = useState(props.rangos[1]);
    const classes = useStyles();

    const handleYear = (event: React.ChangeEvent<{value:unknown}>) => {
        setInventarioRango0(event.target.value as number)
    }

    const handleMonth = (event: React.ChangeEvent<{value:unknown}>) => {
        setInventarioRango1(event.target.value as number)
    }
    const handleCallback = (childData:any) =>{
        setModo(childData)
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
                                    <InputLabel id={'demo-simple-select-helper-label'}> Año</InputLabel>
                                    <Select labelId={'demo-simple-select-helper-label'}
                                            id={'demo-simple-select-helper'}
                                            value={inventarioRango0}
                                            onChange={handleYear}>
                                        {inventarioYear.map((year,key) => <MenuItem value={year} key={key}>{year}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id={'demo-simple-select-helper-label'}> Mes</InputLabel>
                                    <Select labelId={'demo-simple-select-helper-label'}
                                            id={'demo-simple-select-helper'}
                                            value={inventarioRango1}
                                            onChange={handleMonth}>
                                        {inventarioMonth.map((month,key) => <MenuItem value={month} key={key}>{monthName[month]}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <Button variant={'contained'} color={'primary'} size={'large'} onClick={() => props.callBack([inventarioRango0,inventarioRango1])}>Actualizar</Button>
                                </FormControl>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item xs={12} sm={12}  md={7}>
                            <Paper elevation={3} className={classes.paper}>
                                <ChoropletChart modoValue={modo} titulo={'Estados'}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} >
                            <Paper elevation={3} className={classes.paper}>
                                <MostrarAcciones modoCallback={handleCallback} modoValue={modo} titulo={'Total de '+props.titleCifras} dashboard={props.seccion}/>
                            </Paper>
                            <Paper elevation={3} className={classes.paper}>
                                <BarChart modoValue={modo} titulo={'Segmento'}/>
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