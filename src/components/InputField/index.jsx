import React from "react";

const InputField = ({ label, type, name, register, formState, otherError }) => {
  const { errors } = formState;

  return (
    <div>
      <input
        className="inputField"
        {...register(name)}
        placeholder={label}
        type={type}
        autoComplete="off"
      />
      {/* {otherError && <p className="textError">{otherError?.message}</p>} */}
      {errors[name] && <p className="textError">{errors[name]?.message}</p>}
    </div>
  );
};

export default InputField;
