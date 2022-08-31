import { ReactElement } from 'react';
import { IconContext } from 'react-icons';

export const IconProvider: React.FC<{
  icon: ReactElement;
}> = ({ icon }) => {
  return (
    <IconContext.Provider
      value={{
        size: '1.5em',
        className: 'inline',
        style: {
          verticalAlign: 'center',
          marginLeft: '5px',
        },
      }}
    >
      <div>{icon}</div>
    </IconContext.Provider>
  );
};

export default IconProvider;
