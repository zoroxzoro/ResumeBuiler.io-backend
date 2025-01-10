import Resume from "../model/Resume.model.js"; // Import the Resume model
import User from "../model/user.model.js"; // Import the User model

export const createResume = async (req, res) => {
  try {
    const { userId, resumeTitle, name, email } = req.body; // Ensure `clerkId` is passed in the request body

    // Find the user by Clerk ID
    const user = await User.findOne({ clerkId: userId });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new resume document
    const newResume = new Resume({
      resumeTitle,
      userId: user._id, // Use the MongoDB ObjectId of the user
      name,
      email,
    });

    // Save the resume document to the database
    const savedResume = await newResume.save();

    // Update the user's `resumes` array to include the new resume
    user.resumes.push(savedResume);
    await user.save();

    // Return the created resume
    res
      .status(201)
      .json({ message: "Resume created successfully", resume: savedResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const { _id: resumeId } = req.params; // Extract `resumeId` from request parameters

    // Find the resume by its ID
    const resume = await Resume.findById({ _id: resumeId }).populate(
      "userId",
      "name email"
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Return the found resume
    res.status(200).json({ message: "Resume fetched successfully", resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getResumesByUser = async (req, res) => {
  try {
    const { clerkId } = req.params; // Extract `clerkId` from the route parameters
    console.log("Clerk ID:", clerkId);

    // Find the user by `clerkId`
    const user = await User.findOne({ clerkId }).populate("resumes"); // Populate the `resumes` field
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the populated resumes
    res.status(200).json({
      message: "Resumes fetched successfully",
      resumes: user.resumes, // Resumes are directly accessible after population
    });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateResume = async (req, res) => {
  const { id } = req.params; // Get the resume ID from the URL params
  const updateData = req.body; // Get the updated data from the request body
  console.log(id);

  try {
    // Validate if the ID exists in the request
    if (!id) {
      return res.status(400).json({ message: "Resume ID is required." });
    }

    // Update the resume document by ID
    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Options to return updated document and run schema validation
    );

    // Check if the document exists
    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found." });
    }

    // Respond with the updated document
    res
      .status(200)
      .json({ message: "Resume updated successfully", data: updatedResume });
  } catch (error) {
    // Handle errors and respond with appropriate message
    res
      .status(500)
      .json({ message: "Error updating resume", error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params; // Get the resume ID from the route params

    // Find the resume by its ID and delete it
    const resume = await Resume.findByIdAndDelete(id);

    // Check if the resume was found and deleted
    if (!resume) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Resume not found",
      });
    }

    // Send success response
    res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while deleting the resume",
      error: error.message,
    });
  }
};
