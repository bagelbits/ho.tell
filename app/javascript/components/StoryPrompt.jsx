import React from "react";
import Button from "react-bootstrap/Button";
import TextareaAutosize from "react-autosize-textarea";
import RandomStory from "./RandomStory";

function StoryPrompt() {
  const [submitted, setSubmitted] = React.useState("false");
  const [storyId, setStoryId] = React.useState(null);

  const submitEl = React.useRef(null);
  const inputEl = React.useRef(null);

  const submitClicked = () => {
    submitEl.current.setAttribute("disabled", true);
    const newStory = inputEl.current.value.trim();
    if (newStory === "") {
      submitEl.current.removeAttribute("disabled");
      return;
    }

    async function postStory() {
      try {
        const body = {
          story: newStory,
        };
        const csrf = document
          .querySelector("meta[name='csrf-token']")
          .getAttribute("content");
        const response = await fetch("/stories", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-Token": csrf,
          },
          body: JSON.stringify(body),
        });
        const json = await response.json();
        setStoryId(json.id);
        setSubmitted(true);
      } catch (error) {
        setSubmitted("null");
      }
    }

    postStory();
  };

  return (
    <div>
      {submitted === "false" ? (
        <div>
          <TextareaAutosize
            className="form-control"
            ref={inputEl}
            placeholder="Tell me a saucy story! ;)"
            rows={5}
          />

          <div className="prompt-buttons">
            <Button
              variant="primary"
              id="prompt_submit"
              ref={submitEl}
              onClick={submitClicked}
            >
              Submit!
            </Button>
          </div>
        </div>
      ) : submitted === "null" ? (
        <p>Something went terribly wrong.</p>
      ) : (
        <div>
          <RandomStory storyId={storyId} />
        </div>
      )}
    </div>
  );
}

export default StoryPrompt;
