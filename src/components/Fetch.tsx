import React from "react";

export default async function Fetch(apiRoute:any){
    const route = '/SNIIV.svc/'

    return fetch(route+apiRoute,{
        method: 'GET',
        mode:'cors',
        referrerPolicy:'strict-origin-when-cross-origin',

    })
        .then(data => data.json())
}