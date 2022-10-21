import PropagateLoader from 'react-spinners/PropagateLoader';
import {LoaderContainerStyle} from './Loader.styled';

export const Loader = ({loading}) => {
  return (
    <LoaderContainerStyle>
      <PropagateLoader color="#3f51b5" loading={loading} />
    </LoaderContainerStyle>
  );
};
