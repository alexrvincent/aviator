// @ts-nocheck
import React from 'react';
import classNames from 'utils/classNames';
import { useGetProducts } from 'Services/dummyJSON/products';
import { useQueryClient } from 'react-query';

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
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useGetProducts();

  const cls = classNames({
    HelloFeatureItem: true,
  });

  return (
    <div className={cls} onClick={onHelloFeatureClick}>
      {text || 'HelloFeatureItem'}
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((product) => (
                <p key={product.id}>
                  <a
                    href="#"
                    style={
                      // We can use the queryCache here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(['product', product.id])
                        ? {
                            fontWeight: 'bold',
                            color: 'green',
                          }
                        : {}
                    }
                  >
                    {product.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default HelloFeatureItem;
