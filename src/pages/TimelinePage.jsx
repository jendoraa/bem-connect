import { useState } from 'react'
import { initialPosts } from '../data/posts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PostCard from '../components/PostCard'
import CreatePost from '../components/CreatePost'

function TimelinePage() {
  const [posts, setPosts] = useState(initialPosts)

  const handlePost = (newPost) => {
    setPosts([newPost, ...posts])
  }

  return (
    <div className="timeline-wrapper">
      <Navbar />
      <div className="timeline-container">
        <h2 className="timeline-title">Timeline</h2>
        <CreatePost onPost={handlePost} />
        <div className="timeline-feed">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TimelinePage