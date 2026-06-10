export function JsonLd() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Soban Ahmad",
        url: "https://sobanahmad.dev",
        jobTitle: "Software Engineer",
        description:
            "Full-stack engineer building production-grade platforms, AI-powered systems, and SaaS applications for founders who need someone who can actually build it.",
        sameAs: [
            "https://www.linkedin.com/in/soban-ahmad-malik/",
            "https://github.com/Schwifty101",
        ],
        knowsAbout: [
            "Software Engineering",
            "Full-Stack Development",
            "AI & Automation",
            "SaaS Platforms",
            "Technical Consulting",
            "React",
            "Next.js",
            "Node.js",
            "TypeScript",
            "Python",
        ],
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "Bachelor of Science in Software Engineering",
        },
    }

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Soban Ahmad",
        url: "https://sobanahmad.dev",
        description:
            "Soban Ahmad — Full-stack engineer building production-grade platforms, AI-powered systems, and SaaS applications.",
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
