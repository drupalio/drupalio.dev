interface GitHubProfile {
  login: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  avatar_url: string
}

export default defineCachedEventHandler(async () => {
  const username = 'drupalio'
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'drupalio.dev',
  }

  const token = process.env.GITHUB_TOKEN || process.env.NUXT_GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const res = await $fetch<GitHubProfile>(`https://api.github.com/users/${username}`, { headers })
    return {
      username: res.login,
      publicRepos: res.public_repos,
      followers: res.followers,
      following: res.following,
      createdAt: res.created_at,
      avatarUrl: res.avatar_url,
    }
  } catch {
    return {
      username: 'drupalio',
      publicRepos: 47,
      followers: 12,
      following: 8,
      createdAt: '2013-03-01T00:00:00Z',
      avatarUrl: 'https://avatars.githubusercontent.com/u/5186093',
    }
  }
}, {
  maxAge: 60 * 60,
  swr: true,
})