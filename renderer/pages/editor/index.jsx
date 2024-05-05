import React from "react";
function Sample({ file, save }) {
    return (
        <div>
            <div>{file || "file is empty"}</div>
        </div>
    );
}
export default Sample;