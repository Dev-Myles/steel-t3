import { ReactElement } from 'react';
import { IconContext } from 'react-icons';

export const IconProvider: React.FC<{
  icon: ReactElement;
  color?: string | undefined;
}> = ({ icon, color }) => {
  return (
    <IconContext.Provider
      value={{
        color: 'red',
        size: '3em',
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
