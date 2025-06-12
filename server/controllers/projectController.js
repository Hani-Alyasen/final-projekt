import Project from '../models/Project.js';

// @desc    Create new project
export const createProject = async (req, res) => {
  const { title, description, deadline } = req.body;

  try {
    if (!req.user.team) {
      return res.status(400).json({ message: 'You must belong to a team to create projects' });
    }

    const project = await Project.create({
      title,
      description,
      deadline,
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
    const projects = await Project.find({ team: req.user.team }).lean();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

