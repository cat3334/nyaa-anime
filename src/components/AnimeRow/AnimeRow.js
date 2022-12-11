import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AnimeRowItem from "./AnimeRowItem";
import sliderSettings from "./sliderSettings";
import styles from "./AnimeRow.module.css";

function AnimeRow(props) {
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAnime() {
      const response = await fetch(`https://api.jikan.moe/v4/${props.query}`);
      if (response.status >= 200 && response.status <= 299) {
        const data = await response.json();
        setAnimeList(data.data);
        console.log(data.data);
        setIsLoading(false);
      } else {
        console.log(response.statusText);
        throw Error(response.statusText);
      }
    }
    getAnime().catch(alert.error);
  }, [props.query]);

  // const shortenedTitle = (title) => {
  //   if (title.length < 20) {
  //     return title;
  //   }
  //   return title.substring(20, 0) + "...";
  // };

  const animeEls = animeList?.map((anime) =>
    props.isRec ? (
      <AnimeRowItem
        key={anime.entry.mal_id}
        id={anime.entry.mal_id}
        title={anime.entry.title}
        img={anime.entry.images.jpg.image_url}
        isSmall={props.isSmall}
      />
    ) : (
      <AnimeRowItem
        key={anime.mal_id}
        id={anime.mal_id}
        title={anime.title}
        desc={anime.synopsis}
        img={anime.images.jpg.image_url}
        isSmall={props.isSmall}
      />
    )
  );

  return (
    <section
      className={
        props.isSmall ? styles["anime-row--small"] : styles["anime-row"]
      }
    >
      <h3 className={styles["anime-row__title"]}>{props.rowTitle}</h3>
      <div className={styles["slider-container"]}>
        {isLoading && (
          <p className={styles["anime-row__loading"]}>Loading...</p>
        )}
        {!isLoading && animeList <= 0 ? (
          <p className={styles["anime-row__empty"]}>No titles were found!</p>
        ) : (
          <Slider className={styles.slider} {...sliderSettings(animeList)}>
            {animeEls}
          </Slider>
        )}
      </div>
    </section>
  );
}

export default AnimeRow;