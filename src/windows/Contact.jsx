import React, { useState } from 'react';
import WindowWrapper from '../hoc/WindowWrapper';
import WindowControlls from '../components/WindowControlls';
import { Search, Phone, Mail, MessageSquare, Video, User } from 'lucide-react';

const CONTACTS_DATA = [
  {
    id: 'elon-musk',
    name: 'Elon Musk',
    company: 'Tesla, SpaceX, xAI',
    title: 'Technoking & Chief Engineer',
    phone: '+1 (555) 420-6900',
    email: 'elon@x.com',
    avatarBg: 'bg-indigo-500',
    initials: 'EM',
    notes: 'Working on Mars colonization and full self-driving.',
  },
  {
    id: 'jeff-bezos',
    name: 'Jeff Bezos',
    company: 'Amazon, Blue Origin',
    title: 'Executive Chairman',
    phone: '+1 (555) 789-1024',
    email: 'jeff@amazon.com',
    avatarBg: 'bg-amber-600',
    initials: 'JB',
    notes: 'Day 1 mentality. Space flights via New Shepard.',
  },
  {
    id: 'mark-zuckerberg',
    name: 'Mark Zuckerberg',
    company: 'Meta',
    title: 'Founder & CEO',
    phone: '+1 (555) 314-1592',
    email: 'zuck@meta.com',
    avatarBg: 'bg-blue-600',
    initials: 'MZ',
    notes: 'Open source AI (Llama) and Metaverse avatars.',
  },
  {
    id: 'sundar-pichai',
    name: 'Sundar Pichai',
    company: 'Google & Alphabet',
    title: 'Chief Executive Officer',
    phone: '+1 (555) 808-4321',
    email: 'sundar@google.com',
    avatarBg: 'bg-emerald-600',
    initials: 'SP',
    notes: 'AI-first approach across Android, Search, and Cloud.',
  },
];

const Contact = ({ isMaximized }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(CONTACTS_DATA[0].id);

  const filteredContacts = CONTACTS_DATA.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeContact = CONTACTS_DATA.find((c) => c.id === selectedId) || CONTACTS_DATA[0];

  return (
    <div
      className={`flex flex-col bg-[#fbfbfb] overflow-hidden rounded-xl shadow-2xl border border-gray-300 ${
        isMaximized ? 'w-full h-full' : 'w-[680px] max-w-[95vw] h-[480px] max-h-[85vh]'
      }`}
    >
      {/* Top Header Bar */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2.5 bg-[#ebebeb] border-b border-gray-300 select-none shrink-0"
      >
        <div className="flex items-center gap-4">
          <WindowControlls target="contact" />
          <span className="text-xs font-semibold text-gray-700">Contacts</span>
        </div>

        {/* Search Input */}
        <div className="relative w-48">
          <Search size={13} className="absolute left-2.5 top-2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full pl-7 pr-2.5 py-1 text-xs bg-white/80 focus:bg-white border border-gray-300 rounded-md outline-none text-gray-700 shadow-inner transition-colors"
          />
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left List Pane */}
        <div className="w-56 sm:w-64 border-r border-gray-200 bg-[#f5f5f7]/70 flex flex-col shrink-0">
          <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
            All Contacts ({filteredContacts.length})
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => {
              const isSelected = contact.id === activeContact?.id;
              return (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setSelectedId(contact.id)}
                  className={`w-full text-left px-3 py-2 flex items-center gap-3 transition-colors ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-200/60 text-gray-800'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 text-white shadow-sm ${
                      isSelected ? 'bg-white/20' : contact.avatarBg
                    }`}
                  >
                    {contact.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate">{contact.name}</p>
                    <p
                      className={`text-[11px] truncate ${
                        isSelected ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {contact.company}
                    </p>
                  </div>
                </button>
              );
            })}

            {filteredContacts.length === 0 && (
              <div className="px-4 py-8 text-center text-xs text-gray-400">
                No contacts found
              </div>
            )}
          </div>
        </div>

        {/* Right Details Pane */}
        <div className="flex-1 overflow-y-auto bg-white p-6 sm:p-8 flex flex-col">
          {activeContact ? (
            <div>
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shadow ${activeContact.avatarBg}`}
                >
                  {activeContact.initials}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{activeContact.name}</h2>
                  <p className="text-xs text-gray-500">{activeContact.title}</p>
                  <p className="text-xs font-medium text-gray-700">{activeContact.company}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-2 py-4 border-b border-gray-100">
                <a
                  href={`tel:${activeContact.phone}`}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors text-blue-600"
                >
                  <Phone size={18} />
                  <span className="text-[11px]">Call</span>
                </a>
                <a
                  href={`sms:${activeContact.phone}`}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors text-blue-600"
                >
                  <MessageSquare size={18} />
                  <span className="text-[11px]">Message</span>
                </a>
                <button
                  type="button"
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors text-blue-600"
                >
                  <Video size={18} />
                  <span className="text-[11px]">FaceTime</span>
                </button>
                <a
                  href={`mailto:${activeContact.email}`}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors text-blue-600"
                >
                  <Mail size={18} />
                  <span className="text-[11px]">Mail</span>
                </a>
              </div>

              {/* Contact Info Entries */}
              <div className="py-4 space-y-4 text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">phone</span>
                  <a
                    href={`tel:${activeContact.phone}`}
                    className="text-blue-600 hover:underline font-medium text-sm"
                  >
                    {activeContact.phone}
                  </a>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">email</span>
                  <a
                    href={`mailto:${activeContact.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {activeContact.email}
                  </a>
                </div>

                <div>
                  <span className="text-gray-400 block text-[11px] mb-0.5">notes</span>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded-md border border-gray-100">
                    {activeContact.notes}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-gray-400 text-xs">
              <User size={36} className="mb-2 opacity-30" />
              <span>Select a contact to view details</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactWindow = WindowWrapper(Contact, 'contact');
export default ContactWindow;