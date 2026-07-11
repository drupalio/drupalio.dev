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

  const featuredProjects = () =>
    useAsyncData(`featured-projects-${current.value}`, async () => {
      const projects = await queryCollection(projectsCollection.value)
        .where('order', '>=', 0)
        .order('order', 'ASC')
        .all()
      return projects.filter(p => p.featured)
    }, { watch: [current] })

  const allProjects = () =>
    useAsyncData(`all-projects-${current.value}`, async () => {
      return await queryCollection(projectsCollection.value)
        .where('order', '>=', 0)
        .order('order', 'ASC')
        .all()
    }, { watch: [current] })

  const projectBySlug = (slug: string) =>
    useAsyncData(`project-${current.value}-${slug}`, async () => {
      const cleanSlug = slug.replace(/^\/(en|es)\//, '/')
      const contentPath = `/${current.value}${cleanSlug === '/' ? '' : cleanSlug}`
      return await queryCollection(projectsCollection.value)
        .path(contentPath)
        .first()
    }, { watch: [current] })

  const allExperience = () =>
    useAsyncData(`experience-${current.value}`, async () => {
      return await queryCollection(experienceCollection.value)
        .where('order', '>=', 0)
        .order('order', 'ASC')
        .all()
    }, { watch: [current] })

  const allBlogPosts = () =>
    useAsyncData(`blog-${current.value}`, async () => {
      return await queryCollection(blogCollection.value)
        .where('draft', '=', false)
        .order('date', 'DESC')
        .all()
    }, { watch: [current] })

  const blogPostBySlug = (slug: string) =>
    useAsyncData(`blog-post-${current.value}-${slug}`, async () => {
      const cleanSlug = slug.replace(/^\/(en|es)\//, '/')
      const contentPath = `/${current.value}${cleanSlug === '/' ? '' : cleanSlug}`
      return await queryCollection(blogCollection.value)
        .path(contentPath)
        .first()
    }, { watch: [current] })

  return {
    featuredProjects,
    allProjects,
    projectBySlug,
    allExperience,
    allBlogPosts,
    blogPostBySlug,
  }
}