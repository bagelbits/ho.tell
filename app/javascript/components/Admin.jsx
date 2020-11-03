import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ToReviewStories from './admin/ToReviewStories';
import ReviewedStories from './admin/ReviewedStories';
import ReportedStories from './admin/ReportedStories';

function Index() {
  return (
    <div>
      <h1 className="title">Ho.tell Admindesk</h1>
      <Tabs defaultActiveKey="toReview" id="uncontrolled-tab-example">
        <Tab eventKey="toReview" title="To Review">
          <ToReviewStories />
        </Tab>
        <Tab eventKey="reviewed" title="Reviewed">
          <ReviewedStories />
        </Tab>
        <Tab eventKey="reported" title="Reported">
          <ReportedStories />
        </Tab>
      </Tabs>
    </div>
  );
}

Index.propTypes = {};
export default Index;
