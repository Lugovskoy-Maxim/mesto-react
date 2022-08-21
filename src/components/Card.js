import React from "react";

function Card({ card, userId, onCardLike, handlePreviewPopupClick, onCardDelete}) {
  const [countLikes, setCountlikes] = React.useState(card.likes.length);
  const [isLiked, setIsLiked] = React.useState(
    card.likes.some((i) => i._id == userId)
  );
  const classNameDeleteMainCard = `${card.owner._id == userId ? 'element__cards-remove': 'element__cards-remove_hidden'
  }`;
  const classNameLikeButton = `element__like ${
    isLiked && "element__like_active"
  }`;

  React.useEffect(() => {
    setCountlikes(card.likes.length);
    setIsLiked(card.likes.some((i) => i._id == userId));
  }, [card]); //проверить нужна ли зависимость, забыл почему поствил

  const handleImageClick = (e) => {
    handlePreviewPopupClick(e.target.src, e.target.alt);
  };

  function handleLikeCard (){
    onCardLike(card)
  }

  function handleCardDelite() {
    onCardDelete(card)
  }

  return (
    <>
      <li className="element">
        <img
          src={card.link}
          alt={card.name}
          className="element__image"
          onClick={handleImageClick}
        />
        <button
          type="button"
          className={classNameDeleteMainCard}
          aria-level="Удалить"
          onClick={handleCardDelite}
        ></button>
        <div className="element__description">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like_count">
            <button
              type="button"
              className={classNameLikeButton}
              aria-level="Нравиться!"
              onClick={handleLikeCard}
            ></button>
            <p className="element__like-counter">{countLikes}</p>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
