'use client'
import GlightBox from '@/components/GlightBox'
import { useFetchData } from '@/hooks/useFetchData'
import type { ChildrenType } from '@/types/component'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from 'react-bootstrap'
import {
  BsBookmark,
  BsBriefcase,
  BsCalendar2Plus,
  BsCalendarDate,
  BsChatLeftText,
  BsEnvelope,
  BsFileEarmarkPdf,
  BsGear,
  BsGeoAlt,
  BsHeart,
  BsLock,
  BsPatchCheckFill,
  BsPencilFill,
  BsPersonX,
  BsThreeDots,
} from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa6'

import { PROFILE_MENU_ITEMS } from '@/assets/data/menu-items'
import { getAllUsers } from '@/helpers/data'
import { experienceData } from './data'

import avatar7 from '@/assets/images/avatar/07.jpg'
import background5 from '@/assets/images/bg/05.jpg'

import album1 from '@/assets/images/albums/01.jpg'
import album2 from '@/assets/images/albums/02.jpg'
import album3 from '@/assets/images/albums/03.jpg'
import album4 from '@/assets/images/albums/04.jpg'
import album5 from '@/assets/images/albums/05.jpg'

const Experience = () => {
  return (
    <Card>
      <CardHeader className="d-flex justify-content-between border-0">
        <h5 className="card-title">Experience</h5>
        <Button variant="primary-soft" size="sm">
          {' '}
          <FaPlus />{' '}
        </Button>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        {experienceData.map((experience, idx) => (
          <div className="d-flex" key={idx}>
            <div className="avatar me-3">
              <span role="button">
                {' '}
                <Image className="avatar-img rounded-circle" src={experience.logo} alt="" />{' '}
              </span>
            </div>
            <div>
              <h6 className="card-title mb-0">
                <Link href=""> {experience.title} </Link>
              </h6>
              <p className="small">
                {experience.description}{' '}
                <Link className="btn btn-primary-soft btn-xs ms-2" href="">
                  Edit{' '}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

const Photos = () => {
  return (
    <Card>
      <CardHeader className="d-sm-flex justify-content-between border-0">
        <CardTitle>Photos</CardTitle>
        <Button variant="primary-soft" size="sm">
          {' '}
          See all photo
        </Button>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        <Row className="g-2">
          <Col xs={6}>
            <GlightBox href={album1.src} data-gallery="image-popup">
              <Image className="rounded img-fluid" src={album1} alt="album-image" />
            </GlightBox>
          </Col>
          <Col xs={6}>
            <GlightBox href={album2.src} data-gallery="image-popup">
              <Image className="rounded img-fluid" src={album2} alt="album-image" />
            </GlightBox>
          </Col>
          <Col xs={4}>
            <GlightBox href={album3.src} data-gallery="image-popup">
              <Image className="rounded img-fluid" src={album3} alt="album-image" />
            </GlightBox>
          </Col>
          <Col xs={4}>
            <GlightBox href={album4.src} data-gallery="image-popup">
              <Image className="rounded img-fluid" src={album4} alt="album-image" />
            </GlightBox>
          </Col>
          <Col xs={4}>
            <GlightBox href={album5.src} data-gallery="image-popup">
              <Image className="rounded img-fluid" src={album5} alt="album-image" />
            </GlightBox>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const Friends = () => {
  const allFriends = useFetchData(getAllUsers)

  return (
    <Card>
      <CardHeader className="d-sm-flex justify-content-between align-items-center border-0">
        <CardTitle>
          Friends <span className="badge bg-danger bg-opacity-10 text-danger">230</span>
        </CardTitle>
        <Button variant="primary-soft" size="sm">
          {' '}
          See all friends
        </Button>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        <Row className="g-3">
          {allFriends?.slice(0, 4).map((friend, idx) => (
            <Col xs={6} key={idx}>
              <Card className="shadow-none text-center h-100">
                <CardBody className="p-2 pb-0">
                  <div className={clsx('avatar avatar-xl', { 'avatar-story': friend.isStory })}>
                    <span role="button">
                      <Image className="avatar-img rounded-circle" src={friend.avatar} alt="" />
                    </span>
                  </div>
                  <h6 className="card-title mb-1 mt-3">
                    {' '}
                    <Link href=""> {friend.name} </Link>
                  </h6>
                  <p className="mb-0 small lh-sm">{friend.mutualCount} mutual connections</p>
                </CardBody>
                <div className="card-footer p-2 border-0">
                  <button className="btn btn-sm btn-primary me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Send message">
                    {' '}
                    <BsChatLeftText />{' '}
                  </button>
                  <button className="btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove friend">
                    {' '}
                    <BsPersonX />{' '}
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

const ProfileLayout = ({ children }: ChildrenType) => {
  const pathName = usePathname()
  return (
    <>
      <main>
        <Container>
          <Row className="g-4">
            <Col lg={8} className="vstack gap-4">
              <Card>
                <div
                  className="h-200px rounded-top"
                  style={{
                    backgroundImage: `url(${background5.src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                <CardBody className="py-0">
                  <div className="d-sm-flex align-items-start text-center text-sm-start">
                    <div>
                      <div className="avatar avatar-xxl mt-n5 mb-3">
                        <Image className="avatar-img rounded-circle border border-white border-3" src={avatar7} alt="avatar" />
                      </div>
                    </div>
                    <div className="ms-sm-4 mt-sm-3">
                      <h1 className="mb-0 h5">
                        Sam Lanson <BsPatchCheckFill className="text-success small" />
                      </h1>
                      <p>250 connections</p>
                    </div>
                    <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                      <Button variant="danger-soft" className="me-2" type="button">
                        {' '}
                        <BsPencilFill size={19} className="pe-1" /> Edit profile{' '}
                      </Button>
                      <Dropdown>
                        <DropdownToggle
                          as="a"
                          className="icon-md btn btn-light content-none"
                          type="button"
                          id="profileAction2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <span>
                            {' '}
                            <BsThreeDots />
                          </span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end" aria-labelledby="profileAction2">
                          <li>
                            <DropdownItem href="">
                              {' '}
                              <BsBookmark size={22} className="fa-fw pe-2" />
                              Share profile in a message
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem href="">
                              {' '}
                              <BsFileEarmarkPdf size={22} className="fa-fw pe-2" />
                              Save your profile to PDF
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem href="">
                              {' '}
                              <BsLock size={22} className="fa-fw pe-2" />
                              Lock profile
                            </DropdownItem>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <DropdownItem href="">
                              {' '}
                              <BsGear size={22} className="fa-fw pe-2" />
                              Profile settings
                            </DropdownItem>
                          </li>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                  <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                    <li className="list-inline-item">
                      <BsBriefcase className="me-1" /> Lead Developer
                    </li>
                    <li className="list-inline-item">
                      <BsGeoAlt className="me-1" /> New Hampshire
                    </li>
                    <li className="list-inline-item">
                      <BsCalendar2Plus className="me-1" /> Joined on Nov 26, 2019
                    </li>
                  </ul>
                </CardBody>
                <CardFooter className="card-footer mt-3 pt-2 pb-0">
                  <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                    {PROFILE_MENU_ITEMS.map((item, idx) => (
                      <li className="nav-item" key={idx}>
                        {' '}
                        <Link className={clsx('nav-link', { active: pathName === item.url })} href={item.url ?? ''}>
                          {' '}
                          {item.label} {item.badge && <span className="badge bg-success bg-opacity-10 text-success small"> {item.badge.text}</span>}{' '}
                        </Link>{' '}
                      </li>
                    ))}
                  </ul>
                </CardFooter>
              </Card>
              {children}
            </Col>
            <Col lg={4}>
              <Row className="g-4">
                <Col md={6} lg={12}>
                  <Card>
                    <CardHeader className="border-0 pb-0">
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardBody className="position-relative pt-0">
                      <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.</p>
                      <ul className="list-unstyled mt-3 mb-0">
                        <li className="mb-2">
                          {' '}
                          <BsCalendarDate size={18} className="fa-fw pe-1" /> Born: <strong> October 20, 1990 </strong>{' '}
                        </li>
                        <li className="mb-2">
                          {' '}
                          <BsHeart size={18} className="fa-fw pe-1" /> Status: <strong> Single </strong>{' '}
                        </li>
                        <li>
                          {' '}
                          <BsEnvelope size={18} className="fa-fw pe-1" /> Email: <strong> webestica@gmail.com </strong>{' '}
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={6} lg={12}>
                  <Experience />
                </Col>
                <Col md={6} lg={12}>
                  <Photos />
                </Col>
                <Col md={6} lg={12}>
                  <Friends />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default ProfileLayout
