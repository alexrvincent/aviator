import React from 'react';
import { classNames } from 'util/index';
import Children from 'react-children-utilities';
import useFontContext from 'Hooks/useFontContext';

const PlaceholderText: React.FC = (props) => {
  const isFontLoaded = useFontContext();

  // @ts-ignore
  const originalClassName = props?.children?.props?.className || '';
  const cls = classNames({
    placeholdertext: !isFontLoaded,
    isLoading: !isFontLoaded,
    [originalClassName]: originalClassName,
  });

  // @ts-ignore
  const Element = props?.children?.type || 'div';

  if (!isFontLoaded) {
    return (
      // @ts-ignore
      <Element className={cls}>
        <div className="text noselect">{Children.onlyText(props.children)}</div>
      </Element>
    );
  }

  return <>{props.children}</>;
};

export default PlaceholderText;
