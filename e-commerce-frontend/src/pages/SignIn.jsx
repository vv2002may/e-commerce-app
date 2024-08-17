import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ENDPOINT } from "../config/endpoint";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const {
    register,
    handleSubmit, //validate inputs type
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  useEffect(() => {
    if (name) {
      navigate('/')
    }
  })

  const onFormSubmit = (formData) => {
    fetch(ENDPOINT + 'user/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(result => {
        // alert(result.message)
        if (result.success) {
          localStorage.setItem('token', result.token)
          localStorage.setItem('email', formData.email)
          localStorage.setItem('name',result.name)
          navigate('/');
          alert(result.message)
        }
        else {
          alert(result.message)
        }
      })
      .catch(err => {
      alert(err)
    })
  };
   
  return (
    <div >
      <form onSubmit={handleSubmit(onFormSubmit)} className="sign">
        <input
          type="email"
          {...register("email", {
            required: "Required!",
          })}
          placeholder="email"
          autoComplete="off"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          type="password"
          {...register("password", {
            required: "Required!",
          })}
          placeholder="password"
          autoComplete="off"
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
