export function JsonLd() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Soban Ahmad",
        url: "https://sobanahmad.dev",
        jobTitle: "Software Engineer",
        description:
            "Full-stack developer specializing in modern web applications, AI/ML solutions, and cloud architecture.",
        sameAs: [
            "https://www.linkedin.com/in/soban-ahmad-malik/",
            "https://github.com/Schwifty101",
        ],
        knowsAbout: [
            "Software Engineering",
            "Full-Stack Development",
            "React",
            "Next.js",
            "Node.js",
            "TypeScript",
            "Python",
            "Artificial Intelligence",
            "Machine Learning",
            "Cloud Architecture",
        ],
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "Bachelor of Science in Software Engineering",
        },
    }

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Soban Ahmad Portfolio",
        url: "https://sobanahmad.dev",
        description:
            "Portfolio of Soban Ahmad - Full-stack developer specializing in modern web applications, AI/ML solutions, and cloud architecture.",
        author: {
            "@type": "Person",
            name: "Soban Ahmad",
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(personSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
        </>
    )
}
