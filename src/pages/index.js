import * as React from "react";
import {useState} from "react";
import Layout from "@theme/Layout";
import { contentData } from "../data/content-data";
import {ButtonLink, TutorialsCard, Events, FAQSection, LearnSection, EcosystemSection, Overlay} from "../components";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Layout>
      <div className="bootstrap-wrapper">
        <div className="section-divider"></div>
        <div className="container">
          <div className="row">
            <div className="index-page exclude">
              <section className="section container-fluid">
                <div className="row justify-content-between">
                  <div className="col-lg-6 pop-text">
                    <h2 className="mt-0" dangerouslySetInnerHTML={{__html: contentData.headText}}></h2>
                    <div className="padding-bottom custom-padding"></div>
                    {
                      contentData.headButtons?.length &&
                      <div className="button-group">
                        {
                          contentData.headButtons.map((props, index) => {
                            return <ButtonLink key={index} {...props}/>
                          })
                        }
                      </div>
                    }

                  </div>
                  <div className="col-lg-5">
                    <div className="player-wrapper">
                      <div className="play-button-wrapper">
                        <button
                          className="play-button"
                          type="button"
                          onClick={toggleOverlay}
                        />
                      </div>
                      <img src="/images/player-preview.png" alt=""/>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <br/>
            <br/>
          </div>
          <div className="section-divider"></div>
          <div className="justify-content-center tutorial-cards">
            {
              contentData.linksCard.map((props, idx) => <TutorialsCard key={idx} {...props}/>)
            }
          </div>
        </div>
        <div className="section-divider"></div>
        <section className="section-ecosystem full-background">
          <div className="container">
            <EcosystemSection {...contentData.ecosystem}/>
          </div>
        </section>

        <div className="container">
          <div className="flex-row">
            <Events {...contentData.eventCreation}/>
            <Events {...contentData.eventHackathon} noEvents={contentData.noEvents}/>
          </div>
          <div className="section-divider"></div>
          <div className="flex-row">
            <LearnSection {...contentData.learnSection}/>
          </div>
          <div className="section-divider-40"></div>
          <section className="faq">
            <FAQSection {...contentData.faq}/>
          </section>
          <section>
            <div align="center">
              By using our services you agree to Polygon ID's <a src="./privacy-policy.pdf">Privacy Policy</a>, <a>Cookie Policy</a> and <a>Terms of Use</a>.
            </div>
          </section>
        </div>
        <div className="section-divider-40"></div>
        <section className="newsletter">
          <div className="newsletter_anim-wrapper pb_intersection">
            <div className="animation_embed w-embed w-iframe">
              <iframe src="https://player.vimeo.com/video/791149043?h=a0b62c3daa&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;loop=1&amp;autoplay=1&amp;background=1" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen="" style={{position: 'absolute', top:0, left:0, width:'100%', height:'100%'}} title="Hero" data-ready="true"></iframe>
            </div>
          </div>
          <div className="padding-global">
            <div className="container-medium">  
              <div className="padding-section-large">
                <div className="newsletter-section_max-width">
                  <div className="tiny-text">{contentData.stayUpToDate.title}</div>
                  <div className="padding-bottom padding-xsmall"></div>
                  <h3 className="heading-style-h4"><a href={contentData.stayUpToDate.link} target="_blank"><span className="white-text">{contentData.stayUpToDate.linkText}</span><span className="newsletter_link-icon" /></a></h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Overlay isOpen={isOpen} onClose={toggleOverlay}>
          <iframe
            src={contentData.headVideoLink}
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
        </Overlay>
      </div>
    </Layout>
  );
}

export default Home;
