import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function getToReviewStories(update) {
  const [result, setResult] = React.useState({});
  const [loading, setLoading] = React.useState('false');

  React.useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch('/stories/to_review');
        const json = await response.json();
        setResult(json);
        setLoading('true');
      } catch (error) {
        console.log(error);
        setLoading('null');
      }
    }

    fetchStories();
  }, [update]);

  return [result, loading];
}

function ToReviewStories() {
  const [update, setUpdate] = React.useState(false);
  const [result, loading] = getToReviewStories(update);

  const approveClicked = (storyId) => {
    async function approveStory() {
      try {
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
        await fetch(`/stories/${storyId}/approve`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-CSRF-Token': csrf,
          },
        });
        setUpdate(!update);
      } catch (error) {
        console.log(error);
      }
    }

    approveStory();
  };
  const reportClicked = (storyId) => {
    async function reportStory() {
      try {
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
        await fetch(`/stories/${storyId}/report`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-CSRF-Token': csrf,
          },
        });
        setUpdate(!update);
      } catch (error) {
        console.log(error);
      }
    }

    reportStory();
  };

  let renderedComponent = <div />;

  if (loading === 'false') {
    renderedComponent = <p>Loading...</p>;
  } else if (loading === 'null') {
    renderedComponent = <p>Something went terribly wrong.</p>;
  } else {
    renderedComponent = (
      <ListGroup>
        {result.map((story) => {
          return (
            <ListGroup.Item key={story.id}>
              <div>{story.story}</div>
              <div>{story.created_at}</div>
              <Button
                variant="primary"
                onClick={() => {
                  approveClicked(story.id);
                }}
              >
                Approve!
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  reportClicked(story.id);
                }}
              >
                Report!
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }

  return renderedComponent;
}

export default ToReviewStories;
