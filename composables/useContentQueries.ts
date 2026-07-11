export const useContentQueries = () => {
  const { current } = useLanguage()

  const projectsCollection = computed(() =>
    current.value === 'es' ? 'projects_es' : 'projects_en',
  )
  const experienceCollection = computed(() =>
    current.value === 'es' ? 'experience_es' : 'experience_en',
  )
  const blogCollection = computed(() =>
    current.value === 'es' ? 'blog_es' : 'blog_en',
  )

  const featuredProjects = async () => {
    const projects = await queryCollection(projectsCollection.value)
      .where('order', '>=', 0)
      .order('order', 'ASC')
      .all()
    return projects.filter(p => p.featured)
  }

  const allProjects = async () => {
    return await queryCollection(projectsCollection.value)
      .where('order', '>=', 0)
      .order('order', 'ASC')
      .all()
  }

  const projectBySlug = async (slug: string) => {
    const cleanSlug = slug.replace(/^\/(en|es)\//, '/')
    const contentPath = `/${current.value}${cleanSlug === '/' ? '' : cleanSlug}`
    return await queryCollection(projectsCollection.value)
      .path(contentPath)
      .first()
  }

  const allExperience = async () => {
    return await queryCollection(experienceCollection.value)
      .where('order', '>=', 0)
      .order('order', 'ASC')
      .all()
  }

  const allBlogPosts = async () => {
    return await queryCollection(blogCollection.value)
      .where('draft', '=', false)
      .order('date', 'DESC')
      .all()
  }

  const blogPostBySlug = async (slug: string) => {
    const cleanSlug = slug.replace(/^\/(en|es)\//, '/')
    const contentPath = `/${current.value}${cleanSlug === '/' ? '' : cleanSlug}`
    return await queryCollection(blogCollection.value)
      .path(contentPath)
      .first()
  }

  return {
    featuredProjects,
    allProjects,
    projectBySlug,
    allExperience,
    allBlogPosts,
    blogPostBySlug,
  }
}