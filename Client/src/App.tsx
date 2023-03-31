import { useState } from "react";
import { GameView } from "./components/GameView/GameView";

import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import LevelConfig from "./components/LevelConfig/LevelConfig";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <GameView />,
    },
    {
      path: "/config",
      element: <LevelConfig />,
    },
  ],
  {
    basename: "/",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
