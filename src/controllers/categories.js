import { getAllCategories, getCategoryById, getCategoriesByProjectId } from '../models/categories.js';
import { getAllProjects, getProjectsByCategoryId } from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Service Categories';
  res.render('categories', { title, categories });
}

const showCategoryDetailsPage = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = category ? category.name : 'Category Not Found';

    return res.render('category', { title, category, projects: projects || [] });
  
  } catch (error) {
    console.error('Error fetching category details:', error);
    return res.status(500).render('error', { title: 'Error', message: 'An error occurred while fetching category details.' });
  }
};

export { showCategoriesPage, showCategoryDetailsPage };