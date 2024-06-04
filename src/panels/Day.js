import React from 'react';
import { Panel, SplitCol, SplitLayout } from '@vkontakte/vkui';

import Game from './Game';
import NoGame from './NoGame';
import './Style.css';

const Day = props =>(
    <SplitCol className="DayPanel">
        <div>
            <div className="DayTitlePanel">
                <p className="DayTitle">{props.day.weekDayName} <br/> {props.day.date.substring(8)}{props.day.date.substring(4,7)}</p>
            </div>  
            {
                props.day.events.length > 0 ?   
                props.day.events.map(event => ( <Game halfPanel={props.day.events.length > 3} key={event.order} event={event}/> )):    
                <NoGame />
            }
        </div>
    </SplitCol>
);

export default Day;