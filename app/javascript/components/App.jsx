import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import StoryPrompt from './app/StoryPrompt';
import HoTellGif from '../static/HO.TELL.gif';

function Index() {
  return (
    <div>
      <h1 className="title">Welcome to Ho | Tell</h1>
      <h2 className="instructions">
        We are a digital gossip exchange service for your needs to know and share your dirty,
        wicked, strange, and wild confessions with. We don’t track your identity, our greatest hope
        is that you are telling the truth.
        <br />
        <br />
        Please keep submissions anonymous, and follow our community safety guidelines.
        <br />
        <br />
        We are excited to share secrets with you.
      </h2>
      <img src={HoTellGif} alt="" />
      <StoryPrompt />
      <div className="audio-player">
        <p>Feel free to listen to Radio KTSK while you write!</p>
        <ReactAudioPlayer src="https://kstk.rocks:8443/kstk" autoPlay controls />
      </div>

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
