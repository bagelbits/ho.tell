import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function Index() {
  return <div>
    <h1 className="title">Ho.tell Admindesk</h1>
    <Tabs defaultActiveKey="toReview" id="uncontrolled-tab-example">
      <Tab eventKey="toReview" title="To Review">
        Thing
      </Tab>
      <Tab eventKey="reviewed" title="Reviewed">
        Thing
      </Tab>
      <Tab eventKey="reported" title="Reported">
        Thing
      </Tab>
    </Tabs>
  </div>;
}

Index.propTypes = {};
export default Index;
