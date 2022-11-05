import React from 'react';
import { Panel, SplitCol, SplitLayout } from '@vkontakte/vkui';

import Game from './Game';
import NoGame from './NoGame';
import './Style.css';

const Day = props =>(
    <SplitCol className="DayPanel">
        <div>
            <div className="DayTitlePanel">
                <p className="DayTitle">{props.day.weekDayName}</p>
            </div>  
            {
                props.day.events.length > 0 ?   
                props.day.events.map(event => ( <Game halfPanel={props.day.events.length > 2} key={event.order} event={event}/> )):    
                <NoGame />
            }
        </div>
    </SplitCol>
);

export default Day;