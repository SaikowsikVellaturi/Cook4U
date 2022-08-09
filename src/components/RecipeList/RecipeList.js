import "./RecipeList.css";
import { Link } from "react-router-dom";

import vegStew from "./cooking.jpg";
import { projectFirestore } from "../../Firebase/config";
export default function RecipeList({ recipes }) {
  const handleDelete = (id) => {
    projectFirestore.collection("items").doc(id).delete();
  };
  if (recipes.length === 0) {
    return <div>No Recipes Found :o</div>;
  }
  return (
    <div className="recipelist">
      {recipes.map((recipe) => (
        <div className="card" key={recipe.id}>
          <div className="card-body">
            <img src={vegStew} alt="vegstewimg" className="card-image" />
            <h2 className="card-title">{recipe.title}</h2>

            <p className="description">{recipe.method.substring(0, 100)}...</p>

            <div className="buttons">
              <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
              <button onClick={() => handleDelete(recipe.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
