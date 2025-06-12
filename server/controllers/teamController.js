import Team from '../models/Team.js';
import User from '../models/User.js';

// @desc    Create a team
export const createTeam = async (req, res) => {
  const { name } = req.body;

  try {
    const team = await Team.create({
      name,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    // Update user's team
    await User.findByIdAndUpdate(req.user._id, { team: team._id });

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Invite user to team by email
export const inviteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if current user has a team
    const team = await Team.findOne({ _id: req.user.team });
    if (!team) return res.status(400).json({ message: 'You don’t belong to any team' });

    // Add user to team if not already a member
    if (!team.members.includes(user._id)) {
      team.members.push(user._id);
      await team.save();

      user.team = team._id;
      await user.save();
    }

    res.json({ message: `User ${email} added to your team` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
