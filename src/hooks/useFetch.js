import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    const [patientId, setPatientId] = useState()

    const httpConfig = (data, method) => {
        if(method === "POST"){
            setConfig({
                method,
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
        }
        else if(method === "DELETE"){
            setConfig({
                method,
                headers: { "Content-Type": "application/json"}
            });
            setPatientId(data)
        }
        setMethod(method)
    }

    useEffect(() => {
        const fetchData  = async () => {
            setLoading(true)

            try{
               const res = await fetch(url)
                const json = await res.json()
                setData(json)
            }
            catch (error) {

                setError("Houve algum erro ao carregar dos dados")
            }
            setLoading(false)
        };
        fetchData();
    }, [url, callFetch]);

    //post
    useEffect(() => {
        
        const httpRequest = async () => {
            let json

            if(method === "POST"){
                let fetchOptions = [url, config];
                const res = await fetch(...fetchOptions);
                json = await res.json()

            }else if(method === "DELETE"){
                const deleteUrl = `${url}/${patientId}`
                const res = await fetch(deleteUrl, config);
                json = await res.json()
            }
            
            setCallFetch(json);
        };
        httpRequest();

    }, [config, method, url, patientId]);

    return {data, httpConfig, loading, error}
}