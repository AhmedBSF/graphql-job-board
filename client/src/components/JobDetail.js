import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getJob } from "../graphql/queries";

function JobDetail() {
  const [job, setJob] = useState(null);
  const [error, setError] = useState(false);

  const { jobId } = useParams();

  useEffect(() => {
    getJob(jobId)
      .then(setJob)
      .catch((err) => setError(true));
  }, [jobId]);

  if (!job) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sorry, something went wrong!</p>;
  }

  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
}

export default JobDetail;
