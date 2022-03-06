import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import JobCard from "../Layout/JobCard";
import "./JobCategories.css";

const JobCategories = (props) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const snap = await getDocs(collection(db, "jobs"));

      let data = [];
      snap.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().title}`);
        data.push(doc.data());
      });

      // return snap
      setJobs(data);
    };
    getData();
  }, []);
  return (
    <>
      <h2>Select the job category</h2>
      <div className="job-categories">
        <div className="jobs">
          {jobs.map((d) => {
            return (
              <JobCard
                onClick={props.onClick}
                title={d.title}
                description={d.description}
                key={d.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default JobCategories;
