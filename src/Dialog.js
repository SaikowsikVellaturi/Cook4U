import { useState } from "react";
import "./Dialog.css";
export default function Dialog({ message, onOk }) {
  const [item, setItem] = useState([]);
  const [name, setName] = useState("");
  const [val, setVal] = useState("");
  const [unit, setUnit] = useState("g");
  return (
    <div className="dialog">
      <div className="inside">
        <h3>{message}</h3>
        <form>
          <label>
            <div className="lines">
              <input
                type="text"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder="Item Name"
                className="lines1"
                value={name}
                required
                // ref={inputIngredient}
              />
              <input
                type="text"
                className="lines2"
                onChange={(event) => {
                  setVal(event.target.value);
                  // setQuantity(event.target.value);
                  // setValue(item + "-" + event.target.value + "g");
                }}
                required
                placeholder="value"
                value={val}
              />
              <select
                className="lines3"
                id="options"
                onChange={() => {
                  var e = document.getElementById("options");
                  setUnit(e.value);
                }}
                required
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
          <div style={{ display: "flex" }}>
            <button
              className="Ok"
              onClick={() => {
                if (name !== "" && val !== "") {
                  if (unit != "count") onOk(`${val}${unit} of ${name}`);
                  else onOk(`${val} ${name}`);
                } else {
                  onOk("");
                }
              }}
            >
              Ok
            </button>
            <button className="Cancel" onClick={() => onOk("")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
