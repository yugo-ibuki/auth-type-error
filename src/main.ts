import { ProjectsClient } from '@google-cloud/resource-manager';
import { Impersonated, GoogleAuth } from 'google-auth-library';

async function main() {
  const auth = new GoogleAuth();
  const targetPrincipal = 'your-service-account@your-project.iam.gserviceaccount.com';

  const impersonatedClient = new Impersonated({
    sourceClient: await auth.getClient(),
    targetPrincipal: targetPrincipal,
    lifetime: 300,
    delegates: [],
    targetScopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  // error occurs here
  const projectsClient = new ProjectsClient({ authClient: impersonatedClient });

  console.log('ProjectsClient created successfully');
}

main().catch(console.error);