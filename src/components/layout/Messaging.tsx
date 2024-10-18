import { getAllUsers } from '@/helpers/data'
import { useFetchData } from '@/hooks/useFetchData'
import Link from 'next/link'
import useToggle from '@/hooks/useToggle'
import { type ChatMessageType, type UserType } from '@/types/data'
import { addOrSubtractMinutesFromDate, timeSince } from '@/utils/date'
import { messages } from '@/assets/data/other'
import clsx from 'clsx'
import Image from 'next/image'
import {
  Button,
  Card,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
} from 'react-bootstrap'
import SimplebarReactClient from '../wrappers/SimplebarReactClient'
import { FaCheck, FaCheckDouble, FaCircle, FaFaceSmile, FaPaperclip, FaXmark } from 'react-icons/fa6'
import {
  BsArchive,
  BsCameraVideo,
  BsChatSquare,
  BsChatSquareText,
  BsDashLg,
  BsFlag,
  BsTelephone,
  BsThreeDotsVertical,
  BsTrash,
  BsVolumeUp,
} from 'react-icons/bs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useChatContext } from '@/context/useChatContext'
import TextAreaFormInput from '../form/TextAreaFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import avatar10 from '@/assets/images/avatar/10.jpg'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (elementRef?.current?.scrollIntoView) elementRef.current.scrollIntoView({ behavior: 'smooth' })
  })
  return <div ref={elementRef} />
}

const UserMessage = ({ message, toUser }: { message: ChatMessageType; toUser: UserType }) => {
  const received = message.from.id === toUser.id
  return (
    <div className={clsx('d-flex mb-1', { 'justify-content-end text-end': received })}>
      <div className="flex-shrink-0 avatar avatar-xs me-2">
        {!received && <Image className="avatar-img rounded-circle" src={message.from.avatar} alt="" />}
      </div>
      <div className="flex-grow-1">
        <div className="w-100">
          <div className={clsx('d-flex flex-column', received ? 'align-items-end' : 'align-items-start')}>
            {message.image ? (
              <div className="bg-light text-secondary p-2 px-3 rounded-2">
                <p className="small mb-0">{message.message}</p>
                <Card className="shadow-none p-2 border border-2 rounded mt-2">
                  <Image width={87} height={91} src={message.image} alt="image" />
                </Card>
              </div>
            ) : (
              <div className={clsx('p-2 px-3 rounded-2', received ? 'bg-primary text-white' : 'bg-light text-secondary')}>{message.message}</div>
            )}
            {message.isRead ? (
              <div className="d-flex my-2">
                <div className="small text-secondary">
                  {message.sentOn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </div>
                <div className="small ms-2">
                  <FaCheckDouble className="text-info" />
                </div>
              </div>
            ) : message.isSend ? (
              <div className="d-flex my-2">
                <div className="small text-secondary">
                  {message.sentOn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </div>
                <div className="small ms-2">
                  <FaCheck />
                </div>
              </div>
            ) : (
              <div className="small my-2">{message.sentOn.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const UserCard = ({ user, openToast }: { user: UserType; openToast: () => void }) => {
  const { changeActiveChat } = useChatContext()
  return (
    <>
      <li
        onClick={() => {
          openToast()
          changeActiveChat(user.id)
        }}
        className="mt-3 hstack gap-3 align-items-center position-relative toast-btn"
        data-target="chatToast">
        <div className={clsx(`avatar status-${user.status}`, { 'avatar-story': user.isStory })}>
          {user.avatar && <Image className="avatar-img rounded-circle" src={user.avatar} alt="avatar" />}
        </div>
        <div className="overflow-hidden">
          <Link className="h6 mb-0 stretched-link" href="">
            {user.name}{' '}
          </Link>
          <div className="small text-secondary text-truncate">{user.lastMessage}</div>
        </div>
        <div className="small ms-auto text-nowrap"> {timeSince(user.lastActivity)} </div>
      </li>
    </>
  )
}

const Messaging = () => {
  const { isTrue: isOpen, toggle, setTrue } = useToggle()
  const { activeChat } = useChatContext()
  const { isTrue: isOpenCollapseToast, toggle: toggleToastCollapse } = useToggle(true)

  const [userMessages, setUserMessages] = useState<ChatMessageType[]>([])
  const messageSchema = yup.object({
    newMessage: yup.string().required('Please enter message'),
  })

  const { reset, handleSubmit, control } = useForm({
    resolver: yupResolver(messageSchema),
  })

  const [toUser] = useState<UserType>({
    id: '108',
    lastActivity: addOrSubtractMinutesFromDate(0),
    lastMessage: 'Hey! Okay, thank you for letting me know. See you!',
    status: 'online',
    avatar: avatar10,
    mutualCount: 30,
    name: 'Judy Nguyen',
    role: 'web',
  })

  const getMessagesForUser = useCallback(() => {
    if (activeChat) {
      setUserMessages(
        messages.filter((m) => (m.to.id === toUser.id && m.from.id === activeChat.id) || (toUser.id === m.from.id && m.to.id === activeChat.id)),
      )
    }
  }, [activeChat, toUser])

  useEffect(() => {
    getMessagesForUser()
  }, [activeChat])

  const sendChatMessage = (values: { newMessage?: string }) => {
    if (activeChat) {
      const newUserMessages = [...userMessages]
      newUserMessages.push({
        id: (userMessages.length + 1).toString(),
        from: toUser,
        to: activeChat,
        message: values.newMessage ?? '',
        sentOn: addOrSubtractMinutesFromDate(-0.1),
      })
      setTimeout(() => {
        const otherNewMessages = [...newUserMessages]
        otherNewMessages.push({
          id: (userMessages.length + 1).toString(),
          from: activeChat,
          to: toUser,
          message: values.newMessage ?? '',
          sentOn: addOrSubtractMinutesFromDate(0),
        })
        setUserMessages(otherNewMessages)
      }, 1000)
      setUserMessages(newUserMessages)
      reset()
    }
  }
  const allUserMessages = useFetchData<UserType[]>(getAllUsers)

  return (
    <>
      <ul className="list-unstyled">
        {allUserMessages?.map((user, idx) => <UserCard user={user} key={idx} openToast={setTrue} />)}

        <li className="mt-3 d-grid">
          <Link className="btn btn-primary-soft" href="/messaging">
            {' '}
            See all in messaging{' '}
          </Link>
        </li>
      </ul>
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <ToastContainer className="toast-chat d-flex gap-3 align-items-end">
          <Toast
            show={isOpen}
            onClose={toggle}
            id="chatToast"
            className="mb-0 bg-mode"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-bs-autohide="false">
            <ToastHeader closeButton={false} className="bg-mode">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex">
                  <div className={clsx('flex-shrink-0 avatar me-2', { 'avatar-story': activeChat?.isStory })}>
                    {activeChat?.avatar && <Image className="avatar-img rounded-circle" src={activeChat.avatar} alt="avatar" />}
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0 mt-1">{activeChat?.name}</h6>
                    <div className="small text-secondary">
                      <FaCircle className={`text-${activeChat?.status === 'offline' ? 'danger' : 'success'} me-1`} />
                      {activeChat?.status}
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <Dropdown drop="start">
                    <DropdownToggle
                      as="a"
                      className="btn btn-secondary-soft-hover py-1 px-2 content-none"
                      id="chatcoversationDropdown"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false">
                      <BsThreeDotsVertical />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end" aria-labelledby="chatcoversationDropdown">
                      <li>
                        <DropdownItem href="">
                          <BsCameraVideo className="me-2 fw-icon" />
                          Video call
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          <BsTelephone className="me-2 fw-icon" />
                          Audio call
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          <BsTrash className="me-2 fw-icon" />
                          Delete{' '}
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          <BsChatSquareText className="me-2 fw-icon" />
                          Mark as unread
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          <BsVolumeUp className="me-2 fw-icon" />
                          Muted
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          <BsArchive className="me-2 fw-icon" />
                          Archive
                        </DropdownItem>
                      </li>
                      <li className="dropdown-divider" />
                      <li>
                        <DropdownItem href="">
                          <BsFlag className="me-2 fw-icon" />
                          Report
                        </DropdownItem>
                      </li>
                    </DropdownMenu>
                  </Dropdown>
                  <a className="btn btn-secondary-soft-hover py-1 px-2" data-bs-toggle="collapse" onClick={toggleToastCollapse}>
                    <BsDashLg />
                  </a>
                  <button onClick={toggle} className="btn btn-secondary-soft-hover py-1 px-2" data-bs-dismiss="toast" aria-label="Close">
                    <FaXmark />
                  </button>
                </div>
              </div>
            </ToastHeader>
            <Collapse in={isOpenCollapseToast} className="toast-body">
              <div>
                <SimplebarReactClient className="chat-conversation-content custom-scrollbar h-200px">
                  <div className="text-center small my-2">Jul 16, 2022, 06:15 am</div>
                  {userMessages.map((message) => (
                    <UserMessage message={message} key={message.id} toUser={toUser} />
                  ))}
                  <AlwaysScrollToBottom />
                </SimplebarReactClient>
                <form onSubmit={handleSubmit(sendChatMessage)} className="mt-2">
                  <TextAreaFormInput
                    className="mb-sm-0 mb-3"
                    name="newMessage"
                    control={control}
                    rows={1}
                    placeholder="Type a message"
                    noValidate
                    containerClassName="w-100"
                  />
                  <div className="d-sm-flex align-items-end mt-2">
                    <Button variant="danger-soft" size="sm" className="me-2">
                      <FaFaceSmile className="fs-6" />
                    </Button>
                    <Button variant="secondary-soft" size="sm" className="me-2">
                      <FaPaperclip className="fs-6" />
                    </Button>
                    <Button variant="success-soft" size="sm" className="me-2">
                      {' '}
                      Gif{' '}
                    </Button>
                    <Button variant="primary" size="sm" className="ms-auto" type="submit">
                      {' '}
                      Send{' '}
                    </Button>
                  </div>
                </form>
              </div>
            </Collapse>
          </Toast>
        </ToastContainer>
      </div>
    </>
  )
}
export default Messaging
