import React from "react";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import { createClient } from "pexels";

function App() {
  const [cards, setCards] = React.useState([]);

  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);

  const [clickedIds, setClickedIds] = React.useState(() => new Set());

  function shuffleArray(arr) {
    const result = [...arr];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  const onCardClick = (id) => {
    setClickedIds((prev) => {
      const alreadyClicked = prev.has(id);

      if (alreadyClicked) {
        setBestScore((best) => Math.max(best, score));
        setScore(0);
        setCards((prevCards) => shuffleArray(prevCards));
        return new Set(); // reset
      }

      const next = new Set(prev);
      next.add(id);
      setScore((s) => s + 1);
      setCards((prevCards) => shuffleArray(prevCards));
      return next;
    });
  };

  const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);
  const query = "Cars bmw";

  React.useEffect(() => {
    client.photos.search({ query, per_page: 12 }).then((data) => {
      const image = data.photos.map((photo) => ({
        id: photo.id,
        src: photo.src.medium,
        alt: `${photo.alt}`,
      }));
      setCards(image);
    });
  }, []);

  return (
    <div className="wrapper">
      <Header score={score} bestScore={bestScore}></Header>
      <main>
        <section>
          <div className="cards">
            {cards?.map((card) => (
              <Card
                key={card.id}
                src={card.src}
                alt={card.alt}
                id={card.id}
                onClick={onCardClick}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
