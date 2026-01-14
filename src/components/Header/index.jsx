import styles from "./Header.module.scss";

const Header = ({ score, bestScore }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1>Cars Memory Game</h1>
        <div>
          <p className="score">Score: {score}</p>
          <p className="bestScore">Best score: {bestScore}</p>
        </div>
      </div>
      <div className={styles.headerBot}>
        <h5>
          Get points by clicking on an image but don't click on any more than
          once!
        </h5>
      </div>
    </header>
  );
};

export default Header;
