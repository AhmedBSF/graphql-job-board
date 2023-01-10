import { Job, Company } from "./db.js";

export const resolvers = {
  Query: {
    job: (_root, { id }) => Job.findById(id),
    jobs: async () => Job.findAll(),
    company: (_root, { id }) => Company.findById(id),
    companies: async () => Company.findAll(),
  },

  Mutation: {
    createJob: (_root, { input }) => Job.create(input),
    deleteJob: (_root, { id }) => Job.delete(id),
    updateJob: (_root, { input }) => Job.update(input),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
