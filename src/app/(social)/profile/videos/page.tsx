import GlightBox from '@/components/GlightBox'
import { getAllMedia } from '@/helpers/data'
import type { MediaType } from '@/types/data'
import { toAlphaNumber } from '@/utils/change-casing'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import { BsChatLeftTextFill, BsHeartFill, BsPlayFill } from 'react-icons/bs'
import { FaCameraRetro } from 'react-icons/fa'

export const metadata: Metadata = { title: 'Videos' }

const VideoCard = ({ comments, image, likes, time }: MediaType) => {
  return (
    <Card className="p-0 shadow-none border-0 position-relative">
      <div className="position-relative">
        <Image className="rounded" src={image} alt="image" />
        <div className="position-absolute top-0 end-0 p-3">
          <GlightBox className="icon-md bg-danger text-white rounded-circle" data-glightbox href="/videos/video-call.mp4">
            {' '}
            <BsPlayFill size={22} />{' '}
          </GlightBox>
        </div>
        <div className="position-absolute bottom-0 start-0 p-3 d-flex w-100">
          <span className="bg-dark bg-opacity-50 px-2 rounded text-white small">{time}</span>
        </div>
      </div>
      <CardBody className="px-0 pb-0 pt-2">
        <ul className="nav nav-stack small">
          <li className="nav-item">
            <Link className="nav-link icons-center" href="">
              {' '}
              <BsHeartFill size={17} className="text-danger pe-1" />
              {toAlphaNumber(likes)}{' '}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link icons-center" href="">
              {' '}
              <BsChatLeftTextFill size={18} className="pe-1" />
              {toAlphaNumber(comments)}
            </Link>
          </li>
        </ul>
      </CardBody>
    </Card>
  )
}

const Videos = async () => {
  const allVideos = await getAllMedia()
  return (
    <Card>
      <CardHeader className="border-0 pb-0">
        <CardTitle>Videos</CardTitle>
      </CardHeader>
      <CardBody>
        <Row className="g-3">
          <Col sm={6} md={4}>
            <div className="border border-2 py-5 border-dashed h-100 rounded text-center d-flex align-items-center justify-content-center position-relative">
              <Link className="stretched-link" href="">
                <FaCameraRetro size={37} />
                <h6 className="mt-2">Add Video</h6>
              </Link>
            </div>
          </Col>
          {allVideos.slice(0, 4).map((video, idx) => (
            <Col sm={6} md={4} key={idx}>
              <VideoCard {...video} />
            </Col>
          ))}
        </Row>
      </CardBody>
      <CardFooter className="border-0 pt-0"></CardFooter>
    </Card>
  )
}
export default Videos
