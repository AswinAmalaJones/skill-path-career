/* eslint-disable */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const STEP_VIDEOS = {
  "HTML & CSS Basics": [
    { title: "Introduction to HTML", videoId: "qz0aGYrrlhU" },
    { title: "HTML Tags & Elements", videoId: "PlxWf493en4" },
    { title: "CSS Basics & Selectors", videoId: "1Rs2ND1ryYc" },
    { title: "Flexbox Layout", videoId: "fYq5PXgSsbE" },
  ],
  "JavaScript Fundamentals": [
    { title: "JS Intro & Variables", videoId: "W6NZfCO5SIk" },
    { title: "Functions & Loops", videoId: "xUI5Tsl2JpY" },
    { title: "Arrays & Objects", videoId: "oigfaZ5ApsM" },
    { title: "DOM Manipulation", videoId: "5fb2aPlgoys" },
  ],
  "React.js Basics": [
    { title: "React Introduction", videoId: "Ke90Tje7VS0" },
    { title: "Components & Props", videoId: "jLS0TkAHvRg" },
    { title: "useState Hook", videoId: "O6P86uwfdR0" },
    { title: "useEffect Hook", videoId: "0ZJgIjIuY7U" },
  ],
  "Node.js & Express": [
    { title: "Node.js Intro", videoId: "fBNz5xF-Kx4" },
    { title: "Express Framework", videoId: "SccSCuHhOw0" },
    { title: "REST API Building", videoId: "pKd0Rpw7O48" },
    { title: "Middleware Basics", videoId: "lY6icfhap2o" },
  ],
  "MongoDB Database": [
    { title: "MongoDB Intro", videoId: "ofme2o29ngU" },
    { title: "CRUD Operations", videoId: "fbYExfeFsV0" },
    { title: "Mongoose ODM", videoId: "DZBGEVgL2eE" },
    { title: "Schema Design", videoId: "leNCfU5hyYs" },
  ],
  "REST API Development": [
    { title: "REST Concepts", videoId: "pKd0Rpw7O48" },
    { title: "HTTP Methods", videoId: "iYM2zFP3Zn0" },
    { title: "API Authentication JWT", videoId: "mbsmsi7l3r4" },
    { title: "API Testing Postman", videoId: "VywxIQ2ZXw4" },
  ],
  "Firebase Integration": [
    { title: "Firebase Setup", videoId: "9zdvpNGtc-Y" },
    { title: "Firestore Database", videoId: "4d-gIPGzmK4" },
    { title: "Firebase Auth", videoId: "PKwu15ldZ7k" },
    { title: "Firebase Hosting", videoId: "mmmej1gqHhA" },
  ],
  "Git & GitHub": [
    { title: "Git Basics", videoId: "RGOj5yH7evk" },
    { title: "Branching & Merging", videoId: "e2IbNHi4uCI" },
    { title: "GitHub Workflow", videoId: "nhNq2kIvi9s" },
    { title: "Pull Requests", videoId: "For9VtrQx58" },
  ],
  "Deployment & Hosting": [
    { title: "Deploy to Vercel", videoId: "sFcTTno5bpc" },
    { title: "Netlify Deployment", videoId: "4H7qAoFyKpQ" },
    { title: "Environment Variables", videoId: "17UVejOw3zA" },
    { title: "CI/CD Basics", videoId: "R8_veQiYBjI" },
  ],
  "Full Stack Project": [
    { title: "Project Planning", videoId: "ysEN5RaKOlA" },
    { title: "Frontend Setup", videoId: "Ke90Tje7VS0" },
    { title: "Backend Integration", videoId: "fBNz5xF-Kx4" },
    { title: "Deploy Full Stack App", videoId: "sFcTTno5bpc" },
  ],
  "Python Basics": [
    { title: "Python Introduction", videoId: "rfscVS0vtbw" },
    { title: "Variables & Data Types", videoId: "khKv-8q7YmY" },
    { title: "Loops & Conditions", videoId: "6iF8Xb7Z3wQ" },
    { title: "Functions & Modules", videoId: "9Os0o3wzS_I" },
  ],
  "NumPy & Pandas": [
    { title: "NumPy Basics", videoId: "QUT1VHiLmmI" },
    { title: "Pandas DataFrames", videoId: "vmEHCJofslg" },
    { title: "Data Cleaning", videoId: "bDhvCp3_lYw" },
    { title: "Data Wrangling", videoId: "r-uOLxNrNk8" },
  ],
  "Data Cleaning": [
    { title: "Missing Values", videoId: "bDhvCp3_lYw" },
    { title: "Handling Outliers", videoId: "UrT0T4xVgTQ" },
    { title: "Data Type Conversion", videoId: "vmEHCJofslg" },
    { title: "Feature Engineering Basics", videoId: "6WDFfaYtN6s" },
  ],
  "SQL for Data Analysis": [
    { title: "SQL Basics", videoId: "HXV3zeQKqGY" },
    { title: "SELECT & WHERE", videoId: "p3qvj9hO_Bo" },
    { title: "JOINs Explained", videoId: "9yeOJ0ZMUYw" },
    { title: "GROUP BY & Aggregates", videoId: "7mRb37BUHkU" },
  ],
  "Matplotlib & Seaborn": [
    { title: "Matplotlib Basics", videoId: "3Xc3CA655Y4" },
    { title: "Seaborn Charts", videoId: "6GUZXRef2D0" },
    { title: "Data Visualization Tips", videoId: "aHaOIvR00So" },
    { title: "Dashboard Charts", videoId: "TmhQCQr_AAk" },
  ],
  "Statistics Fundamentals": [
    { title: "Descriptive Statistics", videoId: "xxpc-HPKN28" },
    { title: "Probability Basics", videoId: "uzkc-qNVoOk" },
    { title: "Normal Distribution", videoId: "rzFX5NWojp0" },
    { title: "Hypothesis Testing", videoId: "VK-sDv2_TfQ" },
  ],
  "Excel & Power BI": [
    { title: "Excel for Data Analysis", videoId: "Vl0H-qTclOg" },
    { title: "Pivot Tables", videoId: "qu-AK0Tyn1A" },
    { title: "Power BI Introduction", videoId: "TmhQCQr_AAk" },
    { title: "Power BI Dashboards", videoId: "AGrl-H87pRU" },
  ],
  "Machine Learning Basics": [
    { title: "ML Introduction", videoId: "GwIo3gDZCVQ" },
    { title: "Supervised Learning", videoId: "4qVRBYAdLAo" },
    { title: "Scikit-Learn Basics", videoId: "0B5eIE_1vpU" },
    { title: "Model Evaluation", videoId: "85dtiMz9tSo" },
  ],
  "Data Analysis Project": [
    { title: "Project Planning", videoId: "r-uOLxNrNk8" },
    { title: "EDA Techniques", videoId: "xi0vhXFPegw" },
    { title: "Insights & Visualization", videoId: "3Xc3CA655Y4" },
    { title: "Presenting Results", videoId: "aHaOIvR00So" },
  ],
  "Job Ready Portfolio": [
    { title: "Portfolio Building Tips", videoId: "oYp5XuElUOA" },
    { title: "GitHub Profile Setup", videoId: "G-EGDH50hGE" },
    { title: "LinkedIn Optimization", videoId: "BcwYBl_MARA" },
    { title: "Interview Preparation", videoId: "HG68Ymazo18" },
  ],
  "Python for ML": [
    { title: "Python for ML Setup", videoId: "rfscVS0vtbw" },
    { title: "NumPy Arrays", videoId: "QUT1VHiLmmI" },
    { title: "Pandas for ML", videoId: "vmEHCJofslg" },
    { title: "Data Preprocessing", videoId: "bDhvCp3_lYw" },
  ],
  "Statistics & Math": [
    { title: "Linear Algebra Basics", videoId: "fNk_zzaMoSs" },
    { title: "Statistics for ML", videoId: "xxpc-HPKN28" },
    { title: "Probability Theory", videoId: "uzkc-qNVoOk" },
    { title: "Calculus Intuition", videoId: "WUvTyaaNkzM" },
  ],
  "Scikit-Learn Basics": [
    { title: "Scikit-Learn Intro", videoId: "0B5eIE_1vpU" },
    { title: "Train Test Split", videoId: "85dtiMz9tSo" },
    { title: "Linear Regression", videoId: "4qVRBYAdLAo" },
    { title: "Classification Models", videoId: "PkO4_iHZmCU" },
  ],
  "Supervised Learning": [
    { title: "Linear Regression", videoId: "4qVRBYAdLAo" },
    { title: "Logistic Regression", videoId: "PkO4_iHZmCU" },
    { title: "Decision Trees", videoId: "7VeUPuFGJHk" },
    { title: "Random Forest", videoId: "J4Wdy0Wc_xQ" },
  ],
  "Unsupervised Learning": [
    { title: "K-Means Clustering", videoId: "4b5d3muPQmA" },
    { title: "PCA Dimensionality Reduction", videoId: "FgakZw6K1QQ" },
    { title: "DBSCAN Clustering", videoId: "RDZUdRSDOok" },
    { title: "Association Rules", videoId: "h_sTRr2J4-4" },
  ],
  "Deep Learning Basics": [
    { title: "Neural Networks Intro", videoId: "aircAruvnKk" },
    { title: "Activation Functions", videoId: "m0pIlLfpXWE" },
    { title: "Backpropagation", videoId: "Ilg3gGewQ5U" },
    { title: "Keras Introduction", videoId: "qFJeN9V1ZsI" },
  ],
  "TensorFlow & Keras": [
    { title: "TensorFlow Basics", videoId: "tPYj3fTB-2U" },
    { title: "Keras Sequential API", videoId: "qFJeN9V1ZsI" },
    { title: "Training Models", videoId: "aircAruvnKk" },
    { title: "Model Evaluation", videoId: "85dtiMz9tSo" },
  ],
  "ML Project": [
    { title: "Project Scoping", videoId: "GwIo3gDZCVQ" },
    { title: "Data Collection", videoId: "r-uOLxNrNk8" },
    { title: "Model Building", videoId: "0B5eIE_1vpU" },
    { title: "Results Presentation", videoId: "aHaOIvR00So" },
  ],
  "ML Deployment": [
    { title: "Flask for ML APIs", videoId: "Z1RJmh_OqeA" },
    { title: "Model Serialization", videoId: "4qVRBYAdLAo" },
    { title: "Deploy to Cloud", videoId: "sFcTTno5bpc" },
    { title: "Docker for ML", videoId: "fqMOX6JJhGo" },
  ],
  "Java Basics": [
    { title: "Java Introduction", videoId: "eIrMbAQSU34" },
    { title: "Variables & Data Types", videoId: "RRubcjpTkks" },
    { title: "Conditionals & Loops", videoId: "6T_HgnjoYwM" },
    { title: "Methods & Arrays", videoId: "A74TOX803D0" },
  ],
  "OOP Concepts": [
    { title: "Classes & Objects", videoId: "pTB0EiLXUC8" },
    { title: "Inheritance", videoId: "Zs342ePFvRI" },
    { title: "Polymorphism", videoId: "D_MExMSATs4" },
    { title: "Encapsulation & Abstraction", videoId: "1ejQLmQbO0A" },
  ],
  "Spring Boot Basics": [
    { title: "Spring Boot Intro", videoId: "vtPkZShUb3o" },
    { title: "REST Controllers", videoId: "9SGDpanrc8U" },
    { title: "JPA & Hibernate", videoId: "8SGI_XS5OPw" },
    { title: "Spring Security", videoId: "her_7pa0vrg" },
  ],
  "Dart Basics": [
    { title: "Dart Introduction", videoId: "Ej_Pcr4uT0Y" },
    { title: "Variables & Types", videoId: "5xlEDM4LOaE" },
    { title: "OOP in Dart", videoId: "F3JuuYuOUK4" },
    { title: "Async & Futures", videoId: "1ukSR1GRtMU" },
  ],
  "Flutter Widgets": [
    { title: "Widget Tree", videoId: "b_sQ9bMltGU" },
    { title: "Layout Widgets", videoId: "RJEnTRBxaSg" },
    { title: "Stateless Widget", videoId: "wFn5Q7xHMQ0" },
    { title: "Stateful Widget", videoId: "p5dkB3Mrxdo" },
  ],
  "State Management": [
    { title: "setState Basics", videoId: "3tm-R7ymwhc" },
    { title: "Provider Pattern", videoId: "MkFjtCov62g" },
    { title: "Riverpod Intro", videoId: "vtGCteFkn_4" },
    { title: "Best Practices", videoId: "kDEflMYTFlk" },
  ],
  "Linux Basics": [
    { title: "Linux Introduction", videoId: "sWbUDq4S6Y8" },
    { title: "File System & Commands", videoId: "ZtqBQ68cfJc" },
    { title: "Permissions & Users", videoId: "jwnvKOjmtCk" },
    { title: "Shell Scripting", videoId: "GtovwKDemnI" },
  ],
  "Docker Fundamentals": [
    { title: "Docker Introduction", videoId: "fqMOX6JJhGo" },
    { title: "Images & Containers", videoId: "pg19Z8LL06w" },
    { title: "Docker Compose", videoId: "SXwC9fSwct8" },
    { title: "Docker Networking", videoId: "bKFMS5C4CG0" },
  ],
  "Kubernetes Basics": [
    { title: "Kubernetes Introduction", videoId: "X48VuDVv0do" },
    { title: "Pods & Deployments", videoId: "s_o8dwzRlu4" },
    { title: "Services & Ingress", videoId: "T4Z7visMM4E" },
    { title: "ConfigMaps & Secrets", videoId: "FAnQTgr04mU" },
  ],
  "CI/CD Pipeline": [
    { title: "CI/CD Concepts", videoId: "R8_veQiYBjI" },
    { title: "GitHub Actions", videoId: "R8_veQiYBjI" },
    { title: "Jenkins Basics", videoId: "LFDrDnKPOTg" },
    { title: "Automated Testing", videoId: "8SE9yLBO0Y4" },
  ],
  "AWS Core Services": [
    { title: "AWS Overview", videoId: "ZHx-4LHdUgY" },
    { title: "IAM & Security", videoId: "3hLmDS179YE" },
    { title: "VPC Networking", videoId: "7XnpdZF_COA" },
    { title: "S3 Storage", videoId: "e6w9LwZJFIA" },
  ],
  "Networking Basics": [
    { title: "Networking Intro", videoId: "3QhU9jd03a0" },
    { title: "IP & Subnetting", videoId: "5WfiTHiU4x8" },
    { title: "TCP/IP Protocol", videoId: "PpsEAQwn4Fk" },
    { title: "DNS & HTTP", videoId: "AlkDbnbv7dk" },
  ],
  "Ethical Hacking Basics": [
    { title: "Ethical Hacking Intro", videoId: "3Kq1MIfTWCE" },
    { title: "Reconnaissance", videoId: "hQKJTR6XSBE" },
    { title: "Vulnerability Scanning", videoId: "1vQ423GHMKI" },
    { title: "Basic Exploitation", videoId: "3Kq1MIfTWCE" },
  ],
  "Kotlin Basics": [
    { title: "Kotlin Introduction", videoId: "F9UC9DY-vIU" },
    { title: "Variables & Functions", videoId: "mEmvgIoFBpE" },
    { title: "OOP in Kotlin", videoId: "9MdMjbVU-jk" },
    { title: "Kotlin Collections", videoId: "F9UC9DY-vIU" },
  ],
  "UI Layouts & Views": [
    { title: "XML Layouts", videoId: "Hyz2UrHAOEI" },
    { title: "ConstraintLayout", videoId: "XamMbnzI5vE" },
    { title: "RecyclerView", videoId: "Mc0XT58A1Z4" },
    { title: "Navigation Component", videoId: "IEO2X5OU3MY" },
  ],
  "Design Fundamentals": [
    { title: "Design Principles", videoId: "c9Wg6Cb7YAU" },
    { title: "Color Theory", videoId: "AvgCkHrcj8w" },
    { title: "Typography Basics", videoId: "QrNi9FmdlxY" },
    { title: "Visual Hierarchy", videoId: "qZy6ZMW4guc" },
  ],
  "Figma Basics": [
    { title: "Figma Introduction", videoId: "FTFaQWZBqQ8" },
    { title: "Frames & Components", videoId: "ZpsVWVxt_5U" },
    { title: "Prototyping", videoId: "iBkXf6u8htI" },
    { title: "Auto Layout", videoId: "NrKX46DzkGQ" },
  ],
  "Blockchain Basics": [
    { title: "Blockchain Introduction", videoId: "SSo_EIwHSd4" },
    { title: "How Bitcoin Works", videoId: "bBC-nXj3Ng4" },
    { title: "Ethereum Basics", videoId: "jxLkbJozKbY" },
    { title: "Smart Contracts Overview", videoId: "ZE2HxTmxfrI" },
  ],
  "Solidity Basics": [
    { title: "Solidity Introduction", videoId: "gyMwXuJrbJQ" },
    { title: "Variables & Functions", videoId: "M576WGiDBdQ" },
    { title: "Smart Contract Deployment", videoId: "coQ5dg8wM2o" },
    { title: "ERC20 Token", videoId: "8rpir_ZSK1g" },
  ],
  "Django Setup": [
    { title: "Django Introduction", videoId: "rHux0gMZ3Eg" },
    { title: "Project Structure", videoId: "F5mRW0jo-U4" },
    { title: "URLs & Views", videoId: "Rp5vd34d-z4" },
    { title: "Templates System", videoId: "m0CrFggnouw" },
  ],
  "REST API with DRF": [
    { title: "DRF Introduction", videoId: "TmsD3tT08Fk" },
    { title: "Serializers", videoId: "EyZp8-kBCKs" },
    { title: "ViewSets & Routers", videoId: "c708Nf0cHrs" },
    { title: "JWT Authentication", videoId: "Hh_kiZTTBr0" },
  ],
  "Data Visualization": [
    { title: "Matplotlib Charts", videoId: "3Xc3CA655Y4" },
    { title: "Seaborn Statistical Plots", videoId: "6GUZXRef2D0" },
    { title: "Plotly Interactive Charts", videoId: "GGL6U0k8WYA" },
    { title: "Dashboard with Dash", videoId: "hSPmj7mK6ng" },
  ],
  "Feature Engineering": [
    { title: "Feature Selection", videoId: "6WDFfaYtN6s" },
    { title: "Encoding Categorical Data", videoId: "s3bkAoE80TI" },
    { title: "Scaling & Normalization", videoId: "0SBP1HWDZ5A" },
    { title: "Handling Imbalanced Data", videoId: "Hw38M-9dfXk" },
  ],
  "Model Evaluation": [
    { title: "Evaluation Metrics", videoId: "85dtiMz9tSo" },
    { title: "Cross Validation", videoId: "fSytzGwwBVw" },
    { title: "Bias Variance Tradeoff", videoId: "EuBBz3bI-aA" },
    { title: "ROC Curves", videoId: "4jRBRDbJemM" },
  ],
  "Text Processing": [
    { title: "Text Preprocessing", videoId: "CMrHM8a3hqw" },
    { title: "Tokenization & Stemming", videoId: "FLZvOKSCkxY" },
    { title: "Stop Words & TF-IDF", videoId: "hXNbFNCgPfY" },
    { title: "Regular Expressions", videoId: "K8L6KVGG-7o" },
  ],
  "Sentiment Analysis": [
    { title: "Sentiment Analysis Intro", videoId: "M7SWr5xObkA" },
    { title: "VADER Sentiment", videoId: "R9TP2nDJCCM" },
    { title: "ML Sentiment Model", videoId: "PkO4_iHZmCU" },
    { title: "BERT for Sentiment", videoId: "xI0HHN5XKDo" },
  ],
  "OpenCV Basics": [
    { title: "OpenCV Introduction", videoId: "oXlwWbU8l2o" },
    { title: "Image Operations", videoId: "WQeoO7MI0Bs" },
    { title: "Edge Detection", videoId: "sRFM5IEqR2w" },
    { title: "Object Detection Basics", videoId: "01sAkU_NvOY" },
  ],
  "CNN Architecture": [
    { title: "CNN Introduction", videoId: "QzY57FaENXg" },
    { title: "Conv Layers & Pooling", videoId: "YRhxdVk_sIs" },
    { title: "Famous CNN Models", videoId: "DAOcjicFr1Y" },
    { title: "Transfer Learning", videoId: "LsdxvjLWkIY" },
  ],
  "Arduino Basics": [
    { title: "Arduino Introduction", videoId: "09zfRaLEAXg" },
    { title: "Digital & Analog I/O", videoId: "fJWR7dBuc18" },
    { title: "Sensors & Actuators", videoId: "LDRxo6g8Tv8" },
    { title: "Arduino Projects", videoId: "zJ3c5sFZEMI" },
  ],
  "IoT Basics": [
    { title: "IoT Introduction", videoId: "h0gWfVCSGQQ" },
    { title: "MQTT Protocol", videoId: "EIxdz-2rhLs" },
    { title: "Raspberry Pi Basics", videoId: "BpJCAafw2qE" },
    { title: "IoT Cloud Integration", videoId: "yQMVSiSwGNE" },
  ],
};

const SINGLE_VIDEO_MAP = {
  "python": "rfscVS0vtbw", "data": "r-uOLxNrNk8", "pandas": "vmEHCJofslg",
  "numpy": "QUT1VHiLmmI", "sql": "HXV3zeQKqGY", "machine learning": "GwIo3gDZCVQ",
  "deep learning": "aircAruvnKk", "tensorflow": "tPYj3fTB-2U", "html": "qz0aGYrrlhU",
  "css": "1Rs2ND1ryYc", "javascript": "W6NZfCO5SIk", "react": "Ke90Tje7VS0",
  "node": "fBNz5xF-Kx4", "firebase": "9zdvpNGtc-Y", "git": "RGOj5yH7evk",
  "docker": "fqMOX6JJhGo", "aws": "ZHx-4LHdUgY", "java": "eIrMbAQSU34",
  "django": "rHux0gMZ3Eg", "flutter": "1ukSR1GRtMU", "kotlin": "F9UC9DY-vIU",
  "swift": "comQ1-x2a1Q", "blockchain": "SSo_EIwHSd4", "figma": "FTFaQWZBqQ8",
  "cybersecurity": "hXSFdwILwhE", "linux": "sWbUDq4S6Y8", "kubernetes": "X48VuDVv0do",
  "mongodb": "ofme2o29ngU", "statistics": "xxpc-HPKN28", "excel": "Vl0H-qTclOg",
  "power bi": "TmhQCQr_AAk", "nlp": "CMrHM8a3hqw", "opencv": "oXlwWbU8l2o",
  "arduino": "09zfRaLEAXg", "iot": "h0gWfVCSGQQ", "salesforce": "tSaywMGiTQw",
  "unity": "gB1F9G0JXOo", "solidity": "gyMwXuJrbJQ",
};

const getSingleVideoId = (title) => {
  const lower = (title || "").toLowerCase();
  for (const [key, vid] of Object.entries(SINGLE_VIDEO_MAP)) {
    if (lower.includes(key)) return vid;
  }
  return "rfscVS0vtbw";
};

function WatchTimer({ onUnlock, alreadyWatched }) {
  const REQUIRED_SECONDS = 180;
  const [seconds, setSeconds] = useState(0);
  const [unlocked, setUnlocked] = useState(alreadyWatched);

  useEffect(() => {
    if (unlocked || alreadyWatched) return;
    const interval = setInterval(() => {
      setSeconds(s => {
        const next = s + 1;
        if (next >= REQUIRED_SECONDS) { setUnlocked(true); clearInterval(interval); }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [unlocked, alreadyWatched]);

  const progress = Math.min((seconds / REQUIRED_SECONDS) * 100, 100);
  const minsLeft = Math.max(0, Math.floor((REQUIRED_SECONDS - seconds) / 60));
  const secsLeft = Math.max(0, (REQUIRED_SECONDS - seconds) % 60);

  if (alreadyWatched || unlocked) {
    return (
      <button className="primary-btn" onClick={onUnlock} style={{ marginTop: "0" }}>
        ✅ Mark as Watched — Earn +2 CRI
      </button>
    );
  }

  return (
    <div style={{ marginTop: "8px" }}>
      <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "6px", overflow: "hidden", marginBottom: "10px" }}>
        <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #6C63FF, #00d4aa)", borderRadius: "6px", transition: "width 1s linear" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>⏱️ Watch 3 mins to unlock</span>
        <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: "600" }}>
          {minsLeft}:{secsLeft.toString().padStart(2, "0")} remaining
        </span>
      </div>
      <button className="primary-btn" disabled style={{ marginTop: "0", opacity: 0.4, cursor: "not-allowed" }}>
        🔒 Watch {minsLeft}:{secsLeft.toString().padStart(2, "0")} more to unlock
      </button>
    </div>
  );
}

function LearnPage() {
  const { index } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyWatched, setAlreadyWatched] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [watchedSubVideos, setWatchedSubVideos] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { navigate("/"); return; }
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        const roadmap = data.roadmap || [];
        const currentStep = roadmap[parseInt(index)];
        if (!currentStep) { navigate("/roadmap"); return; }
        setStep(currentStep);
        const videos = data.watchedVideos || [];
        if (videos.includes(`roadmap_${index}`)) setAlreadyWatched(true);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [navigate, index]);

  const handleWatched = async () => {
    const user = auth.currentUser;
    if (!user || alreadyWatched) return;
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    const data = snap.data();
    await updateDoc(userRef, {
      watchedVideos: arrayUnion(`roadmap_${index}`),
      cri: Math.min((data.cri || 0) + 2, 100)
    });
    setAlreadyWatched(true);
  };

  if (loading || !step) return <div className="loading-screen">Loading...</div>;

  const stepVideos = STEP_VIDEOS[step.title] || null;
  const activeVideo = stepVideos ? stepVideos[activeVideoIndex] : null;
  const singleVideoId = !stepVideos ? getSingleVideoId(step.videoSearch || step.title) : null;

  return (
    <div className="app-wrapper">
      <div className="top-bar">
        <h2>{step.title}</h2>
        <button className="back-btn" onClick={() => navigate("/roadmap")}>← Roadmap</button>
      </div>

      {stepVideos ? (
        <>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            {stepVideos.map((vid, i) => (
              <button key={i} onClick={() => setActiveVideoIndex(i)} style={{
                padding: "8px 16px", borderRadius: "20px",
                border: activeVideoIndex === i ? "2px solid #6C63FF" : "1px solid rgba(255,255,255,0.1)",
                background: activeVideoIndex === i ? "rgba(108,99,255,0.2)" : "rgba(255,255,255,0.03)",
                color: activeVideoIndex === i ? "#a78bfa" : "rgba(255,255,255,0.5)",
                cursor: "pointer", fontSize: "13px",
                fontWeight: activeVideoIndex === i ? "700" : "400",
                transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px"
              }}>
                {watchedSubVideos.includes(i) ? "✅" : `${i + 1}.`} {vid.title}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "6px" }}>
            <span>📺 {activeVideo.title}</span>
            <span>{watchedSubVideos.length}/{stepVideos.length} topics watched</span>
          </div>
          <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ width: `${(watchedSubVideos.length / stepVideos.length) * 100}%`, height: "100%", background: "linear-gradient(90deg, #6C63FF, #00d4aa)", transition: "width 0.5s ease" }} />
          </div>

          <div className="learn-video-wrap">
            <iframe key={activeVideoIndex} src={`https://www.youtube.com/embed/${activeVideo.videoId}`} title={activeVideo.title} allowFullScreen className="learn-iframe" />
          </div>

          <div className="learn-actions">
            <WatchTimer
              alreadyWatched={watchedSubVideos.includes(activeVideoIndex) || alreadyWatched}
              onUnlock={async () => {
                const newWatched = [...new Set([...watchedSubVideos, activeVideoIndex])];
                setWatchedSubVideos(newWatched);
                if (newWatched.length === stepVideos.length && !alreadyWatched) {
                  await handleWatched();
                }
                if (activeVideoIndex < stepVideos.length - 1) {
                  setActiveVideoIndex(activeVideoIndex + 1);
                }
              }}
            />
            {alreadyWatched && (
              <div className="watched-badge">✅ All topics completed! +2 CRI earned 🎉</div>
            )}
            <button className="primary-btn" style={{ marginTop: "12px", background: "rgba(255,255,255,0.06)", boxShadow: "none", border: "1px solid rgba(255,255,255,0.1)" }} onClick={() => navigate(`/quiz/${index}`)}>
              🧠 Take Quiz
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="learn-video-wrap">
            <iframe src={`https://www.youtube.com/embed/${singleVideoId}`} title={step.title} allowFullScreen className="learn-iframe" />
          </div>
          <div className="learn-actions">
            {!alreadyWatched ? (
              <WatchTimer alreadyWatched={false} onUnlock={handleWatched} />
            ) : (
              <div className="watched-badge">✅ Video Completed! +2 CRI earned</div>
            )}
            <button className="primary-btn" style={{ marginTop: "12px", background: "rgba(255,255,255,0.06)", boxShadow: "none", border: "1px solid rgba(255,255,255,0.1)" }} onClick={() => navigate(`/quiz/${index}`)}>
              🧠 Take Quiz
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default LearnPage;