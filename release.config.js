module.exports = {
  branches: 'main',
  plugins: [
    '@semantic-release/changelog',
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/git',
      {
        assets: ['README.md', 'dist/**'],
        message: 'chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
    '@semantic-release/npm',
    '@semantic-release/release-notes-generator',
  ],
}
