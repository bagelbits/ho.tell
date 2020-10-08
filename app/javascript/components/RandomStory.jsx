import React from "react";
import Button from "react-bootstrap/Button";
import ReportModal from "./ReportModal";

function getRandomStory(reported, storyId) {
  const [result, setResult] = React.useState({});
  const [loading, setLoading] = React.useState("false");

  React.useEffect(() => {
    async function fetchPrompt() {
      try {
        console.log(storyId);
        const response = await fetch(`/stories/random?ignored_ids=${storyId}`);
        const json = await response.json();
        setResult(json);
        setLoading("true");
      } catch (error) {
        console.log(error);
        setLoading("null");
      }
    }

    fetchPrompt();
  }, [reported]);

  return [result, loading];
}

function RandomStory(props) {
  const [reported, setReported] = React.useState(false);
  const [result, loading] = getRandomStory(reported, props.storyId);

  return (
    <div>
      {loading === "false" ? (
        <p>Loading...</p>
      ) : loading === "null" ? (
        <p>Something went terribly wrong.</p>
      ) : (
        <p className="story"> {result.story} </p>
      )}
    </div>
  );
}

export default RandomStory;
