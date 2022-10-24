import React from "react";
import AnimeRow from "../../components/AnimeRow";

function Main() {
  return (
    <div>
      <AnimeRow rowTitle="Currently airing:" query="seasons/now" />
      <AnimeRow rowTitle="Top Anime:" query="top/anime" />
      <AnimeRow rowTitle="Romance Anime:" query="anime?genres=23"></AnimeRow>
      <AnimeRow
        rowTitle="Summer 2022 Anime:"
        query="seasons/2022/summer"
      ></AnimeRow>
    </div>
  );
}

export default Main;
