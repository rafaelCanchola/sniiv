import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import PieECharts from "../eCharts/PieECharts";
import MapECharts from "../eCharts/MapECharts";

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
    2021,2020,2019,2018,2017,2016,2015,2014,2013
]
const inventarioMonth = [
    1,2,3,4,5
]

const monthName = [
    '',
    '1 Trimestre',
    '2 Trimestre',
    '3 Trimestre',
    '4 Trimestre',
]

// @ts-ignore
export default function DiasInventario(props){
    const classes = useStyles();
    const pieData = [
        {value:props.total.registro,name:'Registro'},
        {value:props.total.construccion,name:'Construccion'},
        {value:props.total.venta,name:'Venta'}]
    const [reiniciarS, setReiniciarS] = useState(false);
    const [inventarioRango0, setInventarioRango0] = useState(props.rangos[0]);
    const [inventarioRango1, setInventarioRango1] = useState(props.rangos[1]);
    const [nombreNivel,setNombreNivel] = useState(props.nivel);
    const [claveEdo, setClaveEdo] = useState(props.clave);

    const handleCallback = (childData:any) =>{
        props.callBack([inventarioRango0,inventarioRango1,childData[0],childData[1]])
    }

    const handleYear = (event: React.ChangeEvent<{value:unknown}>) => {
        setInventarioRango0(event.target.value as number)
    }

    const handleMonth = (event: React.ChangeEvent<{value:unknown}>) => {
        setInventarioRango1(event.target.value as number)
    }
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <h1>{props.title}</h1>
                        <h3>{nombreNivel}</h3>
                        <AutorenewIcon fontSize={'large'} onClick={() => {
                            setReiniciarS(!reiniciarS);
                            props.callBack([inventarioRango0,inventarioRango1,'00','Nacional'])
                        }}/>
                    </Paper>
                    <Paper elevation={3} className={classes.paper}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id={'demo-simple-select-helper-label'}>Año Inicio</InputLabel>
                            <Select labelId={'demo-simple-select-helper-label'}
                                    id={'demo-simple-select-helper'}
                                    value={inventarioRango0}
                                    onChange={handleYear}>
                                {inventarioYear.map((year,key) => <MenuItem value={year} key={key}>{year}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id={'demo-simple-select-helper-label'}>Trimestre</InputLabel>
                            <Select labelId={'demo-simple-select-helper-label'}
                                    id={'demo-simple-select-helper'}
                                    value={inventarioRango1}
                                    onChange={handleMonth}>
                                {inventarioMonth.map((month,key) => <MenuItem value={month} key={key}>{monthName[month]}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Button variant={'contained'} color={'primary'} size={'large'} onClick={() => props.callBack([inventarioRango0,inventarioRango1,claveEdo,nombreNivel])}>Actualizar</Button>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={3} className={classes.paper}>
                        <PieECharts data={pieData}/>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} className={classes.paper}>
                        <MapECharts data={props.data} map={props.map} clave={props.clave} callBack={handleCallback}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>

        )
}