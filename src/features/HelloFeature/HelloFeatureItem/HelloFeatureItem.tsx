import React from 'react';
import classNames from 'utils/classNames';

// Use an interface for public API definitions or when authoring a 3rd part api
// interface Props {
//   text: string;
// }

// Function declaration
// function HelloFeatureItem(props: Props): React.ReactNode {
//   return <p> {'Hello World'}</p>
// }

// Use type for local props or state
type Props = {
  text: string; // The text to appear on the HelloFeatureItem
  onHelloFeatureClick: () => void; // a callback to run when the HelloFeatureItem is clicked
};

const HelloFeatureItem: React.FC<Props> = (props) => {
  const { text, onHelloFeatureClick } = props;

  const cls = classNames({
    HelloFeatureItem: true,
  });

  return (
    <p className={cls} onClick={onHelloFeatureClick}>
      {text || 'HelloFeatureItem'}
    </p>
  );
};

export default HelloFeatureItem;
