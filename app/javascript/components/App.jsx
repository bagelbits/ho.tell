import React from "react";
import StoryPrompt from "./StoryPrompt";

function App() {
  return (
    <div>
      <h1 className="title">Welcome to Ho.tell</h1>
      <StoryPrompt />

      <div className="credits">
        <h1 className="credit-title">Credits</h1>
        <p className="credit">Designed by Emma Dilemma and Chris Ward</p>
        <p className="credit">Created by Chris Ward</p>
      </div>
    </div>
  );
}

App.propTypes = {};
export default App;