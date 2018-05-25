import React from 'react';

function Loader(props) {
    return (
        <div style={{display: props.loading ? "block" : "none"}}>
            <Loader active={props.loading} inline />
            <span style={{"fontFamily": "Lato"}}>&nbsp;&nbsp;&nbsp;{props.children}</span>
        </div>
    );
}


export default Loader;