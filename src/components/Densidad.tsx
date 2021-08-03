import PublicMap from "./Densidad/PublicMap";
import TableInformacion from "./Densidad/TableInformacion";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import TuneIcon from "@material-ui/icons/Tune";
import React, {useState} from "react";
import {Button} from "@material-ui/core";
import Loader from "react-loader-spinner";
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
        input: {
            display: 'none',
        },
    })
);

export default function Densidad(){
    const [selectedFile, setSelectedFile] = useState();
    const [loader, setLoader] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [cultivo,setCultivo] = useState();

    const handleCallback = (childData:any) =>{
        setCultivo(childData);
    }
    const classes = useStyles();
    const changeHandler = (event:any) => {
        setSelectedFile(event.target.files[0]);
        setDisabled(false)
    };
    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('currentyear','2021');
        // @ts-ignore
        formData.append('file', selectedFile);
        setLoader(true)
        setDisabled(true)
        fetch(
            'http://sniiv-env.eba-yt2cdarp.us-east-2.elasticbeanstalk.com/api/uploadcharge',
            {
                method: 'POST',
                body: formData,
                headers: {"Access-Control-Allow-Origin": "*"},
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                setLoader(false)
                setSelectedFile(undefined)
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoader(false)
                setSelectedFile(undefined)
            });
    };
    return(
        <div className={classes.root}>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <h1>Densidad Habitacional</h1>
                        <AutorenewIcon fontSize={'large'} onClick={() => {

                        }}/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} className={classes.paper}>
                        <PublicMap cultivoCallback={handleCallback}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} className={classes.paper}>
                        {cultivo === undefined ? <>Selecciona un polígono para ver su información.</>:<>Información detallada<TableInformacion id={cultivo}/></>}
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {(loader) ?
                        <Paper elevation={3} className={classes.paper}>
                            <Loader
                                type="Circles"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={0}
                            />
                        </Paper>
                        :
                        <Paper elevation={3} className={classes.paper}>
                            Selecciona un .zip para cargar al sistema.
                            <br/>
                            <br/>
                            <input
                                accept="application/zip"
                                id="contained-button-file"
                                type="file"
                                onChange={changeHandler}
                            />
                            <Button id={"submit"} onClick={handleSubmission} variant="contained" color="primary" component="span" disabled={disabled}>
                                Subir ZIP
                            </Button>
                        </Paper>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>

                    </Paper>
                </Grid>
            </Grid>

        </div>
    )
}