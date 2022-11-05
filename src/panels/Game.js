import React from 'react';
import './Style.css';

const Game = props =>(
    <div className={props.halfPanel ? "HalfGamePanel" : "GamePanel"} style={{background: `linear-gradient(to bottom,  ${props.event.color}, 70%, rgba(0,0,0,0))`}}>
        <div className={props.halfPanel ? "HalfGameTitlePanel" : "GameTitlePanel"}>
            <p className="GameTitle">{props.event.name}</p>            
        </div>    
        <div className="TimePanel">
            <p className="TimeText">{props.event.startTime}</p>              
        </div>       
        {!props.halfPanel && <div className="IconPanel">
            <img className="Icon" src={"../img/" + props.event.iconPath} alt="Иконка игры" /> 
        </div>}
    </div> 
);

export default Game;