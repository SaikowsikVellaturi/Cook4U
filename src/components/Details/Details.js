import { useNavigate, useParams } from "react-router-dom";
import vegStew from "./cooking.jpg";

import "./Details.css";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../Firebase/config";
import Dialog from "../../Dialog";

export default function Details() {
  const [buttonText, setButtonText] = useState("Edit");
  const [dialog, setDialog] = useState({
    message: "Add Item",
    isLoading: false,
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [lines, setLines] = useState("");
  const [items, setItems] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();
  const removeItems = (index) => {
    // console.log(recipe.ingredients);
    setItems([...items.filter((item) => items.indexOf(item) !== index)]);

    console.log(items);
  };
  const handleKeyDown = () => {
    if (
      document.getElementsByClassName("meth") &&
      document.getElementById("para")
    ) {
      const el = document.getElementById("para");
      const h = el.offsetHeight;
      setLines(h / 36 + 2);
    }
  };
  const AddItem = () => {
    setDialog({
      message: "Add Item",
      isLoading: true,
    });
  };
  const onOk = (item) => {
    if (item.trim() != "" && !items.includes(item))
      setItems((prevItems) => [...prevItems, item]);
    setDialog({
      message: "",
      isLoading: false,
    });
  };
  const handleEdit = () => {
    handleKeyDown();
    if (buttonText === "Save") {
      projectFirestore.collection("items").doc(id).update({
        ingredients: items,
      });
      setIsDisabled(true);
      setButtonText("Edit");
      // handleKeyDown();
    } else {
      setItems(recipe.ingredients);

      setButtonText("Save");
      setIsDisabled(false);
    }
  };
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("items")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Recipe doesnt exist");
        }
      });
    return () => unsub();
  }, [id]);
  return (
    <div className="details">
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {recipe && (
        <div className="item-detail">
          <div className="title">
            <input
              type="text"
              disabled={isDisabled}
              defaultValue={recipe.title}
              onChange={(event) =>
                projectFirestore.collection("items").doc(id).update({
                  title: event.target.value,
                })
              }
            />
          </div>
          <div className="time">
            <input
              type="text"
              disabled={isDisabled}
              defaultValue={recipe.cookingTime}
              onChange={(event) =>
                projectFirestore.collection("items").doc(id).update({
                  cookingTime: event.target.value,
                })
              }
            />
          </div>

          <div>
            <div className="grid-items">
              <img src={vegStew} alt="vegstewimg" className="details-image" />
              {isDisabled && (
                <div>
                  <div className="grid">
                    {recipe.ingredients.map((ingredient) => (
                      <div key={ingredient} className="item">
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!isDisabled && (
                <div>
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
                  <button onClick={AddItem}>Add</button>
                </div>

                // <button></button>
              )}
            </div>
            {isDisabled && <p id="para">{recipe.method}</p>}
            {!isDisabled && (
              <div className="method">
                <textarea
                  type="text"
                  className="meth"
                  rows={lines}
                  id="meth"
                  defaultValue={recipe.method}
                  onChange={(event) =>
                    projectFirestore.collection("items").doc(id).update({
                      method: event.target.value,
                    })
                  }
                />
              </div>
            )}
            {/* <p className="details-method">{recipe.method}</p> */}
          </div>
          <button onClick={() => handleEdit(recipe)}>{buttonText}</button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </div>
      )}
      {dialog.isLoading && <Dialog message={dialog.message} onOk={onOk} />}
    </div>
  );
}
