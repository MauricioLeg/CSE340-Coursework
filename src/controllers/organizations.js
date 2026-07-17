import { getAllOrganizations, getAllOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

export const showOrganizationsPage = async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = 'Our Partner Organizations';
  
  res.render('organizations', { title, organizations });
}

export const showOrganizationDetailsPage = async (req, res) => {
  try {
    const organizationId = Number(req.params.id);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(404).render('errors/404', {
        title: 'Page Not Found',
        error: 'Invalid organization id.'
      });
    }

    console.log('Loading organization details for id:', organizationId);

    const organizationDetails = await getAllOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);

    console.log('Organization details result:', organizationDetails);
    console.log('Projects result:', projects);

    if (!organizationDetails) {
      return res.status(404).render('errors/404', {
        title: 'Page Not Found',
        error: 'Organization not found.'
      });
    }

    const title = 'Organization Details';
    return res.render('organization', { title, organizationDetails, projects });
  } catch (error) {
    console.error('Error loading organization details:', error.message);
    return res.status(500).render('errors/500', {
      title: 'Server Error',
      error: error.message,
      stack: error.stack
    });
  }
}
