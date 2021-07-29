import React from "react";

export default function FetchURL(apiRoute:any,map:boolean){
    const route = 'https://sniiv-cors.herokuapp.com/https://sniiv.conavi.gob.mx/'

    return fetch(route+(map?'js/maps/':'SNIIV.svc/')+apiRoute,{
        method: 'GET',
        mode:'cors',
        referrerPolicy:'strict-origin-when-cross-origin',

    })
}