import React from "react";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";

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

  const query = "Cars bmw";

  React.useEffect(() => {
    const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

    const load = async () => {
      try {
        const query = "Cars bmw";
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(
            query
          )}&per_page=12`,
          {
            headers: {
              Authorization: apiKey,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        setCards(
          data.photos.map((photo) => ({
            id: String(photo.id),
            src: photo.src.medium,
            alt: photo.alt || "Pexels photo",
          }))
        );
      } catch (e) {
        console.error("Pexels fetch error:", e);
      }
    };

    if (!apiKey) {
      console.error("VITE_PEXELS_API_KEY is missing");
      return;
    }

    load();
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
