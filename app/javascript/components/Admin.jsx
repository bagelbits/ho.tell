import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ToReviewStories from './admin/ToReviewStories';
import ApprovedStories from './admin/ApprovedStories';
import ReportedStories from './admin/ReportedStories';

function Index() {
  return (
    <div>
      <h1 className="title">Ho.tell Admindesk</h1>
      <Tabs defaultActiveKey="toReview" unmountOnExit id="uncontrolled-tab-example">
        <Tab eventKey="toReview" title="To Review">
          <ToReviewStories />
        </Tab>
        <Tab eventKey="approved" title="Approved">
          <ApprovedStories />
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
