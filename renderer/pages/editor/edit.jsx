import React, { useEffect,Suspense, useState } from "react";
import { formats } from "../../../plugins/formats";
import {readFile} from "../../../main/backend/fileMenager.js"

function MyComponent({ path, setBubbleMessage }) {
    let DynamicComponent;
    const [file, setFile] = useState("");
    const fileChange = (content) =>{
        if (path.includes("@SERVERSHARED@")){
            null
        }
        else setFile(content)
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            let zawartosc=""
            console.log(path)
            if(path.includes("@SERVER@")){
                setFile(zawartosc)
            }
            else if(path.includes("@SERVERSHARED@")){
                setFile(zawartosc)
            }
            else{
                if(typeof window !== "undefined") {
                    zawartosc=readFile(path)
                    console.log(zawartosc);
                }
                setFile(zawartosc)
            }
        }
        
    }, []);
    if (!path) {
        return <div>Path is not defined.</div>;
    }
    if (!DynamicComponent){
        const fileExtension = path.split("/").pop().split(".").pop();
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
            {DynamicComponent ? <DynamicComponent file={file} /> : null}
        </Suspense>
    );
}

export default MyComponent;
