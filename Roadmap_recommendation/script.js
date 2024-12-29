document.getElementById("generateButton").addEventListener("click", () => {
    const topic = document.getElementById("topicInput").value.trim();
    const roadmapList = document.getElementById("roadmapList");
    const roadmapSection = document.getElementById("roadmapSection");
    const videoList = document.getElementById("videoList");
    const youtubeSection = document.getElementById("youtubeSection");

    // Clear previous content
    roadmapList.innerHTML = "";
    videoList.innerHTML = "";
    roadmapSection.style.display = "none";
    youtubeSection.style.display = "none";

    if (!topic) {
        roadmapList.innerHTML = '<li class="list-group-item text-danger">Please enter a valid topic.</li>';
        roadmapSection.style.display = "block";
        return;
    }

    // Predefined subtopics
    const predefinedSubtopics = {
        "Machine Learning": [
            "Supervised Learning",
            "Unsupervised Learning",
            "Reinforcement Learning",
            "Neural Networks",
            "Decision Trees",
            "Support Vector Machines (SVM)",
            "Feature Engineering",
            "Model Evaluation Metrics",
            "Hyperparameter Tuning",
            "Deep Learning"
        ],
        "Web Development": [
            "HTML & CSS Basics",
            "JavaScript Essentials",
            "Frontend Frameworks (React, Angular)",
            "Backend Development (Node.js, Django)",
            "Database Integration",
            "RESTful APIs",
            "Version Control with Git",
            "Responsive Design",
            "Testing & Debugging",
            "Deployment & Hosting"
        ],
        "Data Science": [
            "Introduction to Data Science",
            "Python for Data Analysis",
            "Data Cleaning",
            "Data Visualization",
            "Statistics for Data Science",
            "Machine Learning Algorithms",
            "Time Series Analysis",
            "Natural Language Processing",
            "Big Data Concepts",
            "Deploying ML Models"
        ],
        "Cybersecurity": [
            "Introduction to Cybersecurity",
            "Network Security Basics",
            "Cryptography",
            "Web Application Security",
            "Incident Response",
            "Penetration Testing",
            "Malware Analysis",
            "Cloud Security",
            "Ethical Hacking",
            "Security Compliance"
        ],
        "Artificial Intelligence": [
            "AI Fundamentals",
            "Search Algorithms",
            "Knowledge Representation",
            "Machine Learning in AI",
            "Natural Language Understanding",
            "Computer Vision",
            "AI Ethics",
            "Generative Models",
            "Robotics",
            "AI in Industry"
        ],
        "Blockchain": [
            "Blockchain Basics",
            "Cryptographic Hash Functions",
            "Consensus Algorithms",
            "Smart Contracts",
            "Ethereum Basics",
            "Decentralized Applications (dApps)",
            "Blockchain Security",
            "Use Cases of Blockchain",
            "Tokenomics",
            "Blockchain Development Tools"
        ],
        "Cloud Computing": [
            "Introduction to Cloud Computing",
            "Types of Cloud Services (IaaS, PaaS, SaaS)",
            "Cloud Deployment Models",
            "AWS Essentials",
            "Google Cloud Basics",
            "Microsoft Azure Basics",
            "Cloud Security",
            "DevOps Integration",
            "Serverless Architecture",
            "Containerization (Docker, Kubernetes)"
        ],
        "DevOps": [
            "Introduction to DevOps",
            "Version Control (Git)",
            "Continuous Integration (CI)",
            "Continuous Deployment (CD)",
            "Infrastructure as Code (IaC)",
            "Containerization with Docker",
            "Orchestration with Kubernetes",
            "Monitoring and Logging",
            "Cloud Platforms in DevOps",
            "Best Practices in DevOps"
        ],
        "Game Development": [
            "Introduction to Game Development",
            "Game Design Principles",
            "2D Game Engines (Unity, Godot)",
            "3D Game Engines (Unreal Engine)",
            "Physics in Games",
            "Artificial Intelligence in Games",
            "Level Design",
            "Game Testing",
            "Publishing Games",
            "Monetization Strategies"
        ],
        "Mobile App Development": [
            "Introduction to Mobile Apps",
            "Android Development Basics",
            "iOS Development Basics",
            "Cross-Platform Frameworks (Flutter, React Native)",
            "Mobile UI/UX Design",
            "Working with APIs",
            "App Deployment",
            "Monetization Models",
            "App Testing",
            "Advanced Features (AR, ML in Apps)"
        ]
        // Add more predefined topics here
    };

    const subtopics = predefinedSubtopics[topic] || [];
    if (subtopics.length > 0) {
        subtopics.forEach((subtopic, index) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.textContent = `${index + 1}. ${subtopic}`;
            roadmapList.appendChild(listItem);
        });
        roadmapSection.style.display = "block";
    } else {
        roadmapList.innerHTML = `<li class="list-group-item text-warning">No predefined subtopics available for "${topic}".</li>`;
        roadmapSection.style.display = "block";
    }

    // Fetch YouTube videos
    fetchYouTubeVideos(topic);
});

// Function to fetch YouTube videos
async function fetchYouTubeVideos(topic) {
    const youtubeApiKey = "AIzaSyDjU1FntU0JRZXqQ59nukK3z-5Z_995ilc"; // Replace with your API key
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(topic)}&key=${youtubeApiKey}`;

    try {
        const response = await fetch(youtubeUrl);
        const data = await response.json();

        const videoList = document.getElementById("videoList");
        const youtubeSection = document.getElementById("youtubeSection");

        if (data.items.length > 0) {
            data.items.forEach((item) => {
                const videoItem = document.createElement("li");
                videoItem.className = "list-group-item";
                videoItem.innerHTML = `
                    <h6><a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">${item.snippet.title}</a></h6>
                    <p>${item.snippet.description}</p>
                    <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}" />
                `;
                videoList.appendChild(videoItem);
            });

            youtubeSection.style.display = "block";
        } else {
            videoList.innerHTML = `<li class="list-group-item text-danger">No videos found for "${topic}".</li>`;
            youtubeSection.style.display = "block";
        }
    } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        videoList.innerHTML = `<li class="list-group-item text-danger">Failed to fetch videos. Please try again later.</li>`;
        youtubeSection.style.display = "block";
    }
}
