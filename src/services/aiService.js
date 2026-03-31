// ================================================
// aiService.js — SkillPath AI — NO API VERSION
// 100% Offline — Zero errors — Perfect demo!
// ================================================

// ================================================
// 1. Generate Daily Task — Hardcoded per goal
// ================================================
export async function generateTask(goal, cri) {
  const difficulty =
    cri < 30 ? "beginner" :
    cri < 60 ? "intermediate" : "advanced";

  const tasks = {
    "Full Stack Developer": {
      beginner: { skillTag: "HTML & CSS", question: "Explain the difference between div and span in HTML. When should you use each one?", correctAnswer: "block inline" },
      intermediate: { skillTag: "JavaScript", question: "Explain the difference between let, const and var in JavaScript with examples.", correctAnswer: "scope" },
      advanced: { skillTag: "React", question: "Explain the Virtual DOM in React and how it improves performance.", correctAnswer: "virtual dom" },
    },
    "Frontend Developer": {
      beginner: { skillTag: "HTML", question: "What is semantic HTML? Give 3 examples of semantic tags.", correctAnswer: "semantic" },
      intermediate: { skillTag: "CSS", question: "Explain Flexbox and how it helps in building layouts.", correctAnswer: "flexbox" },
      advanced: { skillTag: "React", question: "What are React Hooks? Explain useState and useEffect with examples.", correctAnswer: "hooks" },
    },
    "Backend Developer": {
      beginner: { skillTag: "Node.js", question: "What is Node.js and why is it used for backend development?", correctAnswer: "node" },
      intermediate: { skillTag: "Express", question: "Explain what middleware is in Express.js and give an example.", correctAnswer: "middleware" },
      advanced: { skillTag: "API Design", question: "What is REST API? Explain the HTTP methods GET, POST, PUT, DELETE.", correctAnswer: "rest api" },
    },
    "Data Analyst": {
      beginner: { skillTag: "Python", question: "What is Python and why is it popular for data analysis?", correctAnswer: "python" },
      intermediate: { skillTag: "Pandas", question: "What is a Pandas DataFrame? How do you read a CSV file using Pandas?", correctAnswer: "dataframe" },
      advanced: { skillTag: "SQL", question: "Explain the difference between INNER JOIN and LEFT JOIN in SQL with examples.", correctAnswer: "join" },
    },
    "Data Scientist": {
      beginner: { skillTag: "Python", question: "What is the difference between supervised and unsupervised learning?", correctAnswer: "supervised" },
      intermediate: { skillTag: "ML", question: "Explain overfitting in machine learning. How do you prevent it?", correctAnswer: "overfitting" },
      advanced: { skillTag: "Deep Learning", question: "What is a neural network? Explain layers, weights and activation functions.", correctAnswer: "neural network" },
    },
    "Machine Learning Engineer": {
      beginner: { skillTag: "ML Basics", question: "What is machine learning? Explain with a real-world example.", correctAnswer: "machine learning" },
      intermediate: { skillTag: "Scikit-Learn", question: "Explain the train-test split concept and why it is important.", correctAnswer: "train test" },
      advanced: { skillTag: "Model Tuning", question: "What is cross-validation? How does k-fold cross-validation work?", correctAnswer: "cross validation" },
    },
    "Python Developer": {
      beginner: { skillTag: "Python", question: "What are Python lists and dictionaries? Explain with examples.", correctAnswer: "list dict" },
      intermediate: { skillTag: "OOP", question: "Explain Object Oriented Programming concepts in Python — class, object, inheritance.", correctAnswer: "class object" },
      advanced: { skillTag: "Python Advanced", question: "What are Python decorators? Explain with a practical example.", correctAnswer: "decorator" },
    },
    "Java Developer": {
      beginner: { skillTag: "Java", question: "What is the difference between JDK, JRE and JVM in Java?", correctAnswer: "jdk jre jvm" },
      intermediate: { skillTag: "OOP Java", question: "Explain the 4 pillars of OOP — encapsulation, inheritance, polymorphism, abstraction.", correctAnswer: "oop" },
      advanced: { skillTag: "Spring Boot", question: "What is Spring Boot? How does it simplify Java backend development?", correctAnswer: "spring boot" },
    },
    "Android Developer": {
      beginner: { skillTag: "Android", question: "What is Android Studio and what language is used for Android development?", correctAnswer: "kotlin java" },
      intermediate: { skillTag: "Android UI", question: "Explain the Activity lifecycle in Android. What are the main lifecycle methods?", correctAnswer: "lifecycle" },
      advanced: { skillTag: "Firebase Android", question: "How do you integrate Firebase Authentication in an Android app?", correctAnswer: "firebase auth" },
    },
    "Flutter Developer": {
      beginner: { skillTag: "Flutter", question: "What is Flutter and what language does it use? Why is it used for mobile apps?", correctAnswer: "dart flutter" },
      intermediate: { skillTag: "Widgets", question: "What is the difference between StatelessWidget and StatefulWidget in Flutter?", correctAnswer: "stateless stateful" },
      advanced: { skillTag: "State Management", question: "What is Provider in Flutter? How does it help manage state across widgets?", correctAnswer: "provider state" },
    },
    "UI UX Designer": {
      beginner: { skillTag: "Design Basics", question: "What is the difference between UI design and UX design? Explain with examples.", correctAnswer: "ui ux" },
      intermediate: { skillTag: "Figma", question: "What is a wireframe and why is it important before designing a UI?", correctAnswer: "wireframe" },
      advanced: { skillTag: "Design Systems", question: "What is a design system? How does it help teams build consistent products?", correctAnswer: "design system" },
    },
    "DevOps Engineer": {
      beginner: { skillTag: "DevOps", question: "What is DevOps? Explain the difference between development and operations.", correctAnswer: "devops" },
      intermediate: { skillTag: "Docker", question: "What is Docker? Explain containers and how they differ from virtual machines.", correctAnswer: "docker container" },
      advanced: { skillTag: "CI/CD", question: "What is a CI/CD pipeline? Explain how it automates software deployment.", correctAnswer: "cicd pipeline" },
    },
    "Cloud Engineer": {
      beginner: { skillTag: "Cloud Basics", question: "What is cloud computing? Explain IaaS, PaaS and SaaS with examples.", correctAnswer: "cloud iaas paas saas" },
      intermediate: { skillTag: "AWS", question: "What is AWS EC2? How is it used to host applications in the cloud?", correctAnswer: "ec2 server" },
      advanced: { skillTag: "Serverless", question: "What is AWS Lambda? Explain serverless architecture and its benefits.", correctAnswer: "lambda serverless" },
    },
    "Cybersecurity Engineer": {
      beginner: { skillTag: "Security Basics", question: "What is cybersecurity? Explain the CIA triad — Confidentiality, Integrity, Availability.", correctAnswer: "cia triad" },
      intermediate: { skillTag: "Web Security", question: "What is SQL injection? How can developers prevent it?", correctAnswer: "sql injection" },
      advanced: { skillTag: "Penetration Testing", question: "What is penetration testing? Explain the steps in an ethical hacking process.", correctAnswer: "pentest" },
    },
    "Blockchain Developer": {
      beginner: { skillTag: "Blockchain", question: "What is blockchain technology? Explain how blocks are chained together.", correctAnswer: "blockchain block" },
      intermediate: { skillTag: "Smart Contracts", question: "What is a smart contract? How does it work on the Ethereum blockchain?", correctAnswer: "smart contract" },
      advanced: { skillTag: "Solidity", question: "Explain the basic structure of a Solidity smart contract with an example.", correctAnswer: "solidity contract" },
    },
    "Deep Learning Engineer": {
      beginner: { skillTag: "Deep Learning", question: "What is deep learning? How is it different from traditional machine learning?", correctAnswer: "neural network deep" },
      intermediate: { skillTag: "CNN", question: "What is a Convolutional Neural Network? How is it used in image recognition?", correctAnswer: "cnn convolutional" },
      advanced: { skillTag: "Transformers", question: "What is the Transformer architecture? How does attention mechanism work?", correctAnswer: "transformer attention" },
    },
    "Django Developer": {
      beginner: { skillTag: "Django", question: "What is Django? What makes it different from Flask?", correctAnswer: "django framework" },
      intermediate: { skillTag: "Django ORM", question: "What is Django ORM? How do you create and query a model?", correctAnswer: "orm model" },
      advanced: { skillTag: "DRF", question: "What is Django REST Framework? How do you create a REST API using DRF?", correctAnswer: "rest api drf" },
    },
  };

  const goalTasks = tasks[goal] || tasks["Full Stack Developer"];
  return goalTasks[difficulty] || goalTasks["beginner"];
}

// ================================================
// 2. Rule-Based Answer Evaluation — No AI needed!
// ================================================
function ruleBasedCheck(answer, skillTag) {
  const rules = {
    "HTML & CSS": ["div", "span", "block", "inline", "element", "tag", "style"],
    "HTML": ["tag", "semantic", "element", "attribute", "structure", "heading", "paragraph"],
    "CSS": ["flexbox", "grid", "style", "selector", "property", "margin", "padding", "layout"],
    "JavaScript": ["let", "const", "var", "scope", "function", "hoisting", "block"],
    "React": ["component", "state", "props", "hook", "virtual", "dom", "render", "usestate"],
    "Node.js": ["server", "runtime", "javascript", "backend", "npm", "module", "asynchronous"],
    "Express": ["middleware", "route", "request", "response", "server", "framework"],
    "API Design": ["get", "post", "put", "delete", "rest", "endpoint", "http", "request"],
    "Python": ["python", "list", "dictionary", "function", "class", "import", "library"],
    "Pandas": ["dataframe", "csv", "read", "column", "row", "pandas", "data"],
    "SQL": ["join", "select", "table", "query", "inner", "left", "where", "database"],
    "ML Basics": ["machine learning", "algorithm", "data", "train", "predict", "model"],
    "ML": ["model", "training", "overfitting", "accuracy", "data", "feature", "algorithm"],
    "Scikit-Learn": ["train", "test", "split", "model", "fit", "predict", "accuracy"],
    "Model Tuning": ["cross", "validation", "fold", "hyperparameter", "tune", "grid", "search", "k-fold"],
    "Deep Learning": ["neural", "layer", "weight", "activation", "network", "train"],
    "OOP": ["class", "object", "inheritance", "encapsulation", "polymorphism", "abstraction"],
    "OOP Java": ["class", "object", "inheritance", "encapsulation", "polymorphism", "abstraction"],
    "Java": ["jdk", "jre", "jvm", "java", "compile", "runtime", "bytecode"],
    "Spring Boot": ["spring", "boot", "framework", "rest", "dependency", "annotation"],
    "Android": ["android", "kotlin", "java", "studio", "activity", "app"],
    "Android UI": ["activity", "lifecycle", "oncreate", "onresume", "onpause", "ondestroy"],
    "Firebase Android": ["firebase", "auth", "authentication", "login", "google"],
    "Flutter": ["flutter", "dart", "widget", "mobile", "cross-platform", "google"],
    "Widgets": ["stateless", "stateful", "widget", "build", "context", "tree", "state"],
    "State Management": ["provider", "state", "widget", "notifier", "consumer", "listen"],
    "Design Basics": ["ui", "ux", "user", "interface", "experience", "design", "visual"],
    "Figma": ["wireframe", "prototype", "design", "frame", "layout", "figma", "mockup"],
    "Design Systems": ["system", "component", "consistent", "reusable", "guideline", "brand"],
    "DevOps": ["devops", "development", "operations", "collaboration", "automation", "deploy"],
    "Docker": ["container", "image", "dockerfile", "virtual", "isolated", "lightweight"],
    "CI/CD": ["pipeline", "continuous", "integration", "delivery", "automate", "deploy", "build"],
    "Cloud Basics": ["cloud", "iaas", "paas", "saas", "server", "infrastructure", "service"],
    "AWS": ["ec2", "instance", "server", "cloud", "aws", "virtual", "host"],
    "Serverless": ["lambda", "function", "serverless", "event", "trigger", "aws", "scale"],
    "Security Basics": ["cia", "confidentiality", "integrity", "availability", "security"],
    "Web Security": ["sql", "injection", "input", "validation", "sanitize", "query", "prevent"],
    "Penetration Testing": ["pentest", "ethical", "hacking", "vulnerability", "scan", "exploit"],
    "Blockchain": ["block", "chain", "hash", "decentralized", "ledger", "node", "transaction"],
    "Smart Contracts": ["smart", "contract", "ethereum", "solidity", "blockchain", "code"],
    "Solidity": ["solidity", "contract", "function", "mapping", "address", "variable"],
    "CNN": ["cnn", "convolutional", "filter", "pooling", "image", "feature", "layer"],
    "Transformers": ["transformer", "attention", "encoder", "decoder", "bert", "gpt"],
    "Django": ["django", "framework", "python", "mtv", "model", "template", "view"],
    "Django ORM": ["orm", "model", "query", "database", "field", "migration"],
    "DRF": ["rest", "api", "serializer", "viewset", "endpoint", "drf", "framework"],
    "Python Advanced": ["decorator", "generator", "lambda", "closure", "async", "metaclass", "wrapper"],
  };

  const keywords = rules[skillTag] || ["explain", "example", "use", "important", "because"];
  const answerLower = answer.toLowerCase();
  const matched = keywords.filter(k => answerLower.includes(k));

  if (answer.trim().length < 20) {
    return { pass: false, reason: "Answer too short — please explain more!" };
  }
  if (matched.length === 0) {
    return { pass: false, reason: `Include relevant ${skillTag} concepts in your answer.` };
  }
  return { pass: true, reason: `Good — you covered: ${matched.slice(0, 3).join(", ")}` };
}

export async function evaluateAnswer(question, answer, skillTag) {
  const ruleCheck = ruleBasedCheck(answer, skillTag);

  const len = answer.trim().length;
  const skillLevel = len > 200 ? "advanced" : len > 80 ? "intermediate" : "beginner";

  if (!ruleCheck.pass) {
    return {
      score: 0,
      feedback: `${ruleCheck.reason} Re-read the question and explain with examples.`,
      skillLevel: "beginner",
      ruleCheck: ruleCheck.reason
    };
  }

  const feedbacks = {
    "HTML & CSS": "Good understanding of HTML structure! Keep practicing layout concepts.",
    "HTML": "Nice work! Semantic HTML is important for accessibility and SEO.",
    "CSS": "Great CSS knowledge! Flexbox and Grid are essential for modern layouts.",
    "JavaScript": "Excellent! JavaScript fundamentals are key for any web developer.",
    "React": "Great React knowledge! Components and hooks are the core of React.",
    "Node.js": "Good backend understanding! Node.js is powerful for server-side development.",
    "Express": "Nice! Express.js middleware knowledge is important for API development.",
    "Python": "Excellent Python knowledge! Python is the most popular language for many careers.",
    "Pandas": "Good data analysis skills! Pandas is essential for any data role.",
    "SQL": "Strong SQL skills! Databases are used in every software application.",
    "ML": "Great ML understanding! Keep practicing with real datasets.",
    "ML Basics": "Good foundation! Machine learning is powering the future of technology.",
    "Scikit-Learn": "Nice! Scikit-learn is the go-to library for ML in Python.",
    "Model Tuning": "Excellent! Cross-validation is key to building robust ML models.",
    "Deep Learning": "Impressive deep learning knowledge! Neural networks power modern AI.",
    "Docker": "Good DevOps knowledge! Containers are used everywhere in industry today.",
    "Blockchain": "Nice blockchain understanding! Web3 is a fast-growing field.",
    "Design Basics": "Good design thinking! UI/UX is all about solving user problems.",
    "Java": "Strong Java fundamentals! JVM knowledge is important for Java developers.",
    "Android": "Great Android knowledge! Mobile development is in high demand.",
    "Flutter": "Excellent Flutter understanding! Cross-platform development saves time.",
    "Security Basics": "Good security awareness! CIA triad is the foundation of cybersecurity.",
    "Python Advanced": "Impressive! Python advanced concepts like decorators show strong mastery.",
    "OOP": "Great OOP understanding! These concepts apply to every programming language.",
    "OOP Java": "Strong Java OOP! These 4 pillars are asked in every Java interview.",
    "Spring Boot": "Excellent! Spring Boot is used in enterprise Java development worldwide.",
    "Android UI": "Good lifecycle knowledge! Activity lifecycle is a core Android concept.",
    "Firebase Android": "Great! Firebase integration is essential for modern Android apps.",
    "Widgets": "Nice Flutter knowledge! Understanding widget types is fundamental in Flutter.",
    "State Management": "Excellent! Provider is the most popular state management in Flutter.",
    "Figma": "Great UX thinking! Wireframes save hours of redesign work later.",
    "Design Systems": "Strong design knowledge! Design systems are used by top companies.",
    "DevOps": "Good DevOps understanding! Collaboration between dev and ops is key.",
    "CI/CD": "Excellent! CI/CD pipelines are used in every professional software team.",
    "Cloud Basics": "Great cloud foundation! IaaS, PaaS, SaaS are important to know.",
    "AWS": "Good AWS knowledge! EC2 is the backbone of cloud computing.",
    "Serverless": "Impressive! Serverless is the modern way to build scalable backends.",
    "Web Security": "Strong security knowledge! SQL injection is one of the top web vulnerabilities.",
    "Penetration Testing": "Excellent! Ethical hacking skills are in high demand globally.",
    "Smart Contracts": "Great blockchain knowledge! Smart contracts are the future of Web3.",
    "Solidity": "Impressive Solidity knowledge! Smart contract development is a niche skill.",
    "CNN": "Excellent! CNNs are the foundation of modern computer vision systems.",
    "Transformers": "Impressive! Transformer architecture powers GPT, BERT and modern AI.",
    "Django": "Great Django knowledge! Django powers many production web applications.",
    "Django ORM": "Nice! Django ORM makes database operations simple and Pythonic.",
    "DRF": "Excellent! Django REST Framework is the standard for Python REST APIs.",
    "API Design": "Strong API knowledge! REST principles are used in every web application.",
  };

  const feedback = feedbacks[skillTag] ||
    `Good answer on ${skillTag}! You demonstrated understanding of key concepts. Keep practicing daily to improve further.`;

  return {
    score: 1,
    feedback,
    skillLevel,
    ruleCheck: ruleCheck.reason
  };
}

// ================================================
// 3. Generate Course Roadmap — Hardcoded
// ================================================
export async function generateCourseRoadmap(courseName) {
  const lower = courseName.toLowerCase();

  if (lower.includes("python")) return [
    { step: 1, title: "Python Basics & Setup", searchQuery: "python tutorial beginners" },
    { step: 2, title: "Variables & Data Types", searchQuery: "python variables data types" },
    { step: 3, title: "Loops & Conditions", searchQuery: "python loops conditions" },
    { step: 4, title: "Functions & Modules", searchQuery: "python functions modules" },
    { step: 5, title: "Lists, Tuples & Dicts", searchQuery: "python lists tuples dictionary" },
    { step: 6, title: "OOP in Python", searchQuery: "python object oriented programming" },
    { step: 7, title: "File Handling", searchQuery: "python file handling" },
    { step: 8, title: "NumPy & Pandas", searchQuery: "numpy pandas python" },
    { step: 9, title: "Mini Project", searchQuery: "python beginner project" },
    { step: 10, title: "Job Ready Tips", searchQuery: "python developer portfolio" },
  ];

  if (lower.includes("react")) return [
    { step: 1, title: "HTML & CSS Basics", searchQuery: "html css basics" },
    { step: 2, title: "JavaScript ES6+", searchQuery: "javascript es6 tutorial" },
    { step: 3, title: "React Introduction", searchQuery: "react js tutorial beginners" },
    { step: 4, title: "Components & Props", searchQuery: "react components props" },
    { step: 5, title: "State & useState Hook", searchQuery: "react usestate hook" },
    { step: 6, title: "useEffect & Lifecycle", searchQuery: "react useeffect tutorial" },
    { step: 7, title: "React Router", searchQuery: "react router tutorial" },
    { step: 8, title: "API Calls in React", searchQuery: "react fetch api tutorial" },
    { step: 9, title: "Firebase + React", searchQuery: "firebase react tutorial" },
    { step: 10, title: "React Project", searchQuery: "react project tutorial" },
  ];

  if (lower.includes("machine learning") || lower.includes("ml")) return [
    { step: 1, title: "Python for ML", searchQuery: "python machine learning" },
    { step: 2, title: "NumPy & Pandas", searchQuery: "numpy pandas tutorial" },
    { step: 3, title: "Data Visualization", searchQuery: "matplotlib seaborn tutorial" },
    { step: 4, title: "Statistics Basics", searchQuery: "statistics machine learning" },
    { step: 5, title: "Scikit-Learn Intro", searchQuery: "scikit learn tutorial" },
    { step: 6, title: "Supervised Learning", searchQuery: "supervised learning tutorial" },
    { step: 7, title: "Unsupervised Learning", searchQuery: "unsupervised learning tutorial" },
    { step: 8, title: "Model Evaluation", searchQuery: "model evaluation machine learning" },
    { step: 9, title: "ML Project", searchQuery: "machine learning project python" },
    { step: 10, title: "ML Deployment", searchQuery: "deploy ml model flask" },
  ];

  if (lower.includes("java")) return [
    { step: 1, title: "Java Basics", searchQuery: "java tutorial beginners" },
    { step: 2, title: "OOP Concepts", searchQuery: "java oop tutorial" },
    { step: 3, title: "Arrays & Collections", searchQuery: "java collections tutorial" },
    { step: 4, title: "Exception Handling", searchQuery: "java exception handling" },
    { step: 5, title: "File I/O", searchQuery: "java file io tutorial" },
    { step: 6, title: "Multithreading", searchQuery: "java multithreading tutorial" },
    { step: 7, title: "JDBC & Database", searchQuery: "java jdbc database tutorial" },
    { step: 8, title: "Spring Boot Basics", searchQuery: "spring boot tutorial" },
    { step: 9, title: "REST API with Spring", searchQuery: "spring boot rest api" },
    { step: 10, title: "Java Project", searchQuery: "java project tutorial" },
  ];

  if (lower.includes("flutter")) return [
    { step: 1, title: "Dart Basics", searchQuery: "dart tutorial beginners" },
    { step: 2, title: "Flutter Setup", searchQuery: "flutter setup tutorial" },
    { step: 3, title: "Flutter Widgets", searchQuery: "flutter widgets tutorial" },
    { step: 4, title: "Stateless vs Stateful", searchQuery: "flutter stateless stateful widget" },
    { step: 5, title: "Navigation & Routing", searchQuery: "flutter navigation tutorial" },
    { step: 6, title: "State Management", searchQuery: "flutter provider tutorial" },
    { step: 7, title: "Firebase & Flutter", searchQuery: "flutter firebase tutorial" },
    { step: 8, title: "API Integration", searchQuery: "flutter api integration" },
    { step: 9, title: "Flutter Project", searchQuery: "flutter app project tutorial" },
    { step: 10, title: "Play Store Deploy", searchQuery: "flutter publish play store" },
  ];

  if (lower.includes("node") || lower.includes("express")) return [
    { step: 1, title: "JavaScript Basics", searchQuery: "javascript tutorial beginners" },
    { step: 2, title: "Node.js Setup", searchQuery: "nodejs setup tutorial" },
    { step: 3, title: "Express Framework", searchQuery: "express js tutorial" },
    { step: 4, title: "REST API Design", searchQuery: "rest api nodejs tutorial" },
    { step: 5, title: "MongoDB & Mongoose", searchQuery: "mongodb mongoose tutorial" },
    { step: 6, title: "Authentication JWT", searchQuery: "jwt authentication nodejs" },
    { step: 7, title: "Middleware & Error Handling", searchQuery: "express middleware tutorial" },
    { step: 8, title: "File Uploads", searchQuery: "nodejs file upload tutorial" },
    { step: 9, title: "Backend Project", searchQuery: "nodejs backend project tutorial" },
    { step: 10, title: "Deployment", searchQuery: "deploy nodejs app render" },
  ];

  if (lower.includes("sql") || lower.includes("database")) return [
    { step: 1, title: "Database Basics", searchQuery: "database tutorial beginners" },
    { step: 2, title: "SQL Fundamentals", searchQuery: "sql tutorial beginners" },
    { step: 3, title: "SELECT & WHERE", searchQuery: "sql select where tutorial" },
    { step: 4, title: "JOINs & Relations", searchQuery: "sql joins tutorial" },
    { step: 5, title: "GROUP BY & Aggregates", searchQuery: "sql group by aggregate" },
    { step: 6, title: "Subqueries", searchQuery: "sql subqueries tutorial" },
    { step: 7, title: "Indexing & Optimization", searchQuery: "sql indexing optimization" },
    { step: 8, title: "MySQL / PostgreSQL", searchQuery: "postgresql tutorial" },
    { step: 9, title: "NoSQL & MongoDB", searchQuery: "mongodb nosql tutorial" },
    { step: 10, title: "Database Project", searchQuery: "database project sql tutorial" },
  ];

  if (lower.includes("docker") || lower.includes("devops") || lower.includes("kubernetes")) return [
    { step: 1, title: "Linux Basics", searchQuery: "linux command line tutorial" },
    { step: 2, title: "Git & GitHub", searchQuery: "git github tutorial" },
    { step: 3, title: "Docker Fundamentals", searchQuery: "docker tutorial beginners" },
    { step: 4, title: "Docker Compose", searchQuery: "docker compose tutorial" },
    { step: 5, title: "Kubernetes Basics", searchQuery: "kubernetes tutorial beginners" },
    { step: 6, title: "CI/CD Pipeline", searchQuery: "cicd pipeline tutorial" },
    { step: 7, title: "AWS Fundamentals", searchQuery: "aws tutorial beginners" },
    { step: 8, title: "Terraform Basics", searchQuery: "terraform tutorial beginners" },
    { step: 9, title: "Monitoring", searchQuery: "prometheus grafana monitoring" },
    { step: 10, title: "DevOps Project", searchQuery: "devops project tutorial" },
  ];

  if (lower.includes("django") || lower.includes("flask")) return [
    { step: 1, title: "Python Basics", searchQuery: "python tutorial beginners" },
    { step: 2, title: "Django Setup", searchQuery: "django tutorial beginners" },
    { step: 3, title: "Models & Database", searchQuery: "django models database" },
    { step: 4, title: "Views & URLs", searchQuery: "django views urls tutorial" },
    { step: 5, title: "Templates", searchQuery: "django templates tutorial" },
    { step: 6, title: "Forms & Validation", searchQuery: "django forms tutorial" },
    { step: 7, title: "Authentication", searchQuery: "django authentication tutorial" },
    { step: 8, title: "REST API DRF", searchQuery: "django rest framework tutorial" },
    { step: 9, title: "Django Project", searchQuery: "django project tutorial" },
    { step: 10, title: "Deployment", searchQuery: "deploy django app heroku" },
  ];

  if (lower.includes("android") || lower.includes("kotlin")) return [
    { step: 1, title: "Kotlin Basics", searchQuery: "kotlin tutorial beginners" },
    { step: 2, title: "Android Studio Setup", searchQuery: "android studio setup tutorial" },
    { step: 3, title: "UI Layouts & Views", searchQuery: "android ui layout tutorial" },
    { step: 4, title: "Activities & Intents", searchQuery: "android activities intents" },
    { step: 5, title: "RecyclerView", searchQuery: "android recyclerview tutorial" },
    { step: 6, title: "Firebase for Android", searchQuery: "firebase android tutorial" },
    { step: 7, title: "Retrofit API", searchQuery: "android retrofit api tutorial" },
    { step: 8, title: "Room Database", searchQuery: "android room database tutorial" },
    { step: 9, title: "Android Project", searchQuery: "android app project tutorial" },
    { step: 10, title: "Play Store Deploy", searchQuery: "publish app google play store" },
  ];

  if (lower.includes("data science") || lower.includes("data analysis")) return [
    { step: 1, title: "Python Basics", searchQuery: "python tutorial beginners" },
    { step: 2, title: "NumPy & Pandas", searchQuery: "numpy pandas tutorial" },
    { step: 3, title: "Data Cleaning", searchQuery: "data cleaning pandas python" },
    { step: 4, title: "SQL for Analysis", searchQuery: "sql data analysis tutorial" },
    { step: 5, title: "Matplotlib & Seaborn", searchQuery: "matplotlib seaborn tutorial" },
    { step: 6, title: "Statistics Basics", searchQuery: "statistics for data science" },
    { step: 7, title: "Power BI / Tableau", searchQuery: "power bi tutorial beginners" },
    { step: 8, title: "ML Basics", searchQuery: "machine learning python beginners" },
    { step: 9, title: "Data Project", searchQuery: "data analysis project python" },
    { step: 10, title: "Portfolio", searchQuery: "data analyst portfolio projects" },
  ];

  // Default for any other course
  return Array.from({ length: 10 }, (_, i) => ({
    step: i + 1,
    title: `${courseName} — Step ${i + 1}`,
    searchQuery: `${courseName} tutorial step ${i + 1}`
  }));
}

// ================================================
// 4. Score Resume — Smart rule-based scoring
// ================================================
export async function scoreResume(resumeText, targetRole) {
  const text = resumeText.toLowerCase();
  const len = resumeText.length;

  let score = 40;
  let atsScore = 35;
  const strengths = [];
  const improvements = [];

  if (text.includes("experience") || text.includes("work")) {
    score += 10; atsScore += 10;
    strengths.push("Work experience section present");
  }
  if (text.includes("project") || text.includes("built")) {
    score += 10; atsScore += 8;
    strengths.push("Projects section included — great for freshers!");
  }
  if (text.includes("skill") || text.includes("technology")) {
    score += 8; atsScore += 10;
    strengths.push("Technical skills clearly listed");
  }
  if (text.includes("education") || text.includes("degree") || text.includes("b.e") || text.includes("b.tech")) {
    score += 5; atsScore += 5;
    strengths.push("Education details present");
  }
  if (text.includes("github") || text.includes("linkedin") || text.includes("portfolio")) {
    score += 7;
    strengths.push("Online profiles linked — good for visibility");
  }
  if (len > 500) {
    score += 5;
    strengths.push("Resume has sufficient content");
  }

  if (!text.includes("%") && !text.includes("increased") && !text.includes("improved")) {
    improvements.push("Add quantified achievements — e.g. 'Improved app speed by 30%'");
  }
  if (!text.includes("github")) improvements.push("Add your GitHub profile link");
  if (!text.includes("linkedin")) improvements.push("Add your LinkedIn profile link");
  if (len < 300) improvements.push("Resume too short — add more project and skill details");
  if (!text.includes(targetRole.toLowerCase().split(" ")[0])) {
    improvements.push(`Add keywords related to ${targetRole} for better ATS matching`);
  }

  score = Math.min(score, 92);
  atsScore = Math.min(atsScore, 88);

  if (strengths.length === 0) strengths.push("Resume submitted successfully");
  if (improvements.length === 0) improvements.push("Keep updating with new projects and skills");

  const verdict = score >= 75
    ? `Strong resume for ${targetRole}! Minor tweaks will make it even better.`
    : score >= 55
    ? `Decent resume for ${targetRole}. Add more projects and quantify achievements.`
    : `Resume needs improvement for ${targetRole}. Focus on projects, skills and GitHub.`;

  return { overallScore: score, atsScore, strengths, improvements, verdict };
}

// ================================================
// 5. Generate Roadmap — 25 Career Paths
// ================================================
export async function generateRoadmap(goal) {
  const goalLower = (goal || "").toLowerCase();

  const keywordMap = [
    { keywords: ["full stack", "fullstack", "mern", "mean", "web dev"], key: "fullstack" },
    { keywords: ["data anal", "analyst"], key: "dataanalysis" },
    { keywords: ["data scien", "scientist"], key: "datascience" },
    { keywords: ["machine learn", "ml engineer"], key: "ml" },
    { keywords: ["deep learn", "neural", "ai engineer"], key: "deeplearning" },
    { keywords: ["python developer", "python dev"], key: "python" },
    { keywords: ["java developer", "java dev", "spring"], key: "java" },
    { keywords: ["android", "kotlin"], key: "android" },
    { keywords: ["ios developer", "swift"], key: "ios" },
    { keywords: ["flutter", "dart"], key: "flutter" },
    { keywords: ["react native"], key: "reactnative" },
    { keywords: ["frontend", "front end", "react developer"], key: "frontend" },
    { keywords: ["backend", "back end", "node developer"], key: "backend" },
    { keywords: ["django", "flask"], key: "django" },
    { keywords: ["ui ux", "ux designer", "ui designer"], key: "uiux" },
    { keywords: ["cyber", "security", "ethical hack"], key: "cyber" },
    { keywords: ["devops", "docker", "kubernetes"], key: "devops" },
    { keywords: ["cloud", "aws", "azure", "gcp"], key: "cloud" },
    { keywords: ["blockchain", "web3", "solidity"], key: "blockchain" },
    { keywords: ["game dev", "unity", "unreal"], key: "gamedev" },
    { keywords: ["embedded", "iot", "arduino"], key: "embedded" },
    { keywords: ["database", "dba", "sql developer"], key: "database" },
    { keywords: ["nlp", "natural language"], key: "nlp" },
    { keywords: ["computer vision", "opencv"], key: "computervision" },
    { keywords: ["salesforce", "crm"], key: "salesforce" },
  ];

  const roadmaps = {
    fullstack: [
      { title: "HTML & CSS Basics", videoSearch: "html css basics tutorial" },
      { title: "JavaScript Fundamentals", videoSearch: "javascript fundamentals tutorial" },
      { title: "React.js Basics", videoSearch: "react js tutorial beginners" },
      { title: "Node.js & Express", videoSearch: "nodejs express tutorial" },
      { title: "MongoDB Database", videoSearch: "mongodb tutorial beginners" },
      { title: "REST API Development", videoSearch: "rest api nodejs tutorial" },
      { title: "Firebase Integration", videoSearch: "firebase react tutorial" },
      { title: "Git & GitHub", videoSearch: "git github tutorial beginners" },
      { title: "Deployment & Hosting", videoSearch: "deploy react app vercel" },
      { title: "Full Stack Project", videoSearch: "full stack project tutorial" },
    ],
    dataanalysis: [
      { title: "Python Basics", videoSearch: "python tutorial beginners" },
      { title: "NumPy & Pandas", videoSearch: "numpy pandas tutorial" },
      { title: "Data Cleaning", videoSearch: "data cleaning pandas python" },
      { title: "SQL for Data Analysis", videoSearch: "sql data analysis tutorial" },
      { title: "Matplotlib & Seaborn", videoSearch: "matplotlib seaborn tutorial" },
      { title: "Statistics Fundamentals", videoSearch: "statistics for data science" },
      { title: "Excel & Power BI", videoSearch: "power bi tutorial beginners" },
      { title: "Machine Learning Basics", videoSearch: "machine learning python beginners" },
      { title: "Data Analysis Project", videoSearch: "data analysis project python" },
      { title: "Job Ready Portfolio", videoSearch: "data analyst portfolio projects" },
    ],
    datascience: [
      { title: "Python Basics", videoSearch: "python tutorial beginners" },
      { title: "NumPy & Pandas", videoSearch: "numpy pandas tutorial" },
      { title: "Data Visualization", videoSearch: "matplotlib seaborn tutorial" },
      { title: "SQL & Databases", videoSearch: "sql tutorial beginners" },
      { title: "Statistics & Probability", videoSearch: "statistics probability data science" },
      { title: "Machine Learning", videoSearch: "machine learning scikit learn tutorial" },
      { title: "Feature Engineering", videoSearch: "feature engineering machine learning" },
      { title: "Model Evaluation", videoSearch: "model evaluation metrics machine learning" },
      { title: "Data Science Project", videoSearch: "data science project python" },
      { title: "Job Ready Portfolio", videoSearch: "data scientist portfolio tips" },
    ],
    ml: [
      { title: "Python for ML", videoSearch: "python machine learning tutorial" },
      { title: "NumPy & Pandas", videoSearch: "numpy pandas tutorial" },
      { title: "Statistics & Math", videoSearch: "statistics machine learning" },
      { title: "Scikit-Learn Basics", videoSearch: "scikit learn tutorial" },
      { title: "Supervised Learning", videoSearch: "supervised learning tutorial" },
      { title: "Unsupervised Learning", videoSearch: "unsupervised learning tutorial" },
      { title: "Deep Learning Basics", videoSearch: "deep learning beginners" },
      { title: "TensorFlow & Keras", videoSearch: "tensorflow keras tutorial" },
      { title: "ML Project", videoSearch: "machine learning project tutorial" },
      { title: "ML Deployment", videoSearch: "deploy machine learning model" },
    ],
    deeplearning: [
      { title: "Python for ML", videoSearch: "python machine learning tutorial" },
      { title: "NumPy & Pandas", videoSearch: "numpy pandas tutorial" },
      { title: "Neural Networks Basics", videoSearch: "neural networks tutorial beginners" },
      { title: "TensorFlow Basics", videoSearch: "tensorflow tutorial beginners" },
      { title: "Keras API", videoSearch: "keras tutorial deep learning" },
      { title: "CNN Image Recognition", videoSearch: "cnn convolutional neural network tutorial" },
      { title: "RNN & LSTM", videoSearch: "rnn lstm tutorial python" },
      { title: "NLP Basics", videoSearch: "nlp natural language processing tutorial" },
      { title: "Deep Learning Project", videoSearch: "deep learning project tutorial" },
      { title: "Model Deployment", videoSearch: "deploy deep learning model flask" },
    ],
    python: [
      { title: "Python Basics", videoSearch: "python tutorial beginners" },
      { title: "Data Structures", videoSearch: "python data structures tutorial" },
      { title: "OOP in Python", videoSearch: "python object oriented programming" },
      { title: "File Handling & Modules", videoSearch: "python file handling tutorial" },
      { title: "NumPy & Pandas", videoSearch: "numpy pandas python tutorial" },
      { title: "Web Scraping", videoSearch: "python web scraping beautifulsoup" },
      { title: "Flask Web Framework", videoSearch: "flask tutorial python beginners" },
      { title: "Database with Python", videoSearch: "python sqlite database tutorial" },
      { title: "Python Project", videoSearch: "python project tutorial beginners" },
      { title: "Job Ready Portfolio", videoSearch: "python developer portfolio tips" },
    ],
    java: [
      { title: "Java Basics", videoSearch: "java tutorial beginners" },
      { title: "OOP Concepts", videoSearch: "java oop tutorial" },
      { title: "Data Structures", videoSearch: "java data structures tutorial" },
      { title: "Collections Framework", videoSearch: "java collections tutorial" },
      { title: "Exception Handling", videoSearch: "java exception handling tutorial" },
      { title: "File I/O & Streams", videoSearch: "java file io tutorial" },
      { title: "Spring Boot Basics", videoSearch: "spring boot tutorial beginners" },
      { title: "REST APIs with Spring", videoSearch: "spring boot rest api tutorial" },
      { title: "Java Project", videoSearch: "java spring boot project tutorial" },
      { title: "Job Ready", videoSearch: "java developer interview tips" },
    ],
    android: [
      { title: "Kotlin Basics", videoSearch: "kotlin tutorial beginners" },
      { title: "Android Studio Setup", videoSearch: "android studio setup tutorial" },
      { title: "UI Layouts & Views", videoSearch: "android ui layout tutorial" },
      { title: "Activities & Intents", videoSearch: "android activities intents tutorial" },
      { title: "RecyclerView", videoSearch: "android recyclerview tutorial" },
      { title: "Firebase for Android", videoSearch: "firebase android tutorial" },
      { title: "REST API with Retrofit", videoSearch: "android retrofit api tutorial" },
      { title: "Room Database", videoSearch: "android room database tutorial" },
      { title: "Android Project", videoSearch: "android app project tutorial" },
      { title: "Play Store Deploy", videoSearch: "publish app google play store" },
    ],
    ios: [
      { title: "Swift Basics", videoSearch: "swift tutorial beginners" },
      { title: "Xcode Setup", videoSearch: "xcode setup ios development" },
      { title: "UIKit Fundamentals", videoSearch: "uikit tutorial ios" },
      { title: "SwiftUI Basics", videoSearch: "swiftui tutorial beginners" },
      { title: "Navigation & Views", videoSearch: "swiftui navigation tutorial" },
      { title: "Data Persistence", videoSearch: "ios core data tutorial" },
      { title: "Networking & APIs", videoSearch: "ios api networking tutorial" },
      { title: "Firebase for iOS", videoSearch: "firebase ios swift tutorial" },
      { title: "iOS Project", videoSearch: "ios app project tutorial swift" },
      { title: "App Store Deploy", videoSearch: "publish app app store tutorial" },
    ],
    flutter: [
      { title: "Dart Basics", videoSearch: "dart tutorial beginners" },
      { title: "Flutter Setup", videoSearch: "flutter setup tutorial" },
      { title: "Flutter Widgets", videoSearch: "flutter widgets tutorial" },
      { title: "State Management", videoSearch: "flutter state management provider" },
      { title: "Navigation & Routing", videoSearch: "flutter navigation tutorial" },
      { title: "Firebase & Flutter", videoSearch: "flutter firebase tutorial" },
      { title: "REST API Integration", videoSearch: "flutter api integration tutorial" },
      { title: "Local Storage", videoSearch: "flutter local storage tutorial" },
      { title: "Flutter Project", videoSearch: "flutter app project tutorial" },
      { title: "Play Store Deploy", videoSearch: "flutter publish play store" },
    ],
    reactnative: [
      { title: "JavaScript ES6+", videoSearch: "javascript es6 tutorial" },
      { title: "React Basics", videoSearch: "react tutorial beginners" },
      { title: "React Native Setup", videoSearch: "react native setup tutorial" },
      { title: "Components & Props", videoSearch: "react native components tutorial" },
      { title: "Navigation", videoSearch: "react native navigation tutorial" },
      { title: "State Management", videoSearch: "react native redux tutorial" },
      { title: "Firebase Integration", videoSearch: "react native firebase tutorial" },
      { title: "API Integration", videoSearch: "react native api fetch tutorial" },
      { title: "React Native Project", videoSearch: "react native project tutorial" },
      { title: "App Store Deploy", videoSearch: "react native publish app store" },
    ],
    frontend: [
      { title: "HTML5 Basics", videoSearch: "html5 tutorial beginners" },
      { title: "CSS3 & Flexbox", videoSearch: "css3 flexbox tutorial" },
      { title: "JavaScript ES6+", videoSearch: "javascript es6 tutorial" },
      { title: "React.js Fundamentals", videoSearch: "react js tutorial beginners" },
      { title: "State Management", videoSearch: "redux tutorial react" },
      { title: "TypeScript Basics", videoSearch: "typescript tutorial beginners" },
      { title: "Tailwind CSS", videoSearch: "tailwind css tutorial" },
      { title: "Testing with Jest", videoSearch: "jest testing react tutorial" },
      { title: "Frontend Project", videoSearch: "react frontend project tutorial" },
      { title: "Job Ready", videoSearch: "frontend developer interview tips" },
    ],
    backend: [
      { title: "Node.js Basics", videoSearch: "nodejs tutorial beginners" },
      { title: "Express.js Framework", videoSearch: "express js tutorial" },
      { title: "REST API Design", videoSearch: "rest api design tutorial" },
      { title: "MongoDB & Mongoose", videoSearch: "mongodb mongoose tutorial" },
      { title: "SQL & PostgreSQL", videoSearch: "postgresql tutorial beginners" },
      { title: "Authentication JWT", videoSearch: "jwt authentication nodejs tutorial" },
      { title: "Caching with Redis", videoSearch: "redis tutorial nodejs" },
      { title: "API Security", videoSearch: "api security best practices" },
      { title: "Backend Project", videoSearch: "nodejs backend project tutorial" },
      { title: "Job Ready", videoSearch: "backend developer interview tips" },
    ],
    django: [
      { title: "Python Basics", videoSearch: "python tutorial beginners" },
      { title: "Django Setup", videoSearch: "django tutorial beginners" },
      { title: "Models & Database", videoSearch: "django models database tutorial" },
      { title: "Views & URLs", videoSearch: "django views urls tutorial" },
      { title: "Templates", videoSearch: "django templates tutorial" },
      { title: "Forms & Validation", videoSearch: "django forms tutorial" },
      { title: "Authentication", videoSearch: "django authentication tutorial" },
      { title: "REST API with DRF", videoSearch: "django rest framework tutorial" },
      { title: "Django Project", videoSearch: "django project tutorial" },
      { title: "Deployment", videoSearch: "deploy django app heroku" },
    ],
    uiux: [
      { title: "Design Fundamentals", videoSearch: "ui ux design fundamentals" },
      { title: "Figma Basics", videoSearch: "figma tutorial beginners" },
      { title: "Color & Typography", videoSearch: "color theory typography design" },
      { title: "Wireframing", videoSearch: "wireframing tutorial figma" },
      { title: "Prototyping", videoSearch: "prototyping figma tutorial" },
      { title: "User Research", videoSearch: "user research ux design" },
      { title: "Design Systems", videoSearch: "design system figma" },
      { title: "Mobile UI Design", videoSearch: "mobile ui design tutorial" },
      { title: "Portfolio Project", videoSearch: "ui ux portfolio project" },
      { title: "Job Ready", videoSearch: "ui ux designer job tips" },
    ],
    cyber: [
      { title: "Networking Basics", videoSearch: "networking basics tutorial" },
      { title: "Linux Fundamentals", videoSearch: "linux tutorial beginners" },
      { title: "Python for Security", videoSearch: "python cybersecurity tutorial" },
      { title: "Ethical Hacking Basics", videoSearch: "ethical hacking tutorial beginners" },
      { title: "Network Scanning", videoSearch: "nmap network scanning tutorial" },
      { title: "Web Vulnerabilities", videoSearch: "web application security owasp" },
      { title: "Penetration Testing", videoSearch: "penetration testing tutorial" },
      { title: "Cryptography Basics", videoSearch: "cryptography basics tutorial" },
      { title: "Security Tools Kali", videoSearch: "kali linux tools tutorial" },
      { title: "CEH Certification Prep", videoSearch: "ceh certification preparation" },
    ],
    devops: [
      { title: "Linux Basics", videoSearch: "linux command line tutorial" },
      { title: "Git & GitHub", videoSearch: "git github tutorial" },
      { title: "Docker Fundamentals", videoSearch: "docker tutorial beginners" },
      { title: "Kubernetes Basics", videoSearch: "kubernetes tutorial beginners" },
      { title: "CI/CD Pipeline", videoSearch: "cicd pipeline tutorial jenkins" },
      { title: "AWS Fundamentals", videoSearch: "aws tutorial beginners" },
      { title: "Terraform Basics", videoSearch: "terraform tutorial beginners" },
      { title: "Monitoring Prometheus", videoSearch: "prometheus grafana monitoring tutorial" },
      { title: "DevOps Project", videoSearch: "devops project tutorial" },
      { title: "Job Ready", videoSearch: "devops engineer interview tips" },
    ],
    cloud: [
      { title: "Cloud Basics", videoSearch: "cloud computing tutorial beginners" },
      { title: "AWS Core Services", videoSearch: "aws core services tutorial" },
      { title: "EC2 & S3", videoSearch: "aws ec2 s3 tutorial" },
      { title: "IAM & Security", videoSearch: "aws iam security tutorial" },
      { title: "Lambda Functions", videoSearch: "aws lambda tutorial" },
      { title: "RDS Database", videoSearch: "aws rds database tutorial" },
      { title: "Containerization ECS", videoSearch: "aws ecs docker tutorial" },
      { title: "CloudFormation", videoSearch: "aws cloudformation tutorial" },
      { title: "Cloud Project", videoSearch: "aws cloud project tutorial" },
      { title: "AWS Certification Prep", videoSearch: "aws solutions architect exam prep" },
    ],
    blockchain: [
      { title: "Blockchain Basics", videoSearch: "blockchain tutorial beginners" },
      { title: "Cryptography Basics", videoSearch: "cryptography blockchain tutorial" },
      { title: "Bitcoin & Ethereum", videoSearch: "bitcoin ethereum tutorial" },
      { title: "Solidity Basics", videoSearch: "solidity tutorial beginners" },
      { title: "Smart Contracts", videoSearch: "smart contracts tutorial solidity" },
      { title: "Web3.js", videoSearch: "web3 js tutorial beginners" },
      { title: "DeFi Concepts", videoSearch: "defi tutorial beginners" },
      { title: "NFT Development", videoSearch: "nft development tutorial solidity" },
      { title: "Blockchain Project", videoSearch: "blockchain project tutorial" },
      { title: "Job Ready", videoSearch: "blockchain developer job tips" },
    ],
    gamedev: [
      { title: "Game Dev Basics", videoSearch: "game development tutorial beginners" },
      { title: "Unity Setup", videoSearch: "unity tutorial beginners" },
      { title: "C# Basics", videoSearch: "csharp tutorial beginners" },
      { title: "2D Game Development", videoSearch: "unity 2d game tutorial" },
      { title: "3D Game Development", videoSearch: "unity 3d game tutorial" },
      { title: "Physics & Collisions", videoSearch: "unity physics tutorial" },
      { title: "UI & Menus", videoSearch: "unity ui tutorial" },
      { title: "Audio Integration", videoSearch: "unity audio tutorial" },
      { title: "Complete Game Project", videoSearch: "unity complete game tutorial" },
      { title: "Publish on Steam", videoSearch: "publish game steam tutorial" },
    ],
    embedded: [
      { title: "Electronics Basics", videoSearch: "electronics basics tutorial" },
      { title: "C Programming", videoSearch: "c programming tutorial beginners" },
      { title: "Arduino Basics", videoSearch: "arduino tutorial beginners" },
      { title: "Sensors & Actuators", videoSearch: "arduino sensors tutorial" },
      { title: "Raspberry Pi", videoSearch: "raspberry pi tutorial beginners" },
      { title: "IoT Basics", videoSearch: "iot tutorial beginners" },
      { title: "MQTT Protocol", videoSearch: "mqtt protocol iot tutorial" },
      { title: "Embedded C Advanced", videoSearch: "embedded c programming tutorial" },
      { title: "IoT Project", videoSearch: "iot project tutorial arduino" },
      { title: "Job Ready", videoSearch: "embedded systems engineer tips" },
    ],
    database: [
      { title: "Database Basics", videoSearch: "database tutorial beginners" },
      { title: "SQL Fundamentals", videoSearch: "sql tutorial beginners" },
      { title: "MySQL Deep Dive", videoSearch: "mysql tutorial complete" },
      { title: "PostgreSQL", videoSearch: "postgresql tutorial beginners" },
      { title: "Database Design", videoSearch: "database design tutorial" },
      { title: "Indexing & Optimization", videoSearch: "sql indexing optimization tutorial" },
      { title: "NoSQL & MongoDB", videoSearch: "mongodb nosql tutorial" },
      { title: "Redis Caching", videoSearch: "redis tutorial beginners" },
      { title: "Database Project", videoSearch: "database project tutorial sql" },
      { title: "DBA Job Ready", videoSearch: "database administrator tips" },
    ],
    nlp: [
      { title: "Python Basics", videoSearch: "python tutorial beginners" },
      { title: "Text Processing", videoSearch: "text processing python nltk" },
      { title: "NLTK & SpaCy", videoSearch: "nltk spacy tutorial python" },
      { title: "Regular Expressions", videoSearch: "regex tutorial python" },
      { title: "Word Embeddings", videoSearch: "word embeddings word2vec tutorial" },
      { title: "Transformers Basics", videoSearch: "transformers huggingface tutorial" },
      { title: "Sentiment Analysis", videoSearch: "sentiment analysis python tutorial" },
      { title: "Text Classification", videoSearch: "text classification nlp tutorial" },
      { title: "NLP Project", videoSearch: "nlp project python tutorial" },
      { title: "Job Ready", videoSearch: "nlp engineer job tips" },
    ],
    computervision: [
      { title: "Python Basics", videoSearch: "python tutorial beginners" },
      { title: "NumPy & Matplotlib", videoSearch: "numpy matplotlib tutorial" },
      { title: "OpenCV Basics", videoSearch: "opencv python tutorial beginners" },
      { title: "Image Processing", videoSearch: "image processing opencv python" },
      { title: "Object Detection YOLO", videoSearch: "object detection yolo tutorial" },
      { title: "CNN Architecture", videoSearch: "cnn architecture tutorial" },
      { title: "Transfer Learning", videoSearch: "transfer learning tensorflow tutorial" },
      { title: "Face Recognition", videoSearch: "face recognition python tutorial" },
      { title: "CV Project", videoSearch: "computer vision project tutorial" },
      { title: "Job Ready", videoSearch: "computer vision engineer tips" },
    ],
    salesforce: [
      { title: "Salesforce Basics", videoSearch: "salesforce tutorial beginners" },
      { title: "CRM Fundamentals", videoSearch: "crm salesforce tutorial" },
      { title: "Salesforce Admin", videoSearch: "salesforce admin tutorial" },
      { title: "Apex Programming", videoSearch: "salesforce apex tutorial" },
      { title: "Lightning Components", videoSearch: "salesforce lightning tutorial" },
      { title: "SOQL & SOSL", videoSearch: "salesforce soql tutorial" },
      { title: "Salesforce Flows", videoSearch: "salesforce flow tutorial" },
      { title: "Integration Basics", videoSearch: "salesforce integration tutorial" },
      { title: "Salesforce Project", videoSearch: "salesforce project tutorial" },
      { title: "Salesforce Certification", videoSearch: "salesforce certification prep" },
    ],
  };

  for (const { keywords, key } of keywordMap) {
    for (const kw of keywords) {
      if (goalLower.includes(kw)) return roadmaps[key];
    }
  }

  return [
    { title: `${goal} Fundamentals`, videoSearch: `${goal} tutorial beginners` },
    { title: `${goal} Core Concepts`, videoSearch: `${goal} core concepts` },
    { title: `${goal} Tools & Setup`, videoSearch: `${goal} tools setup` },
    { title: `${goal} Basics Practice`, videoSearch: `${goal} practice` },
    { title: `${goal} Intermediate`, videoSearch: `${goal} intermediate tutorial` },
    { title: `${goal} Advanced`, videoSearch: `${goal} advanced tutorial` },
    { title: `${goal} Real Project`, videoSearch: `${goal} project tutorial` },
    { title: `${goal} Best Practices`, videoSearch: `${goal} best practices` },
    { title: `${goal} Interview Prep`, videoSearch: `${goal} interview questions` },
    { title: `${goal} Job Ready`, videoSearch: `${goal} job ready portfolio` },
  ];
}