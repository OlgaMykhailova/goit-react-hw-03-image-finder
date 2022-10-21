import PacmanLoader from 'react-spinners/PacmanLoader';

export const Loader = ({loading}) => {
  return (
    <div>
      <PacmanLoader color="#36d7b7" loading={loading} speedMultiplier={1} />
    </div>
  );
};
