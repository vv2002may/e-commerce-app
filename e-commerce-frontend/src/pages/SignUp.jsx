import React from "react";
import { useForm } from "react-hook-form";
import { ENDPOINT } from "../config/endpoint";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const {
    register,
    handleSubmit, //validate inputs
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  React.useEffect(() => {
    if (name) {
      navigate("/");
    }
  });

  const onFormSubmit = (data) => {
    fetch(ENDPOINT + "user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        if (result.success) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("email", data.email);
          localStorage.setItem("name", data.name);
          window.location.href = "/";
        } else {
          window.location.href = "/";
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)} className="sign">
        <input
          type="text"
          {...register("name", { required: "Required!" })}
          placeholder="name"
          autoComplete="off"
        />
        {errors.name && <span>{errors.name.message}</span>}

        <input
          type="email"
          {...register("email", { required: "Required!" })}
          placeholder="email"
          autoComplete="off"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          type="password"
          {...register("password", {
            required: "Required!",
            minLength: { value: 3, message: "Min. Length : 3" },
          })}
          placeholder="password"
          autoComplete="off"
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input type="submit" />
      </form>
    </div>
  );
}
