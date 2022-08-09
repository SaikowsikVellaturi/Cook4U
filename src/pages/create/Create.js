import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectFirestore } from "../../Firebase/config";
import useFetch from "../../hooks/useFetch";

import "./Create.css";
const Create = () => {
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const doc = {
      title,
      ingredients: items,
      method: description,
      cookingTime: `(Takes approx ${time} minutes)`,
    };
    try {
      await projectFirestore.collection("items").add(doc);
      navigate("/");
    } catch (e) {}
  };

  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [items, setItems] = useState([]);
  const [ing, setIng] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [value, setValue] = useState("g");
  const inputIngredient = useRef(null);
  const handleAdd = (event) => {
    event.preventDefault();

    const temp = item.trim();
    const temp1 = quantity.trim();
    console.log(temp);
    setIng((prevState) => [...prevState, temp]);

    if (temp && !items.includes(temp)) {
      if (items.length === 0) {
        if (value !== "count")
          setItems((prevState) => [
            ...prevState,
            ` ${temp1} ${value} of ${temp}`,
          ]);
        else {
          setItems((prevState) => [...prevState, ` ${temp1} ${temp}`]);
        }
      } else {
        if (!ing.includes(temp)) {
          if (value !== "count")
            setItems((prevState) => [
              ...prevState,
              ` ${temp1} ${value} of ${temp}`,
            ]);
          else {
            setItems((prevState) => [...prevState, ` ${temp1} ${temp}`]);
          }
        }
      }
    }
    setItem("");
    setQuantity("");
    inputIngredient.current.focus();
  };

  const removeItems = (index) => {
    setItems([...items.filter((item) => items.indexOf(item) !== index)]);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="final-class">
        <div className="flex-child create-item">
          <div className="tags-input">
            <label>
              <span className="title">Title</span>
              <input
                type="text"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                required
              />
            </label>

            <label>
              <span>Ingredients</span>
              <div className="lines">
                <input
                  type="text"
                  onChange={(event) => {
                    setItem(event.target.value);
                  }}
                  placeholder="Item Name"
                  className="lines1"
                  value={item}
                  ref={inputIngredient}
                />
                <input
                  type="text"
                  className="lines2"
                  onChange={(event) => {
                    setQuantity(event.target.value);
                    // setValue(item + "-" + event.target.value + "g");
                  }}
                  placeholder="value"
                  value={quantity}
                />
                <select
                  className="lines3"
                  id="options"
                  onChange={() => {
                    var e = document.getElementById("options");
                    setValue(e.value);
                  }}
                >
                  <option value="g">Grams</option>
                  <option value="Kg">Kgs</option>
                  <option value="count">Count</option>
                  <option value="lit">Liters</option>
                  <option value="ml">ml</option>
                  <option value="As-required">As-required</option>
                </select>
              </div>
            </label>
            <button onClick={handleAdd} className="btn">
              Add
            </button>
            <ul className="wrapper">
              {items.map((item, index) => (
                <li key={index}>
                  <span>{item}</span>
                  <i
                    className="material-icons"
                    onClick={() => removeItems(index)}
                  >
                    close
                  </i>
                </li>
              ))}
            </ul>

            <label>
              <span>Cooking Time (in minutes)</span>
              <input
                type="text"
                onChange={(event) => setTime(event.target.value)}
                // style={"font-size: 16px;"}
                className="time"
                value={time}
                required
              />
            </label>

            {/*  */}
          </div>
        </div>
        <div className="flex-child text-area">
          <textarea
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe the cooking process..."
            value={description}
            required
          ></textarea>
        </div>
      </div>
      <button className="btn">Submit</button>
    </form>
  );
};
export default Create;
