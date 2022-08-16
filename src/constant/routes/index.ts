export const Routes = {
  applications: {
    all: '/applications',
    get: '/applications/:id',
  },
  metadata: '/metadata',
  videos: {
    all: '/videos',
    create: '/videos',
    get: '/videos/:id',
    prepare: '/videos/prepare',
  },
  ws: {
    auth: '/broadcasting/auth',
  },
}
