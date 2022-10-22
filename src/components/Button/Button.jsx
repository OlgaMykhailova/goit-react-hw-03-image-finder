import { PropTypes } from 'prop-types';

import { ButtonStyle, ButtonContainerStyle } from './Button.styled';

export const Button = ({ onClick, children }) => {
  return (
    <ButtonContainerStyle>
      <ButtonStyle type="button" onClick={onClick}>
        {children}
      </ButtonStyle>
    </ButtonContainerStyle>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};
