const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length <= 0) {
    return 0
  }
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const mostLikes = (blogs) => {
  if (blogs.length <= 0) {
    return null
  }
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === maxLikes)
  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes
}