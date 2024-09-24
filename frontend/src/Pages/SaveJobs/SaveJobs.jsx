import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const SaveJobs = () => {
  const [findWorkOpen, setFindWorkOpen] = useState(false);
  const [deliverWorkOpen, setDeliverWorkOpen] = useState(false);
  const [manageFinancesOpen, setManageFinancesOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <p className="mt-2 text-sm md:text-base">
            Keep track of jobs you’re interested in. Select the heart icon on a
            job post to save it for later.
          </p>
        </div>
      </main>
    </div>
  );
};

export default SaveJobs;
