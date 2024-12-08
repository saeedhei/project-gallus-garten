import { onMounted } from 'vue'

// Define an interface for the SEO options
interface SeoOptions {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogUrl: string
  robots?: string
}

export function useSeo({
  title = 'Default Title',
  description = 'Default description of the page.',
  ogTitle = 'Default OG Title',
  ogDescription = 'Default OG Description',
  ogImage = '/src/assets/images/GallusGarten.svg',
  ogUrl = window.location.href,
  robots = 'index, follow',
}: Partial<SeoOptions> = {}) {
  onMounted(() => {
    // Update document title
    document.title = title

    // Function to update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
      if (metaTag) {
        metaTag.setAttribute('content', content)
      } else {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('property', property)
        metaTag.setAttribute('content', content)
        document.head.appendChild(metaTag)
      }
    }

    // Update or create standard meta description
    let descriptionMetaTag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (descriptionMetaTag) {
      descriptionMetaTag.setAttribute('content', description)
    } else {
      descriptionMetaTag = document.createElement('meta')
      descriptionMetaTag.setAttribute('name', 'description')
      descriptionMetaTag.setAttribute('content', description)
      document.head.appendChild(descriptionMetaTag)
    }

    // Update or create Open Graph meta tags
    updateMetaTag('og:title', ogTitle)
    updateMetaTag('og:description', ogDescription)
    updateMetaTag('og:image', ogImage)
    updateMetaTag('og:url', ogUrl)
    updateMetaTag('og:type', 'website') // Typically 'website' or 'article'

    let robotsMetaTag = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (robotsMetaTag) {
      robotsMetaTag.setAttribute('content', robots)
    } else {
      robotsMetaTag = document.createElement('meta')
      robotsMetaTag.setAttribute('name', 'robots')
      robotsMetaTag.setAttribute('content', robots)
      document.head.appendChild(robotsMetaTag)
    }
  })
}

// import { onMounted } from 'vue';

// export function useSeo({
//   title = 'Default Title',
//   description = 'Default description of the page.',
//   ogTitle = 'Default OG Title',
//   ogDescription = 'Default OG Description',
//   ogImage = 'https://example.com/default-image.jpg',
//   ogUrl = window.location.href
// } = {}) {
//   onMounted(() => {
//     // Update document title
//     document.title = title;

//     // Function to update or create meta tags
//     const updateMetaTag = (property, content) => {
//       let metaTag = document.querySelector(`meta[property="${property}"]`);
//       if (metaTag) {
//         metaTag.setAttribute('content', content);
//       } else {
//         metaTag = document.createElement('meta');
//         metaTag.setAttribute('property', property);
//         metaTag.setAttribute('content', content);
//         document.head.appendChild(metaTag);
//       }
//     };

//     // Update or create standard meta description
//     let descriptionMetaTag = document.querySelector('meta[name="description"]');
//     if (descriptionMetaTag) {
//       descriptionMetaTag.setAttribute('content', description);
//     } else {
//       descriptionMetaTag = document.createElement('meta');
//       descriptionMetaTag.setAttribute('name', 'description');
//       descriptionMetaTag.setAttribute('content', description);
//       document.head.appendChild(descriptionMetaTag);
//     }

//     // Update or create Open Graph meta tags
//     updateMetaTag('og:title', ogTitle);
//     updateMetaTag('og:description', ogDescription);
//     updateMetaTag('og:image', ogImage);
//     updateMetaTag('og:url', ogUrl);
//     updateMetaTag('og:type', 'website'); // Typically 'website' or 'article'
//   });
// }
