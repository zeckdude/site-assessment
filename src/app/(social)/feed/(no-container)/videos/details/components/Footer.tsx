import Image from 'next/image'
import { Col, Row } from 'react-bootstrap'

import appStore from '@/assets/images/app-store.svg'
import googlePlay from '@/assets/images/google-play.svg'
import { currentYear, developedBy, developedByLink } from '@/context/constants'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="card card-body">
      <Row className="g-4">
        <Col md={8}>
          <ul className="nav lh-1">
            <li className="nav-item">
              <Link className="nav-link ps-0" href="/profile/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" target="_blank" href={developedByLink}>
                Support{' '}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" target="_blank" href="">
                Docs{' '}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/privacy-terms">
                Privacy &amp; terms
              </Link>
            </li>
          </ul>

          <p className="mb-0 mt-4">
            ©{currentYear}{' '}
            <Link className="text-body" target="_blank" href={developedByLink}>
              {' '}
              {developedBy}{' '}
            </Link>
            All rights reserved Supposing so be resolving breakfast am or perfectly. Is drew am hill from me. Valley by oh twenty direct me so.
            Departure defective arranging rapturous did believe him all had supported.{' '}
          </p>
        </Col>
        <Col md={4}>
          <div className="d-flex justify-content-md-end">
            <span role="button">
              <Image className="h-50px w-auto" src={appStore} alt="app-store" />
            </span>
            <span role="button">
              <Image className="h-50px w-auto ms-2" src={googlePlay} alt="google-play" />
            </span>
          </div>
        </Col>
      </Row>
    </footer>
  )
}
export default Footer
