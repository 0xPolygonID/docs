import * as React from "react";
import { useState } from "react";
import Layout from "@theme/Layout";
import { contentData } from "../data/content-data";
import {
  ButtonLink,
  TutorialsCard,
  Events,
  FAQSection,
  LearnSection,
  EcosystemSection,
  Overlay,
} from "../components";

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
                    <h2
                      className="mt-0"
                      dangerouslySetInnerHTML={{ __html: contentData.headText }}
                    ></h2>
                    <div className="padding-bottom custom-padding"></div>
                    {contentData.headButtons?.length && (
                      <div className="button-group">
                        {contentData.headButtons.map((props, index) => {
                          return <ButtonLink key={index} {...props} />;
                        })}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-5">
                    <div className="player-wrapper">
                      <div className="play-button-wrapper">
                        <button className="play-button" type="button" onClick={toggleOverlay} />
                      </div>
                      <img src="/images/player-preview.png" alt="" />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <br />
            <br />
          </div>
          <div className="section-divider"></div>
          <div className="justify-content-center tutorial-cards">
            {contentData.linksCard.map((props, idx) => (
              <TutorialsCard key={idx} {...props} />
            ))}
          </div>
        </div>
        <div className="section-divider"></div>
        <section className="section-ecosystem full-background">
          <div className="container">
            <EcosystemSection {...contentData.ecosystem} />
          </div>
        </section>

        <div className="container">
          <div className="flex-row">
            <Events {...contentData.eventCreation} />
            <Events {...contentData.eventHackathon} noEvents={contentData.noEvents} />
          </div>
          <div className="section-divider"></div>
          <div className="flex-row">
            <LearnSection {...contentData.learnSection} />
          </div>
          <div className="section-divider-40"></div>
          <section className="faq">
            <FAQSection {...contentData.faq} />
          </section>
          <section>
            <div className="legal-docs">
              By using our services you agree to Privado ID's{" "}
              <a href="privacy-policy.pdf" target="_blank">
                Privacy Policy
              </a>
              ,{" "}
              <a href="cookie-policy.pdf" target="_blank">
                Cookie Policy
              </a>{" "}
              and{" "}
              <a href="terms-of-use.pdf" target="_blank">
                Terms of Use
              </a>
              .
            </div>
          </section>
        </div>
        {/*<div className="section-divider-40"></div>*/}
        <Overlay isOpen={isOpen} onClose={toggleOverlay}>
          <iframe
            src={contentData.headVideoLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Overlay>
      </div>
    </Layout>
  );
}

export default Home;
