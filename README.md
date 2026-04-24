## Performance Review System

The project is a simple performance review system where admins can manage employees, create review cycles, and assign reviewers, while employees can view their assigned reviews and submit feedback.

## Design

The system is built using a basic client-server approach:

- Frontend: Next.js (App Router, built on React)
- Backend: Node.js + Express
- Database: MongoDB

Instead of embedding everything in a single collection, I used separate collections for employees, reviews, assignments, and feedback.

The key part is the `reviewAssignments` collection, which connects a reviewer and a reviewee within a review. This makes it easy to support multiple reviewers per employee and keeps the data model flexible.

## Backend

The backend is structured into controllers, services, and models to keep responsibilities separated.

APIs are designed to be simple and practical. For example, assignments along with feedback are fetched using a single aggregation query so the frontend does not have to make multiple calls.

Basic error handling is added to avoid crashes and keep responses consistent.

## Frontend

The frontend uses Next.js with a mix of server and client components.

- Server components are used to fetch initial data.
- Client components handle interactions like forms, modals, and updates.

From a UI perspective:

- Admin can manage employees, create reviews, assign reviewers, and view all assignments.
- Employees can see assigned reviews and submit feedback.
- Tables are used to show summary data, and detailed feedback (comments) is shown only when needed to keep the UI clean.

## Live Links

- Employee: [https://feedback-system-client.onrender.com/employee/dashboard?userId=69ea3a2f3575a37dcdf26ec8](https://feedback-system-client.onrender.com/employee/dashboard?userId=69ea3a2f3575a37dcdf26ec8)
- Admin: [https://feedback-system-client.onrender.com/admin](https://feedback-system-client.onrender.com/admin)

Note: Employee dashboard currently uses `userId` from the query string.
