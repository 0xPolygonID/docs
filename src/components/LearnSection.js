import * as React from "react";
import {HeadSection} from "./HeadSection";

export const LearnSection = (props) => {
  const {
    head,
    videos
  } = props;
  return (
    <section className="learn">
      <HeadSection {...head}/>
      <div className="flex-row">
        {
          videos.map(({title, info, link, coming}, idx) => {
            return <div key={idx} className="card-wrapper col-md-4">
              <a href={link} className="grey-card" target="_blank">
                <span className="title-youtube">{title}</span>
                <div className="info-youtube">
                  <img src="/images/youtube.png" alt=""/>
                  <span className="grey-text">{info}</span>
                </div>
                {
                  coming &&
                  <span className="coming-youtube">{coming}</span>
                }
              </a>
            </div>
          })
        }

      </div>
    </section>
  );
}