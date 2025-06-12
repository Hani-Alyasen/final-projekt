import Project from '../models/Project.js';

// @desc    Create new project
export const createProject = async (req, res) => {
  const { title, description, deadline } = req.body;


  try {
    if (!req.user.team) {
      return res.status(400).json({ message: 'You must belong to a team to create projects' });
    }

    console.log('📦 Incoming deadline:', deadline); // <-- Add this!

    const project = await Project.create({
      title,
      description,
      deadline: deadline ? new Date(deadline) : null, // <-- make sure it's a Date
      team: req.user.team,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc    Get all projects for user’s team
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ team: req.user.team }).populate('team');

    const formatted = projects.map((p) => ({
      _id: p._id,
      title: p.title,
      description: p.description,
      deadline: p.deadline ? p.deadline.toISOString() : null,
      team: {
        name: p.team?.name,
        members: p.team?.members || [],
      },
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



