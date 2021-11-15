import React, { useEffect, useState } from "react";

const InputImage = ({ name, register, formState }) => {
  const { errors } = formState;

  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    return () => URL.revokeObjectURL(avatarUrl);
  }, [avatarUrl]);

  const showPreviewImage = () => {
    if (avatarUrl) {
      return (
        <div
          style={{
            backgroundImage: `url(${avatarUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="img__upload"
        ></div>
      );
    } else {
      return (
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#2c394c",
          }}
          className="img__upload"
        ></span>
      );
    }
  };

  register(name, {
    onChange: (e) => {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);

      setAvatarUrl(url);
    },
  });

  return (
    <div className="form__upload">
      <div>{showPreviewImage()}</div>
      <label className="label__upload">
        <input {...register(name)} style={{ display: "none" }} type="file" />
        upload
      </label>
      {/* {errors[name] && <p className="textError">{errors[name]?.message}</p>} */}
    </div>
  );
};

export default InputImage;
