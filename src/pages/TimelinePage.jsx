import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PostCard from '../components/PostCard'
import CreatePost from '../components/CreatePost'
import { getPosts, createPost } from '../api/posts'

function TimelinePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await getPosts()
      setPosts(data)
    } catch (err) {
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePost = async (newPost) => {
    try {
      const data = await createPost(newPost.text, newPost.image)
      setPosts([data, ...posts])
    } catch (err) {
      console.error('Error creating post:', err)
    }
  }

  return (
    <div className="timeline-wrapper">
      <Navbar />
      <div className="timeline-container">
        <h2 className="timeline-title">Timeline</h2>
        {loading ? (
          <p style={{color: '#a8a8b3', textAlign: 'center'}}>Loading posts... </p>
        ) : (
          <>
            <CreatePost onPost={handlePost} />
            <div className="timeline-feed">
              {posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default TimelinePage