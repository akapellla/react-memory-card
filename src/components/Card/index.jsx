import styles from "./Card.module.scss";

const Card = ({ id, src, alt, onClick }) => {
  return (
    <button type="button" className={styles.card} onClick={() => onClick(id)}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default Card;
