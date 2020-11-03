import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function getApprovedStories(update) {
  const [result, setResult] = React.useState({});
  const [loading, setLoading] = React.useState('false');

  React.useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch('/stories/approved');
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

function ApprovedStories() {
  const [update, setUpdate] = React.useState(false);
  const [result, loading] = getApprovedStories(update);

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

export default ApprovedStories;
