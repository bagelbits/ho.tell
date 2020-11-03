import React from 'react';
import StoryPrompt from './app/StoryPrompt';

function Index() {
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

Index.propTypes = {};
export default Index;
