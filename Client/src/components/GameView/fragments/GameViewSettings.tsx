import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const GameViewSettings = () => {
  return (
    <a
      href="/config"
      className="text-zinc-200 cursor-pointer hover:text-zinc-400 transition-colors"
      title="Конфигурация"
    >
      <FontAwesomeIcon icon={faGear} size="lg" />
    </a>
  );
};

export default GameViewSettings;
