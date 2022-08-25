import { useEffect, useState } from "react";
import { ListFilms } from "../ListFilms/ListFilms";
import { TitleOfflineStyle } from "./Contentstyle";

export const Content = (): JSX.Element => {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  function onOffline() {
    setIsOffline(true);
  }
  function onOnline() {
    setIsOffline(false);
  }
  useEffect(() => {
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, [isOffline]);
  return (
    <>
      {isOffline ? (
        <TitleOfflineStyle>Sorry, you are offline ...</TitleOfflineStyle>
      ) : (
        <ListFilms />
      )}
    </>
  );
};
