// Export the main page/route so the App can render it
export { default as TrackerDashboard } from './routes/TrackerDashboard';

// Optionally export types if other features need to know what a CollegeTurnout is
export type { CollegeTurnout } from './types'; 

// Notice we do NOT export the internal components like CollegeCard. 
// They are private to the tracker feature.