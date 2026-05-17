// ===== DUMMY DATA FOR FRONTEND DEMONSTRATION =====

export const users = {
  student: {
    id: 1,
    email: 'student@example.com',
    password: 'student123',
    role: 'student',
    name: 'Alex Johnson',
    rollNumber: 'CS2021001',
    department: 'Computer Science',
    year: 3,
    semester: 6,
    profileImage: null,
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 75 },
      { name: 'Python', level: 70 },
      { name: 'DSA', level: 65 },
      { name: 'SQL', level: 60 }
    ],
    links: {
      github: 'https://github.com/alexjohnson',
      linkedin: 'https://linkedin.com/in/alexjohnson',
      portfolio: 'https://alexjohnson.dev'
    },
    resume: null
  },
  staff: {
    id: 2,
    email: 'staff@example.com',
    password: 'staff123',
    role: 'staff',
    name: 'Dr. Sarah Williams',
    employeeId: 'STAFF2019045',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    subjects: ['Data Structures', 'Algorithms', 'Web Development'],
    googleClassroomCode: 'abc123xyz',
    profileImage: null
  },
  admin: {
    id: 3,
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    employeeId: 'ADMIN001',
    profileImage: null
  }
};

export const badges = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Completed your first test',
    icon: '🎯',
    color: '#4facfe',
    earned: true,
    earnedDate: '2026-01-15'
  },
  {
    id: 2,
    name: 'Quick Learner',
    description: 'Scored 90+ in 3 consecutive tests',
    icon: '⚡',
    color: '#00f2a9',
    earned: true,
    earnedDate: '2026-01-20'
  },
  {
    id: 3,
    name: 'Code Master',
    description: 'Solved 50 coding problems',
    icon: '💻',
    color: '#667eea',
    earned: false
  },
  {
    id: 4,
    name: 'Perfect Score',
    description: 'Achieved 100% in any test',
    icon: '🏆',
    color: '#f5576c',
    earned: true,
    earnedDate: '2026-01-25'
  },
  {
    id: 5,
    name: 'Feedback Champion',
    description: 'Submitted 10+ feedbacks',
    icon: '📝',
    color: '#ff9a56',
    earned: false
  }
];

export const studentStats = {
  testsCompleted: 12,
  averageScore: 78.5,
  badgesEarned: 3,
  totalBadges: 5,
  currentStreak: 7,
  totalProblems: 45,
  problemsSolved: 32,
  rank: 15,
  totalStudents: 120
};

export const tests = [
  {
    id: 1,
    title: 'Data Structures - Arrays & Linked Lists',
    subject: 'Data Structures',
    duration: 60,
    totalQuestions: 20,
    totalMarks: 100,
    status: 'completed',
    scheduledDate: '2026-01-15T10:00:00',
    completedDate: '2026-01-15T10:45:00',
    score: 85,
    createdBy: 'Dr. Sarah Williams'
  },
  {
    id: 2,
    title: 'DBMS - SQL Queries',
    subject: 'Database Management',
    duration: 90,
    totalQuestions: 25,
    totalMarks: 100,
    status: 'completed',
    scheduledDate: '2026-01-20T14:00:00',
    completedDate: '2026-01-20T15:15:00',
    score: 92,
    createdBy: 'Dr. John Smith'
  },
  {
    id: 3,
    title: 'Operating Systems - Process Management',
    subject: 'Operating Systems',
    duration: 75,
    totalQuestions: 30,
    totalMarks: 100,
    status: 'ongoing',
    scheduledDate: '2026-02-01T11:00:00',
    createdBy: 'Dr. Emily Brown'
  },
  {
    id: 4,
    title: 'Web Development - React Fundamentals',
    subject: 'Web Development',
    duration: 120,
    totalQuestions: 15,
    totalMarks: 100,
    status: 'upcoming',
    scheduledDate: '2026-02-05T10:00:00',
    createdBy: 'Dr. Sarah Williams'
  }
];

export const results = [
  {
    testId: 1,
    testTitle: 'Data Structures - Arrays & Linked Lists',
    score: 85,
    totalMarks: 100,
    percentage: 85,
    rank: 12,
    totalStudents: 95,
    correctAnswers: 17,
    wrongAnswers: 3,
    unattempted: 0,
    timeTaken: 45,
    submittedDate: '2026-01-15T10:45:00',
    topicWise: [
      { topic: 'Arrays', score: 45, total: 50 },
      { topic: 'Linked Lists', score: 40, total: 50 }
    ]
  },
  {
    testId: 2,
    testTitle: 'DBMS - SQL Queries',
    score: 92,
    totalMarks: 100,
    percentage: 92,
    rank: 5,
    totalStudents: 98,
    correctAnswers: 23,
    wrongAnswers: 2,
    unattempted: 0,
    timeTaken: 75,
    submittedDate: '2026-01-20T15:15:00',
    topicWise: [
      { topic: 'SELECT Queries', score: 48, total: 50 },
      { topic: 'JOIN Operations', score: 44, total: 50 }
    ]
  }
];

export const roadmaps = {
  dsa: {
    title: 'Data Structures & Algorithms',
    progress: 65,
    topics: [
      { 
        name: 'Arrays & Strings', 
        completed: true, 
        resources: [
          { title: 'GeeksforGeeks Arrays', url: 'https://www.geeksforgeeks.org/array-data-structure/' },
          { title: 'LeetCode Array Problems', url: 'https://leetcode.com/tag/array/' }
        ]
      },
      { 
        name: 'Linked Lists', 
        completed: true,
        resources: [
          { title: 'Visualgo Linked List', url: 'https://visualgo.net/en/list' }
        ]
      },
      { 
        name: 'Stacks & Queues', 
        completed: true,
        resources: [
          { title: 'Stack & Queue Tutorial', url: 'https://www.geeksforgeeks.org/stack-data-structure/' }
        ]
      },
      { 
        name: 'Trees & Graphs', 
        completed: false,
        resources: [
          { title: 'Tree Traversals', url: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/' }
        ]
      },
      { 
        name: 'Dynamic Programming', 
        completed: false,
        resources: [
          { title: 'DP Patterns', url: 'https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns' }
        ]
      }
    ]
  },
  dbms: {
    title: 'Database Management Systems',
    progress: 70,
    topics: [
      { name: 'SQL Basics', completed: true, resources: [] },
      { name: 'Normalization', completed: true, resources: [] },
      { name: 'Transactions & ACID', completed: true, resources: [] },
      { name: 'Indexing', completed: false, resources: [] },
      { name: 'Query Optimization', completed: false, resources: [] }
    ]
  },
  os: {
    title: 'Operating Systems',
    progress: 55,
    topics: [
      { name: 'Process Management', completed: true, resources: [] },
      { name: 'Memory Management', completed: true, resources: [] },
      { name: 'File Systems', completed: false, resources: [] },
      { name: 'Deadlocks', completed: false, resources: [] },
      { name: 'CPU Scheduling', completed: true, resources: [] }
    ]
  },
  languages: {
    title: 'Programming Languages',
    progress: 80,
    topics: [
      { name: 'JavaScript ES6+', completed: true, resources: [] },
      { name: 'Python Basics', completed: true, resources: [] },
      { name: 'Java OOP', completed: true, resources: [] },
      { name: 'C++ STL', completed: false, resources: [] }
    ]
  }
};

export const feedbackCategories = [
  'Course Content',
  'Teaching Quality',
  'Infrastructure',
  'Lab Facilities',
  'Library',
  'Administration',
  'Other'
];

export const feedbackData = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Anonymous',
    category: 'Teaching Quality',
    rating: 5,
    message: 'Excellent teaching methodology and clear explanations.',
    isAnonymous: true,
    createdDate: '2026-01-28T14:30:00',
    status: 'pending'
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'Anonymous',
    category: 'Lab Facilities',
    rating: 3,
    message: 'Need more computers in the lab. Current systems are slow.',
    isAnonymous: true,
    createdDate: '2026-01-25T10:15:00',
    status: 'reviewed'
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'Anonymous',
    category: 'Course Content',
    rating: 4,
    message: 'Course content is good but could include more practical examples.',
    isAnonymous: true,
    createdDate: '2026-01-22T16:45:00',
    status: 'pending'
  }
];

export const allUsers = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'student@example.com',
    role: 'student',
    department: 'Computer Science',
    year: 3,
    status: 'active',
    joinedDate: '2021-08-15'
  },
  {
    id: 2,
    name: 'Dr. Sarah Williams',
    email: 'staff@example.com',
    role: 'staff',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    status: 'active',
    joinedDate: '2019-07-01'
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    joinedDate: '2018-01-01'
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    role: 'student',
    department: 'Computer Science',
    year: 2,
    status: 'active',
    joinedDate: '2022-08-15'
  },
  {
    id: 5,
    name: 'Dr. John Smith',
    email: 'john.smith@example.com',
    role: 'staff',
    department: 'Information Technology',
    designation: 'Professor',
    status: 'active',
    joinedDate: '2015-06-01'
  }
];

export const staffAnalytics = {
  totalStudents: 120,
  averageClassScore: 76.5,
  testsCreated: 8,
  feedbackReceived: 45,
  positiveRating: 85,
  recentFeedback: [
    { rating: 5, message: 'Great teaching!', date: '2026-01-30' },
    { rating: 4, message: 'Very helpful', date: '2026-01-29' },
    { rating: 5, message: 'Clear explanations', date: '2026-01-28' }
  ]
};

export const adminStats = {
  totalStudents: 850,
  totalStaff: 45,
  totalTests: 156,
  totalFeedback: 423,
  pendingFeedback: 28,
  averageRating: 4.2,
  activeUsers: 782,
  systemHealth: 98
};

export const codingProblems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }
    ],
    solved: true
  },
  {
    id: 2,
    title: 'Reverse Linked List',
    difficulty: 'Medium',
    category: 'Linked List',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }
    ],
    solved: false
  }
];
