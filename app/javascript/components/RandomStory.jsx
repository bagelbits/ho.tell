import React from "react";
import Button from "react-bootstrap/Button";
import ReportModal from "./ReportModal";

const MAX_REPORTS = 2;

function getRandomStory(reports, storyId) {
  const [result, setResult] = React.useState({});
  const [loading, setLoading] = React.useState("false");

  React.useEffect(() => {
    async function fetchPrompt() {
      if (reports >= MAX_REPORTS) {
        setResult({
          story: "Thank you for playing!",
        });
        setLoading("true");
        return;
      }

      try {
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
  }, [reports]);

  return [result, loading];
}

function RandomStory(props) {
  const [reports, setReports] = React.useState(0);
  const [result, loading] = getRandomStory(reports, props.storyId);
  const [reportModalOpen, setReportModalOpen] = React.useState(false);

  const reportEl = React.useRef(null);

  const reportStory = (storyId) => {
    async function submitStoryReport() {
      if (reports >= MAX_REPORTS) {
        closeReportModal();
        alert("Sorry. You aren't able to report anymore!");
        return;
      }

      try {
        const csrf = document
          .querySelector("meta[name='csrf-token']")
          .getAttribute("content");
        const response = await fetch(`/stories/${storyId}/report`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-Token": csrf,
          },
        });
        const json = await response.json();
        if (json.success) {
          setReports(reports + 1);
        } else {
          alert(json.error);
        }
      } catch (error) {
        console.log(error);
      }
      closeReportModal();
    }

    submitStoryReport();
  };

  const openReportModal = () => {
    setReportModalOpen(true);
  };
  const closeReportModal = () => {
    setReportModalOpen(false);
  };

  return (
    <div>
      {loading === "false" ? (
        <p>Loading...</p>
      ) : loading === "null" ? (
        <p>Something went terribly wrong.</p>
      ) : (
        <div>
          <p className="story"> {result.story} </p>

          <div className="prompt-buttons">
            {reports < MAX_REPORTS && (
              <Button
                variant="danger"
                id="prompt_report"
                ref={reportEl}
                onClick={openReportModal}
              >
                Report!
              </Button>
            )}
          </div>

          <ReportModal
            open={reportModalOpen}
            onClose={closeReportModal}
            onReport={reportStory}
            storyId={result.id}
          />
        </div>
      )}
    </div>
  );
}

export default RandomStory;
