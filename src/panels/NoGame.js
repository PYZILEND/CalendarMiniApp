import React from 'react';
import './Style.css';

const NoGame = props =>(
    <div className="NoGamePanel" style={{background: `linear-gradient(to bottom,  rgba(0, 0, 0, 255), 70%, rgba(0,0,0,0))`}}>
        <div className="NoGameTitlePanel">
            <p className="GameTitle">Игр не запланированно</p>            
        </div>    
    </div> 
);

export default NoGame;