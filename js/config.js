/**
 * CINEYFPV Centralised Video, Asset, and Content Configuration
 * 
 * All YouTube video IDs, official CineYFPV Framer assets, posters, client data,
 * testimonials, FAQs, and contact details are verified from https://cineyfpv.com/
 * and https://www.youtube.com/@CineYFPV.
 * 
 * To update any video or image across the homepage prototype, modify the fields below.
 */

window.CINEY_CONFIG = {
  brand: {
    name: "CINEYFPV",
    tagline: "Cinematic FPV Drone Tours for Commercial Spaces",
    description: "CINEYFPV creates continuous, single-take FPV drone fly-through films that showcase the scale, flow and character of commercial spaces across the UK.",
    logoLocal: "./images/logo.avif",
    logoRemote: "https://framerusercontent.com/images/F4XBJ4BCwQIP2HH4uY0hmAxodM.png?scale-down-to=512&width=3066&height=1484",
    favicon: "https://framerusercontent.com/images/LZQ4AimQZRH2slO7jUt2ARGpGc.png",
    ogImage: "https://framerusercontent.com/assets/8fGCvmDmulRiiHthvGNR1EkcmE.png",
    canonicalUrl: "https://cineyfpv.com/",
    phoneDisplay: "07756 074977",
    phoneHref: "tel:+447756074977",
    emailGeneral: "hello@cineyfpv.com",
    emailBookings: "bookings@cineyfpv.com",
    privacyPolicyUrl: "https://cineyfpv.com/privacy_policy",
    socials: {
      instagram: "https://www.instagram.com/cineyfpv/",
      youtube: "https://www.youtube.com/@CineYFPV"
    },
    equipment: ["DJI Avata 2", "BetaFPV Pavo 20 Pro (Propeller-guarded Cinewhoop)"]
  },

  hero: {
    // Verified YouTube Video from @CineYFPV ("Property Fly-Through Drone Tour - Tramnak Construction | CineYFPV")
    youtubeVideoId: "1x0bQfC6RDM",
    youtubeWatchUrl: "https://www.youtube.com/watch?v=1x0bQfC6RDM",
    // Verified native MP4 background stream from cineyfpv.com for instant zero-CLS cover playback & mobile fallback
    nativeVideoFallbackUrl: "https://framerusercontent.com/assets/lAPPtwOlWBxSSpLmQwWGogo5OCw.mp4",
    posterUrl: "https://framerusercontent.com/images/Q77K0JSMO5Y9btETkqZMDVKzEY.jpg?width=1920&height=1080",
    eyebrow: "CINEMATIC FPV DRONE TOURS",
    headline: "Your space deserves to be experienced.",
    subheadline: "Take clients beyond static images with seamless, cinematic drone fly-throughs that bring every space to life.",
    primaryCta: "Discuss Your Project ↗",
    secondaryCta: "Watch Our Work ▶",
    metadata: "INDOOR FPV / COMMERCIAL SPACES / CINEMATIC FILMMAKING",
    showreelVideoId: "1x0bQfC6RDM",
    floatingPanelBenefits: [
      {
        number: "01",
        title: "Show the full picture",
        description: "Connect entrances, main floors and key architectural zones in one continuous journey that reveals how your space actually flows.",
        target: "#value"
      },
      {
        number: "02",
        title: "Make every detail count",
        description: "Glide past bespoke joinery, lighting schemes and spatial transitions with precision flight planned specifically for your interior.",
        target: "#difference"
      },
      {
        number: "03",
        title: "Create content worth watching",
        description: "Deliver high-retention horizontal and vertical films purpose-built for property portals, client pitches, websites and social campaigns.",
        target: "#services"
      }
    ],
    floatingPanelPreview: {
      label: "Featured Tour — Tramnak",
      videoId: "1x0bQfC6RDM",
      posterUrl: "https://framerusercontent.com/images/Q77K0JSMO5Y9btETkqZMDVKzEY.jpg?scale-down-to=1024&width=1920&height=1080"
    }
  },

  clients: [
    {
      name: "Tramnak",
      sector: "Construction & Fit-Out",
      logo: "https://framerusercontent.com/images/hyaYbgshanU33A8OhTZjKET8A.png?scale-down-to=512&width=603&height=546"
    },
    {
      name: "Grand Affairs",
      sector: "Event Venue & Decor",
      logo: "https://framerusercontent.com/images/XUwZMArjzyONm6NYSRs2VsnYBRc.png?width=225&height=225"
    },
    {
      name: "Fitya Centre",
      sector: "Leisure & Youth Facility",
      logo: "https://framerusercontent.com/images/LZQ4AimQZRH2slO7jUt2ARGpGc.png?scale-down-to=512&width=2000&height=2000"
    },
    {
      name: "KaptureMe",
      sector: "Creative Production",
      logo: "https://framerusercontent.com/images/5y5cpf4T1cxOu4qrxZpVxRmI8g.jpg?scale-down-to=512&width=1080&height=1080"
    },
    {
      name: "Hashtag Cafe",
      sector: "Hospitality & Dining",
      logo: "https://framerusercontent.com/images/yKtg0spOmHqd0kwKDzTf0V9dQ0.png?scale-down-to=512&width=552&height=552"
    },
    {
      name: "Almaz Worktops",
      sector: "Showroom & Stone Fit-Out",
      logo: null
    }
  ],

  featuredProjects: [
    {
      id: "tramnak-construction",
      title: "Tramnak Property & Fit-Out Tour",
      client: "Tramnak",
      industry: "Construction & Commercial Fit-Out",
      duration: "Single-Take Tour",
      format: "4K 16:9 & 9:16",
      youtubeId: "1x0bQfC6RDM",
      youtubeUrl: "https://www.youtube.com/watch?v=1x0bQfC6RDM",
      nativeVideoUrl: "./videos/1x0bQfC6RDM.mp4",
      remotePreviewUrl: "https://framerusercontent.com/assets/ElocXJnxSfZZw1OCUFoYxmwuA.mp4",
      posterUrl: "https://framerusercontent.com/images/Q77K0JSMO5Y9btETkqZMDVKzEY.jpg?width=1920&height=1080",
      description: "A continuous exterior-to-interior architectural fly-through demonstrating spatial proportions, structural craftsmanship and natural light transitions across a completed development."
    },
    {
      id: "fitya-centre",
      title: "Fitya Centre Facility Fly-Through",
      client: "Fitya Centre",
      industry: "Fitness, Leisure & Community",
      duration: "One-Shot Sequence",
      format: "4K + 3D Tracked Text",
      youtubeId: "VrFpv1xkwFw",
      youtubeUrl: "https://youtu.be/VrFpv1xkwFw",
      nativeVideoUrl: "./videos/VrFpv1xkwFw.mp4",
      remotePreviewUrl: "https://framerusercontent.com/assets/4dBrkRXASYhKplb4VgN1Y9k1K0Y.mp4",
      posterUrl: "https://framerusercontent.com/images/xxdyJHc7UOsrIgCJkvU6FKUsUvg.jpg?width=1920&height=1033",
      description: "Seamless single-shot navigation connecting reception, recreational zones and training spaces into an energetic tour that shows prospective members how the entire club fits together."
    },
    {
      id: "grand-affairs",
      title: "Grand Affairs — Twilight Showcase",
      client: "Grand Affairs",
      industry: "Hospitality & Event Venues",
      duration: "Venue Showcase",
      format: "4K Cinema Grade",
      youtubeId: "gD5Xe60Gk-s",
      youtubeUrl: "https://youtu.be/gD5Xe60Gk-s",
      nativeVideoUrl: "./videos/gD5Xe60Gk-s.mp4",
      remotePreviewUrl: "https://framerusercontent.com/assets/S2TTXmTIRMo6XkVXwj4L9LyEUE.mp4",
      posterUrl: "https://framerusercontent.com/images/SZiy1gf54z9sS5s6WWQkdBiRM.jpg?width=1920&height=1080",
      description: "An atmospheric glide through bespoke event styling, floral installations and table scapes, capturing ambient lighting and venue scale before guests arrive."
    }
  ],

  additionalVerifiedVideos: [
    {
      id: "almaz-worktops",
      title: "Almaz Worktops Showroom",
      industry: "Retail & Showrooms",
      youtubeId: "BIlyCMaJNUk",
      nativeVideoUrl: "./videos/BIlyCMaJNUk.mp4",
      remotePreviewUrl: "https://framerusercontent.com/assets/ElocXJnxSfZZw1OCUFoYxmwuA.mp4",
      posterUrl: "https://framerusercontent.com/images/WbYJCCYMxyDrLfyFNyJUF143dA.jpg?width=1920&height=1080"
    },
    {
      id: "hashtag-cafe",
      title: "Hashtag Cafe Interior Tour",
      industry: "Hospitality",
      youtubeId: "5Ci659bez7w",
      nativeVideoUrl: "./videos/5Ci659bez7w.mp4",
      remotePreviewUrl: "https://framerusercontent.com/assets/4dBrkRXASYhKplb4VgN1Y9k1K0Y.mp4",
      posterUrl: "https://framerusercontent.com/images/G0pNWSEUbriyQqo7kTkIWyTY0Us.jpg?width=1920&height=1080"
    },
    {
      id: "bni-visitor-experience",
      title: "BNI B4B Visitor Experience",
      industry: "Corporate & Events",
      youtubeId: "3ql5ml77FUQ",
      nativeVideoUrl: "./videos/3ql5ml77FUQ.mp4",
      remotePreviewUrl: "https://framerusercontent.com/assets/S2TTXmTIRMo6XkVXwj4L9LyEUE.mp4",
      posterUrl: "https://framerusercontent.com/images/YO10Bmivq3U2oyXyMBxnsVQTroU.jpg?width=1920&height=1080"
    },
    {
      id: "chamigos-dalston",
      title: "Chamigos Dalston Grand Opening",
      industry: "Hospitality & Launch",
      youtubeId: "0nwOzEC-tfM",
      nativeVideoUrl: "./videos/0nwOzEC-tfM.mp4",
      remotePreviewUrl: "https://framerusercontent.com/assets/PZoTHuUZhlouhFkmvJihSKkfIVw.mp4",
      posterUrl: "https://framerusercontent.com/images/ZSraW3Mh79lShd7dVtmzPhhjY.jpg?width=1920&height=1080"
    },
    {
      id: "light-upon-light",
      title: "Light Upon Light Winter Event",
      industry: "Events & Venues",
      youtubeId: "mOa1BWUYNH8",
      nativeVideoUrl: "./videos/mOa1BWUYNH8.mp4",
      remotePreviewUrl: "https://framerusercontent.com/assets/lAPPtwOlWBxSSpLmQwWGogo5OCw.mp4",
      posterUrl: "https://framerusercontent.com/images/rjMtB8G8uaJWkRswpw9Y4di79A.jpg?width=1920&height=1080"
    }
  ],

  valueProposition: {
    videoUrl: "https://framerusercontent.com/assets/ElocXJnxSfZZw1OCUFoYxmwuA.mp4",
    posterUrl: "https://framerusercontent.com/images/Q77K0JSMO5Y9btETkqZMDVKzEY.jpg?width=1920&height=1080",
    points: [
      {
        title: "Experience the layout",
        description: "While still photography excels at framing individual corners, an FPV tour links every room, corridor and level in a single continuous movement so viewers immediately grasp spatial relationships."
      },
      {
        title: "Highlight the details",
        description: "Our compact, propeller-guarded cinema drones navigate smoothly through doorways, down staircases and around bespoke fixtures, revealing architectural finishes and ambient lighting at natural eye level."
      },
      {
        title: "Tell a more compelling story",
        description: "One well-choreographed shoot provides an anchor film for your homepage, high-retention vertical cuts for social campaigns, and a clear visual walkthrough for stakeholder presentations."
      }
    ]
  },

  industries: [
    {
      id: "commercial-fit-outs",
      title: "Commercial Fit-outs",
      description: "Document completed CAT A and CAT B interiors, joinery packages and workplace transformations to strengthen tender submissions and case studies.",
      imageUrl: "https://framerusercontent.com/images/WbYJCCYMxyDrLfyFNyJUF143dA.jpg?scale-down-to=1024&width=1920&height=1080",
      projectRef: "Almaz Worktops Fit-Out",
      target: "#contact"
    },
    {
      id: "construction-architecture",
      title: "Construction & Architecture",
      description: "Present structural scale, spatial flow and material transitions across newly handed-over developments and architectural builds.",
      imageUrl: "https://framerusercontent.com/images/Q77K0JSMO5Y9btETkqZMDVKzEY.jpg?scale-down-to=1024&width=1920&height=1080",
      projectRef: "Tramnak Construction",
      target: "#contact"
    },
    {
      id: "fitness-leisure",
      title: "Fitness & Leisure",
      description: "Fly prospective members from reception right through strength floors, studios and recovery zones so they feel the energy of the club before visiting.",
      imageUrl: "https://framerusercontent.com/images/xxdyJHc7UOsrIgCJkvU6FKUsUvg.jpg?scale-down-to=1024&width=1920&height=1033",
      projectRef: "Fitya Centre & 313 Grading",
      target: "#contact"
    },
    {
      id: "hospitality-events",
      title: "Hospitality & Events",
      description: "Showcase restaurants, cafes, hotel lounges and dressed event venues with warm, atmospheric flight paths that capture the guest experience.",
      imageUrl: "https://framerusercontent.com/images/SZiy1gf54z9sS5s6WWQkdBiRM.jpg?scale-down-to=1024&width=1920&height=1080",
      projectRef: "Grand Affairs & Hashtag Cafe",
      target: "#contact"
    },
    {
      id: "commercial-property",
      title: "Commercial Property",
      description: "Give prospective tenants, buyers and investors an immediate, transparent understanding of floorplates, access and building amenities.",
      imageUrl: "https://framerusercontent.com/images/YO10Bmivq3U2oyXyMBxnsVQTroU.jpg?scale-down-to=1024&width=1920&height=1080",
      projectRef: "BNI Commercial Venue",
      target: "#contact"
    },
    {
      id: "retail-showrooms",
      title: "Retail & Showrooms",
      description: "Guide customers through flagship stores, stone & kitchen showrooms and dealership floors with smooth, close-proximity camera movement.",
      imageUrl: "https://framerusercontent.com/images/ZSraW3Mh79lShd7dVtmzPhhjY.jpg?scale-down-to=1024&width=1920&height=1080",
      projectRef: "Chamigos & Almaz Showroom",
      target: "#contact"
    }
  ],

  services: [
    {
      number: "01",
      title: "Indoor FPV Fly-throughs",
      description: "Seamless flights showcasing the scale, flow and character of physical spaces.",
      detail: "Using lightweight, ducted cinewhoop drones, we weave cleanly through doorways, tight corridors and multi-level interiors in one continuous take.",
      videoUrl: "https://framerusercontent.com/assets/4dBrkRXASYhKplb4VgN1Y9k1K0Y.mp4",
      posterUrl: "https://framerusercontent.com/images/G0pNWSEUbriyQqo7kTkIWyTY0Us.jpg?scale-down-to=1024&width=1920&height=1080",
      deliverables: ["Continuous single-take tour", "Full raw & graded masters", "Location path planning"]
    },
    {
      number: "02",
      title: "Commercial Project Films",
      description: "Visually compelling footage of completed fit-outs, construction work and architectural projects.",
      detail: "Combine exterior aerial context with uninterrupted interior transitions to document handovers, pitch portfolios and architectural case studies.",
      videoUrl: "https://framerusercontent.com/assets/ElocXJnxSfZZw1OCUFoYxmwuA.mp4",
      posterUrl: "https://framerusercontent.com/images/Q77K0JSMO5Y9btETkqZMDVKzEY.jpg?scale-down-to=1024&width=1920&height=1080",
      deliverables: ["Exterior-to-interior transitions", "3D motion-tracked labels", "Architectural colour grade"]
    },
    {
      number: "03",
      title: "Event & Venue Coverage",
      description: "Dynamic perspectives that capture the atmosphere of venues, occasions and experiences.",
      detail: "From dressed banquet halls and corporate conferences to launch nights, we capture the energy and layout of your venue in action.",
      videoUrl: "https://framerusercontent.com/assets/S2TTXmTIRMo6XkVXwj4L9LyEUE.mp4",
      posterUrl: "https://framerusercontent.com/images/rjMtB8G8uaJWkRswpw9Y4di79A.jpg?scale-down-to=1024&width=1920&height=1080",
      deliverables: ["Pre-doors & live atmosphere", "Bespoke sound design", "Fast-turnaround highlights"]
    },
    {
      number: "04",
      title: "Social-ready Video Content",
      description: "Professionally edited footage created for websites, campaigns and social platforms.",
      detail: "We shoot in a flexible high-resolution format that delivers both 16:9 widescreen for websites and 9:16 vertical cuts for Instagram Reels, TikTok and LinkedIn.",
      videoUrl: "https://framerusercontent.com/assets/PZoTHuUZhlouhFkmvJihSKkfIVw.mp4",
      posterUrl: "https://framerusercontent.com/images/ZSraW3Mh79lShd7dVtmzPhhjY.jpg?scale-down-to=1024&width=1920&height=1080",
      deliverables: ["16:9 Website & YouTube cut", "9:16 Vertical social edits", "Raw footage archive included"]
    }
  ],

  differentiators: {
    mainImage: "https://framerusercontent.com/images/mBydBBsFiPgcD1REvDCm6bR8JOE.png?width=1513&height=851",
    secondaryVideo: "https://framerusercontent.com/assets/PZoTHuUZhlouhFkmvJihSKkfIVw.mp4",
    items: [
      {
        code: "01",
        title: "Smooth filming in complex indoor environments",
        description: "Purpose-built indoor cinewhoop platforms (such as our Pavo 20 Pro with full propeller guards) allow controlled, stable flight through doorways, staircases and furnished rooms."
      },
      {
        code: "02",
        title: "Carefully planned flight paths",
        description: "Every shoot starts with a location assessment. We choreograph camera speed, sightlines and lighting transitions so the movement feels deliberate and natural rather than rushed."
      },
      {
        code: "03",
        title: "Immersive perspectives conventional cameras struggle to capture",
        description: "Bridge the gap between exterior aerial establishing shots and intimate interior walkthroughs in a single unbroken sequence."
      },
      {
        code: "04",
        title: "Professional post-production & sound design",
        description: "Each film is stabilised, colour-graded and paired with subtle spatial audio and speed-ramping to guide the viewer's focus cleanly from zone to zone."
      },
      {
        code: "05",
        title: "Horizontal and vertical deliverables",
        description: "Captured using high-resolution sensors that allow us to master both 16:9 widescreen website embeds and 9:16 vertical cuts for Reels, Shorts and LinkedIn without quality loss."
      },
      {
        code: "06",
        title: "Available 3D motion-tracked text",
        description: "Confirmed on existing CINEYFPV productions: we can anchor clean 3D callouts directly into rooms and corridors to label zones, dimensions or amenities as the camera flies past."
      }
    ]
  },

  processSteps: [
    {
      step: "01",
      title: "Discovery",
      description: "We discuss your objectives, space and the story you want to tell.",
      imageUrl: "https://framerusercontent.com/images/n1R8W76oPo6jRVYbVlNUcmgPKu8.jpg?scale-down-to=1024&width=4838&height=3225"
    },
    {
      step: "02",
      title: "Planning",
      description: "We assess the location, plan the flight route and coordinate filming.",
      imageUrl: "https://framerusercontent.com/images/3FtMeKlZbQc3EXS24YzVb7Oheo.jpg?scale-down-to=1024&width=4772&height=3263"
    },
    {
      step: "03",
      title: "Filming",
      description: "We capture the space through carefully executed FPV footage.",
      imageUrl: "https://framerusercontent.com/images/hFBuICgG7upTXdVXgOsOtzdmbps.jpg?scale-down-to=1024&width=2048&height=1536"
    },
    {
      step: "04",
      title: "Editing & Delivery",
      description: "We refine the footage and prepare the final content for its intended use.",
      imageUrl: "https://framerusercontent.com/images/gARoMMZfsgphDK8B1AB7QI2P4.jpg?scale-down-to=1024&width=2856&height=2142"
    }
  ],

  testimonials: [
    {
      id: "tramnak",
      organisation: "Tramnak",
      sector: "Construction",
      excerpt: "The quality is consistently excellent, and their work has significantly improved our social media presence and how we showcase our projects.",
      fullQuote: "We use this company for project photography, cinematic drone footage and drone surveys. The quality is consistently excellent, and their work has significantly improved our social media presence and how we showcase our projects.",
      rating: "5.0",
      verifiedFromSite: true,
      logoUrl: "https://framerusercontent.com/images/hyaYbgshanU33A8OhTZjKET8A.png?scale-down-to=512&width=603&height=546",
      projectVideoId: "1x0bQfC6RDM"
    },
    {
      id: "fitya-centre",
      organisation: "Fitya Centre",
      sector: "Youth Club",
      excerpt: "CineyFPV showcased our youth club brilliantly in one seamless shot.",
      fullQuote: "CineyFPV showcased our youth club brilliantly in one seamless shot. We didn't realise FPV drones could be this impressive. Highly recommended.",
      rating: "5.0",
      verifiedFromSite: true,
      logoUrl: "https://framerusercontent.com/images/Dl4lFLITXO7OvxieXKiapaCyY.webp?scale-down-to=512&width=1170&height=1159",
      projectVideoId: "VrFpv1xkwFw"
    },
    {
      id: "kaptureme",
      organisation: "KaptureMe",
      sector: "Cinematic Photography",
      excerpt: "Absolutely brilliant from start to finish.",
      fullQuote: "Absolutely brilliant from start to finish. Really adhered to our vision and executed it to the 'T'. Great footage.!!",
      rating: "5.0",
      verifiedFromSite: true,
      logoUrl: "https://framerusercontent.com/images/5y5cpf4T1cxOu4qrxZpVxRmI8g.jpg?scale-down-to=512&width=1080&height=1080",
      projectVideoId: null
    },
    {
      id: "grand-affairs",
      organisation: "Grand Affairs",
      sector: "Wedding Decor & Catering",
      excerpt: "The service from the team was very professional, truly brought out the capabilities of my business.",
      fullQuote: "We run a decor company called Grand Affairs. The service from the team was very professional, truly brought out the capabilities of my business. We have had amazing feedback and regular work as a result of the work from the team. 100% recommend them!",
      rating: "5.0",
      verifiedFromSite: true,
      logoUrl: "https://framerusercontent.com/images/XUwZMArjzyONm6NYSRs2VsnYBRc.png?width=225&height=225",
      projectVideoId: "gD5Xe60Gk-s"
    },
    {
      id: "hashtag-cafe",
      organisation: "Hashtag Cafe",
      sector: "Hospitality & Local Cafe",
      excerpt: "Very professional and knows exactly what he's doing. Really happy with the job.",
      fullQuote: "Great lad, loves his job and it shows. Very professional and knows exactly what he's doing. Really happy with the job.",
      rating: "5.0",
      verifiedFromSite: true,
      logoUrl: "https://framerusercontent.com/images/yKtg0spOmHqd0kwKDzTf0V9dQ0.png?scale-down-to=512&width=552&height=552",
      projectVideoId: "5Ci659bez7w"
    }
  ],

  faqs: [
    {
      question: "What is an indoor FPV drone tour?",
      answer: "An indoor FPV (First-Person View) drone tour is a continuous, single-take video filmed with a compact, agile cinema drone. Unlike static photographs or stop-start 360° virtual tours, it glides smoothly from exterior entrances through rooms, corridors and levels to show the true layout, flow and atmosphere of your space."
    },
    {
      question: "Can you fly inside a working commercial space?",
      answer: "Yes. We coordinate filming around your operational hours—whether that means shooting during quiet periods, before doors open, or alongside carefully briefed staff or staged guests so your business experiences minimal disruption."
    },
    {
      question: "Is indoor FPV filming safe?",
      answer: "We plan every flight path during a dedicated location scout before filming begins. For indoor environments, we fly compact, lightweight cinewhoop drones (such as the Pavo 20 Pro) equipped with full 360-degree propeller guards designed specifically for close-proximity interior work."
    },
    {
      question: "How much does an FPV drone shoot cost?",
      answer: "Every quote is tailored to your location, the size and complexity of the space, and the deliverables you require (such as multi-aspect edits or 3D motion-tracked text). Contact us with a brief description of your space for a free, no-obligation quote."
    },
    {
      question: "How long does filming take?",
      answer: "Most commercial shoots are completed within a few hours on site. This includes walking the space with you, rehearsing the flight line to perfect lighting and timing, and capturing multiple clean takes."
    },
    {
      question: "How long does it take to receive the final video?",
      answer: "We begin post-production immediately after the shoot day. Turnaround time depends on the scope of your deliverables—projects incorporating custom 3D motion-tracked text or multiple social cuts take slightly longer to polish. We confirm expected delivery dates during your discovery call."
    },
    {
      question: "Can we use the footage on our website and social media?",
      answer: "Yes. Your deliverables are supplied ready for commercial use across your website, property listings, client presentations and social media channels. We also provide both the final edited films and the raw drone footage so your team has complete creative flexibility."
    },
    {
      question: "Do you provide both horizontal and vertical videos?",
      answer: "Yes. We shoot in a flexible high-resolution format that allows us to deliver both horizontal (16:9) videos for websites, YouTube and presentations, and vertical (9:16) cuts optimised for Instagram Reels, TikTok, YouTube Shorts and LinkedIn."
    }
  ]
};
