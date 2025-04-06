
import React from "react";
import Page from "@/components/Page";

const PrivacyPolicy = () => {
  return (
    <Page title="Privacy Policy" showBackButton={true}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p>This is the privacy policy page.</p>
      </div>
    </Page>
  );
};

export default PrivacyPolicy;
