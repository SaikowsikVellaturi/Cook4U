import { projectFirestore } from "../../Firebase/config";
import RecipeList from "../../components/RecipeList/RecipeList";
import "./Home.css";
import { useEffect, useState } from "react";

import "./Home.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("items").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("Nothing Found");
          setIsPending(false);
        } else {
          let res = [];
          snapshot.docs.forEach((doc) => {
            res.push({ id: doc.id, ...doc.data() });
          });
          setData(res);
          setIsPending(false);
        }
      },
      (error) => {
        setError(error.message);
        setIsPending(false);
      }
    );
    return () => unsub();
  }, []);
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
