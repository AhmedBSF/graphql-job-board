import { Job, Company } from "./db.js";

function rejectIf(condition, message) {
  if (condition) throw new Error(message);
}

export const resolvers = {
  Query: {
    job: (_root, { id }) => Job.findById(id),
    jobs: async () => Job.findAll(),
    company: (_root, { id }) => Company.findById(id),
    companies: async () => Company.findAll(),
  },

  Mutation: {
    createJob: (_root, { input }, { user }) => {
      rejectIf(!user, "Unauthorized user!");
      return Job.create({ ...input, companyId: user.companyId });
    },

    deleteJob: async (_root, { id }, { user }) => {
      rejectIf(!user, "Unauthorized user!");
      const job = await Job.findById(id);
      rejectIf(
        job.companyId !== user.companyId,
        "You are not authorized to delete this job!"
      );
      return Job.delete(id);
    },

    updateJob: async (_root, { input }, { user }) => {
      rejectIf(!user, "Unauthorized user!");
      const job = await Job.findById(input.id);
      rejectIf(
        job.companyId !== user.companyId,
        "You are not authorized to update this job"
      );
      return Job.update({ ...input, companyId: user.companyId });
    },
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
