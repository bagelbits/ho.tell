import React from 'react';
import StoryPrompt from './app/StoryPrompt';
import HoTellVideo from '../static/HO.TELL.mp4';

function Index() {
  return (
    <div>
      <h1 className="title">Welcome to Ho | Tell</h1>
      <p>We are a digital gossip exchange service for your needs to know and share your dirty, wicked, strange, and wild confessions with. We don’t track your identity, our greatest hope is that you are telling the truth.</p>
      <p>Please keep submissions anonymous, and follow our community safety guidelines.</p>
      <p>We are excited to share secrets with you.</p>
      <video controls autobuffer autoPlay muted loop id="ho-tell-video" src={HoTellVideo} />
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
