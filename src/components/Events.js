import * as React from "react";
import {HeadSection} from "./HeadSection";

export const Events = (props) => {
  const {
    type,
    events,
    head,
    noEvents = {}
  } = props;
  const eventClass = type === 'dateEvent' ? 'violet-card' : 'grey-card';
  return (
    <div className="event-section col-md-6">
      <div className="section-divider"></div>
      <HeadSection {...head} customClass={'large'}/>
      {
        events && events.length ?
          events.map(({link, name, info, description}, idx) => {
            return (<a key={idx} className={eventClass} href={link} target="_blank">
              <div className="name-info">
                <span className="name">{name}</span>
                <span className="info grey-text">{info}</span>
              </div>
              <p className="description grey-text">
                {description}
              </p>
            </a>);
          }) : (
            <div className="no-events">
              <div className="icon">
                <img src={noEvents.iconSrc} alt=""/>
              </div>
              <p className="lead grey-text">{noEvents.text}</p>
            </div>
          )
      }
    </div>
  );
}