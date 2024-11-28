import { User, Task, TaskCategory } from '../types';

const taskTitles = [
  'Update website design',
  'Fix login bug',
  'Create marketing materials',
  'Review sales report',
  'Customer support training',
  'Implement new feature',
  'Write documentation',
  'Prepare presentation',
  'Code review',
  'Database optimization',
  'Design new logo',
  'Analyze user feedback',
  'Update API documentation',
  'Create email templates',
  'Optimize landing page'
];

const taskDescriptions = [
  'Enhance the user interface and improve overall user experience',
  'Investigate and resolve authentication issues in the login flow',
  'Design and create promotional materials for upcoming product launch',
  'Analyze monthly sales data and prepare comprehensive summary report',
  'Conduct training session for new support team members',
  'Develop and test new feature for mobile app',
  'Create comprehensive documentation for API integration',
  'Prepare slides for quarterly stakeholder meeting',
  'Review and provide feedback on recent code changes',
  'Optimize database queries for improved performance',
  'Research and implement SEO best practices',
  'Conduct user interviews and compile feedback',
  'Update security protocols and documentation',
  'Design responsive email templates for marketing campaign',
  'Analyze and improve website loading speed'
];

const categories: TaskCategory[] = ['development', 'design', 'marketing', 'sales', 'support', 'other'];
const priorities = ['low', 'medium', 'high'] as const;
const statuses = ['pending', 'completed', 'failed'] as const;

export function generateDummyTasks(users: User[]): Task[] {
  const tasks: Task[] = [];
  const adminUser = users.find(u => u.role === 'admin')!;
  const regularUsers = users.filter(u => u.role === 'user');

  regularUsers.forEach(user => {
    const numTasks = Math.floor(Math.random() * 6) + 10; 
    
    for (let i = 0; i < numTasks; i++) {
      const randomTitle = taskTitles[Math.floor(Math.random() * taskTitles.length)];
      const randomDesc = taskDescriptions[Math.floor(Math.random() * taskDescriptions.length)];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      const dueDate = new Date(createdAt.getTime() + (Math.random() * 14 + 1) * 24 * 60 * 60 * 1000);
      
      tasks.push({
        id: crypto.randomUUID(),
        title: `${randomTitle} ${Math.floor(Math.random() * 100)}`,
        description: randomDesc,
        createdAt: createdAt.toISOString(),
        dueDate: dueDate.toISOString(),
        priority: randomPriority,
        status: randomStatus,
        category: randomCategory,
        assignedTo: user.id,
        assignedBy: adminUser.id,
        updatedAt: randomStatus !== 'pending' ? 
          new Date(createdAt.getTime() + Math.random() * (Date.now() - createdAt.getTime())).toISOString() : 
          undefined
      });
    }
  });

  return tasks;
}