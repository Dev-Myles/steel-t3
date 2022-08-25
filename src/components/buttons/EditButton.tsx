import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

const EditButton: React.FC<{ editFn: any }> = ({ editFn }) => {
  const [isHover, setHover] = useState(false);

  return (
    <div className="flex justify-end">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-fit "
      >
        {isHover ? (
          <button onClick={() => editFn()} className="mr-1  inline-block ">
            <span className="py-2 px-5 hover:underline ">Edit</span>
          </button>
        ) : null}
        <button className="p-3   rounded-lg  text-white">
          <FiEdit2 />
        </button>
      </div>
    </div>
  );
};

export const EditFieldButton: React.FC<{ editFn: any }> = ({ editFn }) => {
  return (
    <div className="w-fit h-fit inline-block">
      <div className="w-fit ">
        <button
          onClick={() => editFn()}
          className="p-1 h-6 w-6  rounded text-sm  text-white"
        >
          <FiEdit2 />
        </button>
      </div>
    </div>
  );
};

export default EditButton;
