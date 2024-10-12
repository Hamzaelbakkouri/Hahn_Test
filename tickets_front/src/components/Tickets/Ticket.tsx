import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Ticket() {
  return (
    <div className="border border-solid border-gray-200 bg-[#124358] pb-5 mb-7 px-14 py-7 rounded-md">
      <div className="sm:flex sm:items-baseline sm:justify-between">
        <div className="sm:w-0 sm:flex-1">
          <h1 id="message-heading" className="text-lg font-medium text-gray-100">
            Ticket #1
          </h1>
          <p className="mt-1 truncate text-sm text-gray-500">Checkout and Payments Team</p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
          <span className="inline-flex items-center rounded-full bg-green-300 px-3 py-0.5 text-sm font-medium text-green-800">
            Open
          </span>
          <Menu as="div" className="relative ml-3 inline-block text-left">
            <div>
              <Menu.Button className="-my-2 flex items-center rounded-full p-2 text-gray-100 hover:text-gray-300">
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md  bg-[#252831] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }:any) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? ' text-white' : 'text-white',
                          'flex justify-between px-4 py-2 text-sm'
                        )}
                      >
                        <span>Edit</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }:any) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? ' text-white' : 'text-white',
                          'flex justify-between px-4 py-2 text-sm'
                        )}
                      >
                        <span>Duplicate</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }:any) => (
                      <button
                        type="button"
                        className={classNames(
                          active ? ' text-white' : 'text-white',
                          'flex w-full justify-between px-4 py-2 text-sm'
                        )}
                      >
                        <span>Archive</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}
