import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

const EditButton: React.FC = () => {
  const [isHover, setHover] = useState(false);
  return (
    <div className="flex justify-end">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-fit "
      >
        {isHover ? (
          <button className="mr-1  inline-block ">
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

export default EditButton;
