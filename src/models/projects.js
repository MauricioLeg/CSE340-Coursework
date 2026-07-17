import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT project_id, organization_id, title, description, location, date
        FROM public.project;
    `;
    
    const result = await db.query(query);
    
    return result.rows;
}

const getProjectsByOrganizationId = async (organizationID) => {
    const query = `
        SELECT project_id, organization_id, title, description, location, date
        FROM public.project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const queryParams = [organizationID];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
    SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.date, o.name
    FROM public.project p
    JOIN public.organization o ON p.organization_id = o.organization_id
    WHERE date >= NOW()
    ORDER BY date ASC;
    `;
    
    const result = await db.query(query);
    
    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
    SELECT p.project_id, p.title, p.description, p.location, p.date, p.organization_id, o.name
    FROM public.project p
    JOIN public.organization o ON p.organization_id = o.organization_id
    WHERE p.project_id = ${id};
    `;
    
    const result = await db.query(query);
    
    return result.rows[0];
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };