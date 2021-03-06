import React, {useState} from 'react';
import { PieChart } from "../Graficas/PieChart";
import {RowChart} from "../Graficas/RowChart";
import {MostrarCifras} from "../Graficas/Cifras";
import {DataContext} from '../Graficas/Context/CxDContext';
import * as dc from "dc";

import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import TuneIcon from "@material-ui/icons/Tune";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            margin: theme.spacing(2),
        },
        paper:{
            padding: theme.spacing(2),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default,
        },
    })
);

// @ts-ignore
export default function CrossCharts(props){
    const [modo,setModo] = useState(1);
    const [reiniciarS, setReiniciarS] = useState(false);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const handleCallback = (childData:any) =>{
        setModo(childData)
    }

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div className={classes.root}>
                {//@ts-ignore
                    <DataContext seccion={props.seccion} data={props.data} group={props.group} dimensionAxis={props.dimensionAxis} groupAxis={props.groupAxis}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} >
                                    <Paper elevation={3} className={classes.paper}>
                                        <h1>{props.title}</h1>
                                        <h5>{props.periodo}</h5>
                                        <AutorenewIcon fontSize={'large'} onClick={() => {
                                            setReiniciarS(!reiniciarS);
                                            dc.filterAll(props.seccion)
                                        }}/>
                                        <TuneIcon fontSize={'large'}/>
                                        <HelpOutlineIcon fontSize={'large'} onClick={handleClickOpen}/>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} alignItems={'center'}>
                                <Grid item xs={12} sm={4} >
                                    <Paper elevation={3} className={classes.paper}>
                                        <MostrarCifras modoCallback={handleCallback} modoValue={modo} titulo={'Total de '+props.titleCifras} dashboard={props.seccion}/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <Paper elevation={3} className={classes.paper} >
                                        <PieChart modoValue={modo} titulo={props.titlePie}/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Paper elevation={3} className={classes.paper}>
                                        <RowChart modoValue={modo} titulo={props.titleRow}/>
                                    </Paper>
                                </Grid>
                            </Grid>
                    </DataContext>
                }
                <Dialog open={open} onClose={handleClose} aria-labelledby={'customized-dialog-title'}>
                    <DialogTitle>
                        Modalidades
                    </DialogTitle>
                    <DialogContent dividers>
                        <h4>Reconstrucci??n de vivienda:</h4>
                        Bajo esta modalidad se busca alcanzar la normalidad que exist??a antes de sufrir os efectos de un desastre natural.
                        Este proceso puede incluir reconstrucci??n total, reconstrucci??n parcial, reforzamiento estructural y rehabilitaci??n de vivienda con valor patrimonial, con lo que se busca la reducci??n de los riesgos existentes, asegurando la no generaci??n de nuevos riesgos.
                        <h4>Mejoramiento de vivienda:</h4>
                        Apoya la realizaci??n de obras para habilitar o rehabilitar las ??reas y bienes de uso com??n que se encuentran en las unidades y desarrollos habitacionales con deterioro o inseguridad.
                        <h4>Autoproducci??n de vivienda:</h4>
                        Esta modalidad prioriza la participaci??n de los solicitantes, con un  proceso de Producci??n Social de Vivienda Asistida que puede ser operada tanto en cofinanciamiento con o sin cr??dito, como con Subsidio 100% Conavi, con apoyo y acompa??amiento de una asistencia t??cnica calificada.
                        <h4>Vivienda nueva:</h4>
                        Bajo esta modalidad se podr?? adquirir una vivienda terminada, la cual podr?? ser nueva o usada, esta deber?? cumplir con las necesidades de densidad, superficie construida, seguridad estructural, instalaciones, servicios, ??reas de uso com??n, as?? como no estar en zonas de riesgo.
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color={'primary'}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}