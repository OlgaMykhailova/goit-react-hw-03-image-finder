import PropagateLoader from 'react-spinners/PropagateLoader';

import { PropTypes } from 'prop-types';

import {LoaderContainerStyle} from './Loader.styled';

export const Loader = ({loading}) => {
  return (
    <LoaderContainerStyle>
      <PropagateLoader color="#3f51b5" loading={loading} />
    </LoaderContainerStyle>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
 };
