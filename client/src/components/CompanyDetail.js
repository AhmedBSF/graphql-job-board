import { useParams } from "react-router";
import { getCompany } from "../graphql/queries";
import { useEffect, useState } from "react";
import JobList from "./JobList";

function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(false);

  const { companyId } = useParams();

  useEffect(() => {
    getCompany(companyId)
      .then(setCompany)
      .catch((err) => setError(true));
  }, [companyId]);

  if (!company) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Sorry, something went wrong!</p>;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5>Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;