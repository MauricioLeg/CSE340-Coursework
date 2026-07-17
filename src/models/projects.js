import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.date, o.name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        ORDER BY p.date ASC;
    `;
    
    const result = await db.query(query);
    
    return result.rows;
}

const getProjectsByOrganizationId = async (organizationID) => {
    const query = `
        SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.date
        FROM public.project p
        WHERE p.organization_id = $1
        ORDER BY p.date;
    `;

    const queryParams = [Number(organizationID)];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
    SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.date, o.name
    FROM public.project p
    JOIN public.organization o ON p.organization_id = o.organization_id
    WHERE p.date >= NOW()
    ORDER BY p.date ASC
    LIMIT $1;
    `;
    
    const queryParams = [Number(number_of_projects)];
    const result = await db.query(query, queryParams);
    
    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
    SELECT p.project_id, p.title, p.description, p.location, p.date, p.organization_id, o.name
    FROM public.project p
    JOIN public.organization o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
    `;
    
    const queryParams = [Number(id)];
    const result = await db.query(query, queryParams);
    
    return result.rows[0];
};


const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.date
        FROM public.project p
        JOIN public.project_category pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.date;
    `;

    const queryParams = [Number(categoryId)];
    const result = await db.query(query, queryParams);

    return result.rows;
}

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategoryId };