import { DocumentEntry } from '../types';

export const documentationData: DocumentEntry[] = [
  {
    platform: 'segment',
    topic: 'Setting up a new source',
    content: 'To set up a new source in Segment: 1. Navigate to Sources in your workspace. 2. Click Add Source. 3. Choose your source type from the catalog. 4. Follow the source-specific setup instructions.',
    keywords: ['source', 'setup', 'add source', 'new source']
  },
  {
    platform: 'mparticle',
    topic: 'Creating a user profile',
    content: 'To create a user profile in mParticle: 1. Access the User Activity view. 2. Click on Create Profile. 3. Fill in the required user attributes. 4. Set any custom attributes as needed.',
    keywords: ['profile', 'user profile', 'create profile']
  },
  {
    platform: 'lytics',
    topic: 'Building audience segments',
    content: 'To build an audience segment in Lytics: 1. Go to Audiences. 2. Click Create New Audience. 3. Define your segment criteria using behavioral or demographic data. 4. Save and activate your segment.',
    keywords: ['audience', 'segment', 'create audience']
  },
  {
    platform: 'zeotap',
    topic: 'Data integration',
    content: 'To integrate data with Zeotap: 1. Access the Integration Hub. 2. Select your data source type. 3. Configure the connection settings. 4. Map your data fields. 5. Test and activate the integration.',
    keywords: ['integration', 'connect', 'data source']
  }
];