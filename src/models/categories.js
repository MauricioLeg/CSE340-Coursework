import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category;
    `;
    
    const result = await db.query(query);
    
    return result.rows;
}

const getCategoryById = async (categoryID) => {
    const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;

    const queryParams = [Number(categoryID)];
    const result = await db.query(query, queryParams);

    return result.rows[0];
}

const getCategoriesByProjectId = async (projectID) => {
    const query = `
        SELECT c.category_id, c.name
        FROM public.category c
        JOIN public.project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;

    const queryParams = [Number(projectID)];
    const result = await db.query(query, queryParams);

    return result.rows;
}

export { getAllCategories, getCategoryById, getCategoriesByProjectId  };