import db from './db.js';

const getAllOrganizations = async () => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organization;
    `;
    
    const result = await db.query(query);
    
    return result.rows;
}

const getAllOrganizationDetails = async (organizationID) => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organization
        WHERE organization_id = $1;
    `;

    const queryParams = [Number(organizationID)];
    const result = await db.query(query, queryParams);
    
    return result.rows.length > 0 ? result.rows[0] : null;
}

export { getAllOrganizations, getAllOrganizationDetails };