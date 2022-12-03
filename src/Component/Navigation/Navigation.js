import React from "react";

const Navigation = ({onRouteChange,isSignIn}) =>{
    if(isSignIn){
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={()=>onRouteChange('signOut')} className="f3 link dim black underline pa3 pointer">Sing Out</p>
            </nav>
        );
    }else{
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={()=>onRouteChange('signIn')} className="f3 link dim black underline pa3 pointer">Sing In</p>
                <p onClick={()=>onRouteChange('Register')} className="f3 link dim black underline pa3 pointer">Register</p>
            </nav>
        );
    }
   
}

export default Navigation;