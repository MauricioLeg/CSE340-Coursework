import { 
  getAllOrganizations, 
  getAllOrganizationDetails, 
  createOrganization,
  updateOrganization
} from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

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
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach(error => {
      req.flash('error', error.msg);
    });
    return res.redirect('/new-organization');
  }

  const { name, description, contact_email } = req.body;
  const logo_filename = 'placeholder-logo.png'; // Placeholder logo filename

  const organizationId = await createOrganization(name, description, contact_email, logo_filename);
  
  req.flash('success', 'Organization created successfully!');
  res.redirect(`/organization/${organizationId}`);
}

const organizationValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Organization name is required.')
    .isLength({ min: 3, max: 150 })
    .withMessage('Organization name must be between 3 and 150 characters.'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Organization description is required.')
    .isLength({ max: 500 })
    .withMessage('Organization description must not exceed 500 characters.'),
  body('contact_email')
    .normalizeEmail()
    .notEmpty()
    .withMessage('Contact email is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
];

const showEditOrganizationForm = async (req, res) => {
  const organizationId = req.params.id;
  const organizationDetails = await getAllOrganizationDetails(organizationId);
  
  const title = 'Edit Organization';
  res.render('edit-organization', { title, organizationDetails });
};

const processEditOrganizationForm = async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash('error', error.msg);
    })

    return res.redirect('/edit-organization/' + req.params.id);
  }

  const organizationId = req.params.id;
  const { name, description, contact_email, logo_filename } = req.body;
  await updateOrganization(organizationId, name, description, contact_email, logo_filename);
  
  req.flash('succes', 'Organization updated successfully!');

  res.redirect(`/organization/${organizationId}`);
}

export { 
  showOrganizationsPage, 
  showOrganizationDetailsPage, 
  showNewOrganizationForm, 
  processNewOrganizationForm, 
  organizationValidation,
  showEditOrganizationForm,
  processEditOrganizationForm
 };