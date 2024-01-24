import * as React from "react";
import { FAQAccordion } from "./FAQAccordion";
import { HeadSection } from "./HeadSection";

export const FAQSection = (props) => {
  const { faqList = [], head = {} } = props;

  return (
    <>
      <HeadSection {...head} />
      <div className="faq-wrapper">
        {faqList.length && faqList.map((props, idx) => <FAQAccordion key={idx} {...props} />)}
      </div>
    </>
  );
};
