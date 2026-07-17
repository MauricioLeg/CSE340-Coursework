DROP TABLE IF EXISTS public.project_category CASCADE;
DROP TABLE IF EXISTS public.category CASCADE;
DROP TABLE IF EXISTS public.project CASCADE;
DROP TABLE IF EXISTS public.organization CASCADE;

CREATE TABLE organization (
 organization_id SERIAL PRIMARY KEY,
 name VARCHAR(150) NOT NULL,
 description TEXT NOT NULL,
 contact_email VARCHAR(255) NOT NULL,
 logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename) 
VALUES 
(
    'BrightFuture Builders', 
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 
    'info@brightfuturebuilders.org', 
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers', 
    'An urban farming collective promoting food sustainability and education in local neighborhoods.', 
    'contact@greenharvest.org', 
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers', 
    'A volunteer coordination group supporting local charities and service initiatives.', 
    'hello@unityserve.org', 
    'unityserve-logo.png'
);

SELECT * FROM organization;

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    
    CONSTRAINT fk_organization
        FOREIGN KEY(organization_id) 
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

SELECT * FROM project;

INSERT INTO project (organization_id, title, description, location, date) 
VALUES 
-- ==========================================================================
-- 1. BrightFuture Builders (Infrastructure & Sustainable Construction)
-- ==========================================================================
(1, 'Community Center Renovation', 'Repairing and painting the main hall of the local community center, updating light fixtures to energy-efficient LEDs, and fixing the flooring.', 'Downtown Community Center', '2026-08-12'),
(1, 'Eco-Friendly Park Benches', 'Building and installing public benches made entirely out of recycled plastics and sustainably sourced timber across local green spaces.', 'Riverside Park', '2026-08-25'),
(1, 'Access Ramp Construction', 'Constructing wooden and concrete wheelchair access ramps for elderly residents and local public buildings to improve accessibility.', 'Northside Neighborhood', '2026-09-05'),
(1, 'Sustainable Greenhouse Build', 'Framing and constructing a small community greenhouse using reclaimed windows and sustainable materials to assist urban gardeners.', 'East Side Public Garden', '2026-09-18'),
(1, 'Public Library Roof Repair', 'Assisting a team of professional contractors in patching leaks and applying reflective eco-coatings to the library roof to lower energy costs.', 'Central Public Library', '2026-10-02'),

-- ==========================================================================
-- 2. GreenHarvest Growers (Urban Farming, Food Sustainability & Education)
-- ==========================================================================
(2, 'Neighborhood Compost Drive', 'Setting up community composting bins, educating neighbors on sorting organic waste, and distributing finished compost to backyard growers.', 'Community Garden Plots', '2026-07-20'),
(2, 'School Vegetable Garden Setup', 'Building raised garden beds at the local elementary school and planting beginner-friendly vegetables like tomatoes, lettuce, and carrots.', 'Lincoln Elementary School', '2026-08-04'),
(2, 'Urban Orchard Planting', 'Planting fruit-bearing trees including apple, pear, and cherry trees in a designated public zone to introduce free local foraging options.', 'Sunset Public Park', '2026-08-19'),
(2, 'Hydroponics Workshop for Teens', 'Setting up a temporary indoor hydroponic system and teaching local youth how to grow herbs and leafy greens without soil.', 'Youth Recreation Center', '2026-09-11'),
(2, 'Harvest and Food Bank Donation', 'Gathering seasonal vegetables from the urban farm plots, washing, packaging, and delivering them fresh to local family shelters.', 'GreenHarvest Main Plot', '2026-09-29'),

-- ==========================================================================
-- 3. UnityServe Volunteers (Volunteer Coordination & Charity Support)
-- ==========================================================================
(3, 'Senior Center Companion Day', 'Spending the afternoon playing board games, reading stories, and hosting a musical sing-along session for residents at the senior home.', 'Silver Linings Care Facility', '2026-07-28'),
(3, 'Back-to-School Supply Packing', 'Sorting donated backpacks, notebooks, pencils, and calculators into ready-to-go kits for children from low-income families.', 'UnityServe Headquarters', '2026-08-10'),
(3, 'Local Homeless Shelter Meal Prep', 'Chopping ingredients, cooking healthy meals, and serving dinner to residents staying at the municipal temporary shelter.', 'Hope House Shelter', '2026-08-30'),
(3, 'Annual Charity 5K Race Support', 'Setting up water stations, directing runners along the path, and handing out medals at the finish line for a local health fundraiser.', 'City Sports Complex', '2026-09-15'),
(3, 'Community Clothing Sorting Drive', 'Collecting, inspecting, and organizing winter clothing donations into neatly labeled boxes categorized by size for winter distribution.', 'St. Jude Community Hall', '2026-10-10');

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE -- Ensures category names cannot be duplicated
);

CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),    
    CONSTRAINT fk_project
        FOREIGN KEY(project_id) 
        REFERENCES project(project_id) 
        ON DELETE CASCADE,        
    CONSTRAINT fk_category
        FOREIGN KEY(category_id) 
        REFERENCES category(category_id) 
        ON DELETE CASCADE
);

INSERT INTO category (name) VALUES 
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

INSERT INTO project_category (project_id, category_id) VALUES
-- BrightFuture Builders Projects (IDs 1-5)
(1, 3), -- Community Center Renovation -> Community Service
(2, 1), -- Eco-Friendly Park Benches -> Environmental
(2, 3), -- Eco-Friendly Park Benches -> Community Service
(3, 3), -- Access Ramp Construction -> Community Service
(4, 1), -- Sustainable Greenhouse Build -> Environmental
(4, 2), -- Sustainable Greenhouse Build -> Educational
(5, 3), -- Public Library Roof Repair -> Community Service

-- GreenHarvest Growers Projects (IDs 6-10)
(6, 1), -- Neighborhood Compost Drive -> Environmental
(6, 2), -- Neighborhood Compost Drive -> Educational
(7, 1), -- School Vegetable Garden Setup -> Environmental
(7, 2), -- School Vegetable Garden Setup -> Educational
(8, 1), -- Urban Orchard Planting -> Environmental
(9, 2), -- Hydroponics Workshop for Teens -> Educational
(10, 3),-- Harvest and Food Bank Donation -> Community Service
(10, 4),-- Harvest and Food Bank Donation -> Health and Wellness

-- UnityServe Volunteers Projects (IDs 11-15)
(11, 3),-- Senior Center Companion Day -> Community Service
(11, 4),-- Senior Center Companion Day -> Health and Wellness
(12, 2),-- Back-to-School Supply Packing -> Educational
(12, 3),-- Back-to-School Supply Packing -> Community Service
(13, 3),-- Local Homeless Shelter Meal Prep -> Community Service
(13, 4),-- Local Homeless Shelter Meal Prep -> Health and Wellness
(14, 3),-- Annual Charity 5K Race Support -> Community Service
(14, 4),-- Annual Charity 5K Race Support -> Health and Wellness
(15, 3);-- Community Clothing Sorting Drive -> Community Service

SELECT p.title, c.name AS category_name
FROM project p
JOIN project_category pc ON p.project_id = pc.project_id
JOIN category c ON pc.category_id = c.category_id
ORDER BY p.project_id;