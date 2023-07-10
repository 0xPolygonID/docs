import * as React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

export const TutorialsCard = (props) => {
  const {
    iconSrc,
    cardLink,
    title,
    blockInfo,
    tutorialsInfo
  } = props;
  const onCardClick = () => {
    window.open(cardLink, '_blank').focus();
  };
  return (
    <div onClick={onCardClick} className="grey-card flex-row justify-content-center ">
      <div className="tutorial-icon">
        <img src={useBaseUrl(iconSrc)} alt=""/>
      </div>
      <div className="data-info col-md-6">
        <div className="title-info">
          <span className="card-title">{title}</span>
          <ul className="list dot-list grey-text">
            {
              blockInfo.map((text, idx) => (<li key={idx}>{text}</li>))
            }
          </ul>
        </div>
      </div>
      <div className="tutorial-links col">
        <span className="tutorial-title">Tutorials</span>
        <ul className="list clear-list">
          {
            tutorialsInfo.map(({title, link}, idx) => {
              return (
                <li key={idx}>
                  <a href={link} className="tutorial-link">{title}</a>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}