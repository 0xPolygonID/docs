import * as React from "react";
import classNames from "classnames";
import {useState} from "react";

export const FAQAccordion = (props) => {
  const {
    title,
    content,
  } = props;
  const [isOpened, setOpened] = useState(false);
  const onClick = () => {
    setOpened(!isOpened);
  };
  return (
    <div className={classNames('faq-accordion-dropdown', {'open': isOpened})}>
      <div onClick={onClick} className="faq-accordion-toggle">
        <div className="faq-question">{title}</div>
        <div className="faq-accordion-icon"></div>
      </div>
      <nav className="faq-dropdown-list">
        <div className="faq-dropdown-list-content">
          <div className="lead grey-text" dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
      </nav>
    </div>
  );
}
