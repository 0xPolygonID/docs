import * as React from "react";

export const ButtonLink = ({className, title, link, type, target = '_blank'}) => {
  const addClass = type === 'secondary' ? 'is-secondary' : '';
  return (
    <a href={link} target={target} className={`button is-icon w-inline-flex ${addClass}`}>
      <div className="button-icon_left-element is-icon-medium">
        <div className="text-size-small">{title}</div>
      </div>
      <div className={`button-icon_right-element is-icon-medium`}>
        <div className="icon-1x1-medium w-embed">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7V17M17 7H7" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
    </a>
  );
}
