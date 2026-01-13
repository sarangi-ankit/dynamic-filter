Dynamic Filter Builder

A client-side Dynamic Filter Builder built with React, TypeScript, and Material UI, supporting filtering of multiple data types with real-time updates.

Live Demo- https://dynamic-filter-564m-qk4jb6lrx-ankit-sarangis-projects.vercel.app/

Features

Dynamic filters with type-based operators

Real-time client-side filtering

Sortable table with nested objects and arrays

Fully typed with TypeScript

Setup Instructions

Clone the repository

git clone https://github.com/your-username/dynamic-filter-builder.git
cd dynamic-filter-builder


Install dependencies

npm install


Start JSON Server (mock API)

npx json-server --watch mock/db.json --port 4000


Start the React app

npm run dev

API Example


Example Filter
{
  field: "address.city",
  operator: "contains",
  value: "Delhi"
}


Submission Checklist

Filters implemented and operators working

JSON dataset with 50 records

Real-time table updates

Validation and TypeScript types defined

Live demo deployed

Author

Ankit Sarangi – Full Stack Developer (React, Next.js, Node.js, TypeScript)