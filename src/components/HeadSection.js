import * as React from "react";
import { ButtonLink } from "./ButtonLink";

export const HeadSection = ({ title, description, link, linkText, customClass = "" }) => {
  const className = customClass ? customClass : "col-md-8";
  return (
    <div className="head-section flex-row">
      <div className={className}>
        <span className="section-title">{title}</span>
        <p className="lead grey-text">{description}</p>
      </div>
      {link && linkText && (
        <div className="button-group">
          <ButtonLink title={linkText} link={link} />
        </div>
      )}
    </div>
  );
};
