import User from "../model/user.model.js"; // Assuming the model is in the 'models' folder

export const createUser = async (req, res, next) => {
  try {
    const { userId, emailAddresses, firstName, lastName } = req.auth;

    // Check if the user already exists
    let user = await User.findOne({ clerkId: userId });
    if (user) {
      return res.status(200).json({ message: "User already exists", user });
    }

    if (!user) {
      // Create a new user document
      user = new User({
        clerkId: userId,
        email: emailAddresses,
        name: firstName,
        resumes: [],
      });
      await user.save();
    }

    res.status(200).json({ message: "User authenticated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
