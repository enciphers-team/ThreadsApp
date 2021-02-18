import PropTypes from 'prop-types';
import React from 'react';
import './FormInput.scss';

const FormInput = ({ onChangeHandler, label, error, ...otherProps }) => {
  return (
    <div className={`form-group`}>
      {label ? <label className="form-group__label">{label}</label> : null}
      <input
        onChange={onChangeHandler}
        {...otherProps}
        className={`form-group__input ${
          error ? 'form-group__input--error' : null
        } `}
      />

      {error ? <div className="form-group__error">{error}</div> : null}
    </div>
  );
};

FormInput.propTypes = {
  onChangeHandler: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string,
};

export default FormInput;
