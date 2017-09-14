import React from 'react';
import ReactLoading from 'react-loading';

class Loading extends React.Component{
    render(){
        return(
            <ReactLoading type="spinningBubbles" className="center" color="#444" height="100px" width="100px"/> 
        )
    }
}
export default Loading