import { Col } from 'react-bootstrap'
import AllPostVideos from './components/AllPostVideos'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Post Videos' }

const PostVideos = () => {
  return (
    <Col md={8} lg={6} className="vstack gap-4">
      <AllPostVideos />
    </Col>
  )
}
export default PostVideos
