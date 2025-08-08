/**
 * Environment-aware URL generation for SEO and canonical URLs
 * Ensures dev site uses /reboot/ path and dev domain correctly
 */

// Detect environment from Vite's import.meta.env
const isDev = import.meta.env.MODE === 'development'

// Base URLs for each environment
export const BASE_URL = isDev 
  ? 'https://dev.rebootmedia.net/reboot'
  : 'https://www.rebootmedia.net'

/**
 * Generate a full canonical URL for the given path
 * @param path - The path without leading slash (e.g., 'about', 'contact')
 * @returns Full canonical URL for the current environment
 */
export const getCanonicalUrl = (path: string = ''): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  if (cleanPath === '') {
    return BASE_URL + '/'
  }
  
  return `${BASE_URL}/${cleanPath}`
}

/**
 * Generate OG image URL for the current environment
 * @param imagePath - The image path (e.g., 'og-image.jpg')
 * @returns Full image URL for the current environment
 */
export const getOgImageUrl = (imagePath: string = 'og-image.jpg'): string => {
  return `${BASE_URL}/${imagePath}`
}

/**
 * Generate logo URL for the current environment
 * @param logoPath - The logo path (e.g., 'reboot-media.avif')
 * @returns Full logo URL for the current environment
 */
export const getLogoUrl = (logoPath: string = 'reboot-media.avif'): string => {
  return `${BASE_URL}/${logoPath}`
}

/**
 * Get the base organization URL for schema markup
 * @returns The base URL for the organization
 */
export const getOrganizationUrl = (): string => {
  return BASE_URL
}