import React, {Component} from "react";
import {ofertaInventario} from "../json/ofertaInventario";
import {ofertaRegistro} from "../json/ofertaRegistro";
import {Tab, Tabs} from "@material-ui/core";
import Vivienda from "./Oferta/Vivienda";
import RegistroVivienda from "./Oferta/RegistroVivienda";
import DiasInventario from "./Oferta/DiasInventario";
import FetchURL from "./FetchURL";
import Fetch from "./Fetch";

const handleApi = async(route:any) => {
    return await Fetch(route);
}

const inventarioRoute = 'getKPIsOfertaInventario/'
const registroRoute = 'getKPIsOferta/'
const diasInventarioTotalRoute = 'getTotalDiasInventarioEstatal/'
const diasInventarioRoute = 'getDiasInventarioEstatal/'
const diasInventarioMunicipalTotalRoute = 'getTotalDiasInventarioMunicipal/'
const diasInventarioMunicipalRoute = 'getDiasInventarioMunicipal/'


export default class Oferta extends Component<any, any> {

    constructor(props:any) {
        super(props);
        this.state = {
            value:0,
            control:false,
            loadPage:false,
            inventario:[],
            registro:[],
            diasInventario:[],
            diasInventarioTotal:[],
            inventarioRango0:2021,inventarioRango1:4,
            registroRango0:2021,registroRango1:2021,
            diasRango0:2021,diasRango1:1,
            mapCode:'00',
            mapRep:'mx',
            nameCode:'Nacional',
            mapJson:[],
            mapEstado:[],
        }
    }
    async LoadData (){
        const results = await Promise.all([
            FetchURL(inventarioRoute+this.state.inventarioRango0+'/'+this.state.inventarioRango1,false),
            FetchURL(registroRoute+this.state.registroRango0+'/'+this.state.registroRango1,false),
            FetchURL(diasInventarioTotalRoute+this.state.diasRango0+'/'+this.state.diasRango1,false),
            FetchURL(diasInventarioRoute+this.state.diasRango0+'/'+this.state.diasRango1,false),
            FetchURL(this.state.mapRep+'.json',true),
            FetchURL(this.state.mapCode+'.json',true),
        ])

        const dataPromises = results.map(result => result.json())
        const finalData = await Promise.all(dataPromises)
        return finalData;
    }

    async LoadDias(childData:any){
        const results = await Promise.all([
            FetchURL(childData[2]+'.json',true),
            FetchURL((childData[2] === '00')?(diasInventarioRoute+childData[0]+'/'+childData[1]):(diasInventarioMunicipalRoute+childData[0]+'/'+childData[1]+'/'+childData[2]+'/1'),false),
            FetchURL((childData[2] === '00')?(diasInventarioTotalRoute+childData[0]+'/'+childData[1]):(diasInventarioMunicipalTotalRoute+childData[0]+'/'+childData[1]+'/'+childData[2]),false),

        ])
        const dataPromises = results.map(result => result.json())
        const finalData = await Promise.all(dataPromises)
        this.setState({
            mapEstado:finalData[0],
            diasInventario:finalData[1],
            diasInventarioTotal:finalData[2],
            control:true,
            loadPage:true,
        })
    }
    async componentDidMount() {
        let load = await this.LoadData()
        this.setState({inventario:load[0],registro:load[1],diasInventarioTotal:load[2],diasInventario:load[3],mapJson:load[4],mapEstado:load[5],loadPage:true,control:true});
        //handleApi(inventarioRoute+this.state.inventarioRango0+'/'+this.state.inventarioRango1).then(data => this.setState({inventario:data,controlInv:true}))
        //handleApi(registroRoute+this.state.registroRango0+'/'+this.state.registroRango1).then(data => this.setState({registro:data,controlReg:true}))
        //handleApi(diasInventarioTotalRoute+this.state.diasRango0+'/'+this.state.diasRango1).then(data => this.setState({diasInventario:data,controlDias:true}))
        //handleApi(diasInventarioRoute+this.state.diasRango0+'/'+this.state.diasRango1).then(data => this.setState({diasInventario:data,controlDias:true}))
        //handleApi(this.state.mapCode+'.json').then(data => this.setState({diasInventario:data,controlDias:true}))
    }

    render() {

        const handleChange = (event: React.ChangeEvent<{}>,newValue:number) => {
            this.setState({value:newValue})
        }

        const handleCallbackInventario = (childData: any) => {
            this.setState({
                control:false,
                loadPage:false,
                inventarioRango0: childData[0],
                inventarioRango1: childData[1],
            })
            handleApi(inventarioRoute + childData[0] + '/' + childData[1])
                .then(data => this.setState({
                    inventario: data,
                    control:true,
                    loadPage:true,
                }))
        }

        const handleCallbackRegistro = (childData:any) =>{
            this.setState({
                control:false,
                loadPage:false,
                registroRango0: childData[0],
                registroRango1: childData[1],
            })
            handleApi(registroRoute+childData[0]+'/'+childData[1])
                .then(data => this.setState({
                    registro:data,
                    control:true,
                    loadPage:true,
                }))
        }

        const handleCallbackDias = (childData:any) =>{
            this.setState({
                control:false,
                loadPage:false,
                diasRango0: childData[0],
                diasRango1: childData[1],
                mapCode: childData[2],
                nameCode: childData[3],
            })
            this.LoadDias(childData);
        }

        return (
            <div >
                <Tabs value={this.state.value} onChange={handleChange} indicatorColor={"primary"} textColor={"primary"} centered >
                    <Tab label={"Inventario de Vivienda"}/>
                    <Tab label={"Registro de Vivienda"}/>
                    <Tab label={"RENARET"}/>
                    <Tab label={"Días de Inventario"}/>
                    <Tab label={"Parque Habitacional"}/>
                </Tabs>

                {(this.state.loadPage)?
                    (this.state.value === 0)?
                        (this.state.control)?
                            <Vivienda callBack={handleCallbackInventario} map={this.state.mapJson} rangos={[this.state.inventarioRango0,this.state.inventarioRango1]} data={this.state.inventario} seccion={'ofertaInventario'} title={'Inventario de Vivienda'}
                                      titleCifras={'viviendas'} titlePie={'Tipo de vivienda'} titleRow1={'Avance de Obra'}
                                      titleRow2={'Segmento UMA'} aAxis={'tipo_vivienda'} bAxis={'avance_obra'} cAxis={'viviendas'}
                                      dAxis={'estado'} eAxis={'segmento'} fAxis={'segmento_uma'}/> : <></>
                        :
                        (this.state.value === 1)?
                            (this.state.control)?
                                <RegistroVivienda callBack={handleCallbackRegistro} map={this.state.mapJson} rangos={[this.state.registroRango0,this.state.registroRango1]} data={this.state.registro} seccion={'ofertaRegistro'}  title={'Registro de Vivienda'}
                                          titleCifras={'viviendas'} titlePie={'Tipo de vivienda'} titleRow1={'PCU'}
                                          titleRow2={'Segmento UMA'} aAxis={'tipo_vivienda'} bAxis={'pcu'} cAxis={'viviendas'}
                                          dAxis={'estado'} eAxis={'segmento'} fAxis={'segmento_uma'} /> : <></>
                            :
                            (this.state.value === 2)?
                                (this.state.control)?
                                    <DiasInventario callBack={handleCallbackDias} rangos={[this.state.diasRango0,this.state.diasRango1]} data={this.state.diasInventario} total={this.state.diasInventarioTotal} map={this.state.mapEstado} clave={this.state.mapCode}
                                                    nivel={this.state.nameCode} title={'Días de Inventario'}/>  : <></>
                                :
                                (this.state.value === 3)?
                                    (this.state.control)?
                                        <DiasInventario callBack={handleCallbackDias} rangos={[this.state.diasRango0,this.state.diasRango1]} data={this.state.diasInventario} total={this.state.diasInventarioTotal} map={this.state.mapEstado} clave={this.state.mapCode}
                                            nivel={this.state.nameCode} title={'Días de Inventario'}/>  : <></>
                                    :
                                    <></>
                    :<></>
                }
                <br/><br/><br/>
            </div>
        )
    }
}