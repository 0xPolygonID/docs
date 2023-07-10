import * as React from "react";
import {HeadSection} from "./HeadSection";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export const EcosystemSection = (props) => {
  const {
    tabs = [],
    head = {}
  } = props;

  return (
    <>
      <HeadSection {...head}/>
      <div className="tabs-container col">
        <Tabs>
          {
            tabs.map(({name, contentText, contentList, contentListTitle, link}, idx) => {
              return (
                <TabItem key={idx} value={idx} label={name}>
                  <div className="tab-content">
                    <div className="col-md-6 text">
                      <p className="lead grey-text">{contentText}</p>
                      {
                        contentListTitle &&
                        <div className="grey-text">Products used:</div>
                      }
                      {
                        contentList && contentList.length &&
                        <ul className="dot-list grey-text">
                          {
                            contentList.map((item, idx) => (<li key={idx}>{item}</li>))
                          }
                        </ul>
                      }

                    </div>
                    <div className="col-md-6 youtube-wrapper">
                      {
                        link && <iframe
                          src={link}
                          title="YouTube video player" frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen></iframe>
                      }
                    </div>
                  </div>
                </TabItem>
              );
            })
          }
        </Tabs>
      </div>
    </>
  );
}