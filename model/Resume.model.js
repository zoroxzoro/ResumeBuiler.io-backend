import mongoose, { Schema } from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    resumeTitle: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    summery: {
      type: String,
    },
    experience: [
      {
        title: {
          type: String,
        },
        companyName: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        workSummery: {
          type: String,
        },
      },
    ],
    education: [
      {
        universityName: {
          type: String,
        },
        degree: {
          type: String,
        },
        major: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    skills: [
      {
        name: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
    themeColor: {
      type: String,
    },
  },
  { timestamp: true }
);
const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
