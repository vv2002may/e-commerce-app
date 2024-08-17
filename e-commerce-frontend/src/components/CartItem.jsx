import { useEffect, useState } from "react";
import { ENDPOINT } from "../config/endpoint";
import CartRemove from "./CartRemove";
import { useForm } from "react-hook-form";

export default function CartItem({ item, setItemPrice }) {
  const [save, setSave] = useState(false);
  const [flag, setFlag] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setItemPrice(
        (prev) => prev + parseFloat(item.quantity * item.itemId.price)
      );
    }, 300);
  }, []);

  function onFormSubmit(formData) {
    console.log(formData);
    fetch(ENDPOINT + "user/quantity-update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        itemId: item.itemId,
        quantity: formData.quantity,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (flag && result.success) {
          window.location.reload();
        }
      });
  }


  return (
    <div className="cart-item">
      <img src={item.itemId.image} />
      <div className="cart-item-content">
        <p className="cart-title">{item.itemId.title}</p>
        <p>${item.itemId.price}</p>
          <form onSubmit={handleSubmit(onFormSubmit)} className="cart-quantity">
            <p>
              Qty :
              <input
                type="number"
                {...register("quantity", {
                  required: "Required!",
                })}
                style={{ width: "70px", textAlign: "center" }}
                min="1"
                defaultValue={item.quantity}
                pattern="^[1-9]\d*$"
                onFocus={() => setSave(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setSave(false);
                  }, 300)
                }
              />
              {errors.quantity && <span>{errors.quantity.message}</span>}
              {save && (
                <button type="submit" onClick={() => setFlag(true)}>
                  Save
                </button>
              )}
            </p>
          </form>
        <CartRemove itemId={item.itemId} />
      </div>
    </div>
  );
}
