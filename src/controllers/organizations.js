import { getAllOrganizations, getAllOrganizationDetails, createOrganization } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationsPage = async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = 'Our Partner Organizations';
  
  res.render('organizations', { title, organizations });
}

const showOrganizationDetailsPage = async (req, res) => {
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

const showNewOrganizationForm = async (req, res) => {
  const title = 'Add New Organization';
  res.render('new-organization', { title });
}

const processNewOrganizationForm = async (req, res) => {
  const { name, description, contact_email } = req.body;
  const logo_filename = 'placeholder-logo.png'; // Placeholder logo filename

  const organizationId = await createOrganization(name, description, contact_email, logo_filename);
  
  req.flash('success', 'Organization created successfully!');
  res.redirect(`/organization/${organizationId}`);
}

export { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm };