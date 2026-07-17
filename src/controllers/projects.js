import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

export const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = 'Service Projects';
  res.render('projects', { title, projects });
}

export const showProjectDetailsPage = async (req, res) => {
  try {
    const projectId = Number(req.params.id);
    const projectDetails = await getProjectDetails(projectId);
    const title = 'Project Details';
    res.render('project', { title, projectDetails });
  } catch (error) {
    console.error('Error loading project details:', error.message);
    res.status(500).render('errors/500', {
      title: 'Server Error',
      error: error.message,
      stack: error.stack
    });
  }
}