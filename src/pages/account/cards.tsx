import { NextPage } from 'next';
import Link from 'next/link';
import { useReducer } from 'react';
import { LoadingGif } from '../../components/util/LoadingGif';
import { ActionType, mapCardsLink } from '../../components/util/mapCards';
import { useSessionCheck } from '../../utils/session/checkSession';
import { trpc } from '../../utils/trpc';

enum StateActionType {
  edit = 'EDIT',
  delete = 'DELETE',
  none = 'NONE',
}
const initialState = { action: StateActionType.none };

function reducer(state: { action: StateActionType }, action: StateActionType) {
  switch (action) {
    case 'EDIT':
      return { action: (state.action = StateActionType.edit) };
    case 'DELETE':
      return { action: (state.action = StateActionType.delete) };
    case 'NONE':
      return { action: (state.action = StateActionType.none) };
    default:
      throw new Error();
  }
}

export const AccountCards: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const sess = useSessionCheck(true);
  const { data, isLoading } = trpc.useQuery(['account.get-profile'], {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const cardData = data?.cards;

  function toggleSelect() {
    if (state.action !== StateActionType.none) {
      return dispatch(StateActionType.none);
    } else {
      return;
    }
  }

  function toggleEdit() {
    if (state.action !== StateActionType.edit) {
      return dispatch(StateActionType.edit);
    } else {
      return dispatch(StateActionType.none);
    }
  }

  function toggleDelete() {
    if (state.action !== StateActionType.delete) {
      return dispatch(StateActionType.delete);
    } else {
      return dispatch(StateActionType.none);
    }
  }

  const Options: React.FC = () => {
    return (
      <div className="flex justify-around sm:flex-row flex-col items-center m-4 ">
        <h1 className="text-3xl bg-background rounded-full font-PTMono">
          Your Cards
        </h1>
        <div className="flex flex-wrap justify-center  [&>*]:mx-1 [&>*]:my-1 [&>*]:font-HindThin">
          <Link href="/card/create-card">
            <a className="w-fit ">
              <button className="px-4 rounded-lg  sm:mt-0 border-2 border-second hover:border-indigo-600 text-xl">
                Create Card
              </button>
            </a>
          </Link>
          {state.action !== StateActionType.none ? (
            <button
              onClick={() => toggleSelect()}
              className="px-4 rounded-lg   sm:mt-0  border-2  hover:border-emerald-700 text-xl border-main"
            >
              Select Mode
            </button>
          ) : (
            <div className="w-[90px] "></div>
          )}
          <button
            onClick={() => toggleEdit()}
            className="px-4 rounded-lg sm:mt-0 border-2 border-amber-500  hover:border-amber-700 text-xl "
          >
            Edit Mode
          </button>
          <button
            onClick={() => toggleDelete()}
            className="px-4 rounded-lg  sm:mt-0 border-2   hover:border-red-700 text-xl border-red-500"
          >
            Delete Mode
          </button>
        </div>
      </div>
    );
  };

  if (sess.status === 'loading' || isLoading) {
    return (
      <div className="h-screen">
        <LoadingGif />
      </div>
    );
  }

  function mapCards(cards: any) {
    if (!cards?.length) {
      return (
        <div className=" grid place-content-center">
          <h3 className="text-2xl p-2 text-center">
            You have not created any cards
          </h3>
        </div>
      );
    } else if (state.action === StateActionType.edit) {
      return mapCardsLink(cards, ActionType.edit);
    } else if (state.action === StateActionType.none)
      return mapCardsLink(cards, ActionType.none);
    else if (state.action === StateActionType.delete)
      return mapCardsLink(cards, ActionType.delete);
  }

  return (
    <div className="min-h-screen mb-20">
      <Options />
      <div className=" h-4 mb-5 text-center">
        {state.action === StateActionType.edit ? (
          <span className="text-amber-400 text-3xl font-PTMono">
            {' '}
            Edit Mode - Select a card to edit
          </span>
        ) : null}
        {state.action === StateActionType.delete ? (
          <span className="text-red-400 text-3xl  font-PTMono">
            {' '}
            Delete Mode - Select a card to delete
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap justify-center w-screen sm:w-11/12 mx-auto">
        {mapCards(cardData)}
      </div>
    </div>
  );
};

export default AccountCards;
