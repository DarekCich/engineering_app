import React, { useEffect,Suspense, useState } from "react";
import { formats } from "../../../plugins/formats";
import {readFile, writeFile} from "../../../main/backend/fileMenager.js"
import axios from 'axios'

function MyComponent({ path, setBubbleMessage }) {
    let DynamicComponent;
    const [file, setFile] = useState("");
    const save = async (content) =>{
        console.log(path);
        if (path.includes("//sh")){
            setBubbleMessage("Nie można zapisywać plików udostostępnianych przez kogoś");
        }
        else if (path.includes("//my")){
            axios.patch(`http://127.0.0.1:8000/api/files/${path.split("//")[1]}/`,{tresc: (content || file)})
            setFile(content)
        }
        else{
            writeFile(path, content || file)
            .then((message) => {
                setBubbleMessage(message);
            })
            .catch((error) => {
                setBubbleMessage(error); 
            });
        }
    }
    const get_file = (url) => {
        return axios.get(url).then((response) => response.data);
    };
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            let zawartosc = "";
            if (path.includes("//my")) {
                const id = path.split("//")[1];
                get_file(`http://127.0.0.1:8000/api/files/${id}/`)
                    .then((response) => {
                        setFile(response.tresc);
                        console.log(response.tresc);
                    })
                    .catch((error) => {
                        console.error("Błąd podczas pobierania pliku:", error);
                    });
            } else if (path.includes("//sh")) {
                const id = path.split("//")[1];
                get_file(`http://127.0.0.1:8000/api/sharedfiles/${id}/shared_file_to_me_detail/`)
                    .then((response) => {
                        setFile(response[0].file.tresc);
                    })
                    .catch((error) => {
                        console.error("Błąd podczas pobierania pliku:", error);
                    });
            } else {
                if (typeof window !== "undefined") {
                    zawartosc = readFile(path);
                }
                setFile(zawartosc);
            }
        }
    }, []);
    
    if (!path) {
        return <div>Path is not defined.</div>;
    }
    if (!DynamicComponent){
        path.includes('//')

        const fileExtension = path.includes('//') ? path.split("//")[0].split(".").pop() : path.split("/").pop().split(".").pop();
        if (formats.includes(fileExtension)) {
            DynamicComponent = React.lazy(() =>
                import(`../../../plugins/${fileExtension}/${fileExtension}.jsx`).catch(() =>
                    import("./index.jsx")
                )
            );
        } else {
            DynamicComponent = React.lazy(() => import("./index.jsx"));
        }
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {DynamicComponent ? <DynamicComponent file={file} setFile={setFile} save={save} /> : null}
        </Suspense>
    );
}

export default MyComponent;
