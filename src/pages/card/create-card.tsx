import { NextPage } from 'next';
import CreateCardForm from '../../components/forms/create-card/CreateCardForm';

export const CreateCard: NextPage = () => {
  return (
    <div className="min-h-screen">
      <CreateCardForm />
    </div>
  );
};

export default CreateCard;
