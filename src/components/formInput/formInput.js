import "./formInput.scss";

const FormInput = ({ label, ...otherProps }) => {
  // otherProps: value, onChange, name, requiered...
  return (
    <div className="group">
      {/* input needs to be here first in order to apply style with ~ selector */}
      <input className="form-input" {...otherProps} />
      {/* if there is a 'label' then apply shrink value, if there is no label, then without label */}
      {label && (
        <label
          className={`${
            // if there is smth in input (there is length) apply 'shrink'
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
