import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = 'Service Projects';
  res.render('projects', { title, projects });
}

const showProjectDetailsPage = async (req, res) => {
  try {
    const projectId = Number(req.params.id);
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);

    const title = 'Project Details';

    return res.render('project', { title, projectDetails, categories: categories || [] });
  
  } catch (error) {
    console.error('Error loading project details:', error.message);
    return res.status(500).render('errors/500', {
      title: 'Server Error' ,
      error: error.message,
      stack: error.stack
    });
  }
}

export { showProjectsPage, showProjectDetailsPage };