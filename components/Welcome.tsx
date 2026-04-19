import React, { useState } from 'react';
import { ArrowRight, DownloadSimple, CheckCircle, Play } from '@phosphor-icons/react';
import { WelcomeData, WelcomeSectionItem } from '../types';
import WelcomeDetailModal from './WelcomeDetailModal';

const MOCK_WELCOME_DATA: WelcomeData = {
  sections: {
    get_started: [
      {
        title: "Welcome to Kletta",
        description: "Welcome message from CEO Matti Lannetta.",
        cta: "View details",
        image_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        modalSubtitle: "Start here if you’re new to the portal.",
        longDescription: "This overview video covers the essentials of managing your sole trader clients in Kletta. Learn how to navigate the dashboard, manage clients, and access support resources.",
        items: ["Dashboard navigation walkthrough", "Client management basics", "Accessing support resources", "Setting up your accountant profile"]
      },
      {
        title: "Portal Guide",
        description: "Download the full accountant guide.",
        cta: "Download Guide",
        image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        modalSubtitle: "Comprehensive PDF Guide",
        longDescription: "The complete reference manual for accountants using the Kletta portal. This guide includes detailed instructions for all features and best practices.",
        items: ["Detailed feature breakdown", "Troubleshooting tips", "Best practices for client onboarding", "Reporting workflows"]
      },
      {
        title: "Portal Walkthrough",
        description: "Overview of the Accountant Portal interface and features.",
        cta: "View details",
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        modalSubtitle: "Interactive Tour",
        longDescription: "Take a guided tour through the main sections of the Accountant Portal to familiarize yourself with the interface and key capabilities.",
        items: ["Dashboard KPIs and charts", "Income & Expense tracking", "Generating tax reports", "Settings & Configuration"]
      },
      {
        title: "Invite Your First Client",
        description: "Guide to inviting a test sole trader account.",
        cta: "View steps",
        image_url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        modalSubtitle: "Step-by-step Instructions",
        longDescription: "Follow these simple steps to invite your first sole trader client to Kletta. You can also invite a test email address to try the flow yourself.",
        items: ["Go to 'All Clients' page from the sidebar", "Click the 'Invite client' button", "Fill in the client's email and name", "Send the invite and track status in the client list"]
      }
    ],
    quick_start: [
      {
        title: "A day in the life of a sole trader",
        description: "See how a typical sole trader uses the Kletta mobile app.",
        cta: "View details",
        image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
        gallery_images: [
            "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=400"
        ],
        longDescription: "See how a typical sole trader uses the Kletta mobile app to manage their daily business finances effortlessly.",
        items: ["Receipt scanning workflow", "Mileage tracking on the go", "Categorizing transactions", "Chatting with the accountant"]
      },
      {
        title: "Sending invitations",
        description: "Guide for sending invitations individually or in bulk.",
        cta: "View details",
        image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
        longDescription: "Learn the different ways to onboard your clients to Kletta efficiently, whether one by one or in bulk.",
        items: ["Single client invitation", "Bulk CSV import", "Tracking invitation status", "Resending expired invites"]
      },
      {
        title: "Mobile app overview",
        description: "Overview of receipts, mileage, invoices, chat.",
        cta: "View details",
        image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
        gallery_images: [
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=400"
        ],
        longDescription: "A complete overview of the features available to your clients in the Kletta mobile app.",
        items: ["Home screen dashboard", "Camera for receipts", "Invoicing tool", "Real-time chat support"]
      }
    ],
    resources: [
      {
        title: "Templates & documents",
        items: [
          "Invite letter",
          "CSV import template",
          "Quick-start PDF"
        ],
        cta: "Download assets"
      },
      {
        title: "Support Materials",
        items: [
          "In-app chat walkthrough",
          "Backfilling YTD",
          "Remote login"
        ],
        cta: "View details"
      },
      {
        title: "Community & Support",
        items: [
          "Join Kletta community",
          "Weekly Meet & Greet Webinar",
          "Contact support"
        ],
        cta: "Open resources"
      }
    ],
    support: [
      {
        title: "1:1 Support & Webinars",
        description: "Book meetings with Kevin, join weekly Meet & Greet webinars, or contact support@kletta.com.",
        cta: "Schedule meeting",
        secondary_cta: "Join Webinar",
        image_url: "https://images.unsplash.com/photo-1515168816537-bf4980658842?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Partner Success Resources",
        description: "Access enablement packs, guides, templates, and support materials for partner success.",
        cta: "Open resources",
        image_url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
      }
    ],
    community: [
      {
        title: "Kletta For Accountants Community Forum",
        description: "A community forum inside the portal, where partners can share ideas and best practice.",
        cta: "Learn more",
        image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400"
      }
    ],
    newsletter: [
      {
        title: "Partner Newsletter",
        description: "Receive shared insights, news, and product updates from Kletta.",
        cta: "Subscribe",
        image_url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400"
      }
    ]
  }
};

const Welcome: React.FC = () => {
  const { sections } = MOCK_WELCOME_DATA;
  const [selectedItem, setSelectedItem] = useState<WelcomeSectionItem | null>(null);
  const [version, setVersion] = useState<'v1' | 'v2'>('v1');

  const VersionSwitcher = () => (
    <div className="absolute top-6 right-8 flex bg-gray-100 p-1 rounded-lg z-10">
      <button 
        onClick={() => setVersion('v1')}
        className={`px-3 py-1 text-[12px] font-bold rounded-md transition-all ${version === 'v1' ? 'bg-white shadow-sm text-[#002b31]' : 'text-gray-500 hover:text-[#002b31]'}`}
      >
        Version 1
      </button>
      <button 
        onClick={() => setVersion('v2')}
        className={`px-3 py-1 text-[12px] font-bold rounded-md transition-all ${version === 'v2' ? 'bg-white shadow-sm text-[#002b31]' : 'text-gray-500 hover:text-[#002b31]'}`}
      >
        Version 2
      </button>
    </div>
  );

  if (version === 'v1') {
    return (
      <>
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#F9FAFB] p-8 pb-16 relative">
          <VersionSwitcher />
          
          <div className="max-w-[1000px] mx-auto">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-[32px] font-bold text-[#002b31] mb-4">Welcome to Kletta</h1>
              <button className="text-[15px] font-medium text-[#1E6F73] underline underline-offset-4 hover:text-[#165659]">
                Watch again the welcome video from our CEO Matti Lannetta
              </button>
            </div>

            <div className="space-y-8">
              {/* Card 1: Let's get started */}
              <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-10 shadow-sm relative overflow-hidden">
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#E6F0F1] flex items-center justify-center flex-shrink-0">
                    <span className="text-[18px] font-bold text-[#002b31]">1</span>
                  </div>
                  <div>
                    <h2 className="text-[20px] font-bold text-[#002b31] mb-4">Let’s get started</h2>
                    <p className="text-[15px] text-[#002b31] mb-2 leading-relaxed">
                      Start by downloading the Accountant Portal Guide — your go-to reference for using Kletta.
                    </p>
                    <button className="text-[15px] font-bold text-[#1E6F73] underline underline-offset-4 hover:text-[#165659]">
                      Download the Accountant Portal Guide
                    </button>
                  </div>
                </div>

                {/* Comment Box 1 */}
                <div className="flex items-center gap-3 mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
                    alt="Team Member" 
                  />
                  <div className="bg-[#FFF1E9] px-6 py-4 rounded-[8px] flex-1">
                    <p className="text-[15px] font-medium text-[#002b31] leading-relaxed">
                      Now that you know what you’ll be doing in the portal, let’s look at how you’ll engage your sole traders.
                    </p>
                  </div>
                </div>

                {/* Video Previews */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 group cursor-pointer shadow-sm">
                    <img 
                      src="https://picsum.photos/seed/portal/800/450" 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" 
                      alt="Portal Interface" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-10 bg-[#FFDD33] rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play size={20} weight="fill" className="text-[#002b31]" />
                      </div>
                    </div>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 group cursor-pointer shadow-sm">
                    <img 
                      src="https://picsum.photos/seed/matti/800/450" 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" 
                      alt="Matti Lannetta Speaking" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-10 bg-[#FFDD33] rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play size={20} weight="fill" className="text-[#002b31]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Try it as a sole trader */}
              <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-10 shadow-sm relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <div className="flex items-start gap-5 mb-8 text-[#002b31]">
                      <div className="w-10 h-10 rounded-full bg-[#E6F0F1] flex items-center justify-center flex-shrink-0">
                        <span className="text-[18px] font-bold">2</span>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-[20px] font-bold mb-6">Try it as a sole trader</h2>
                        <div className="space-y-6">
                           <p className="text-[15px] leading-relaxed">
                            Send yourself a test invite and follow the journey your clients will take.
                          </p>
                          <p className="text-[15px] leading-relaxed">
                            Watch the How to Send Invitations video with Matti to get started.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Comment Box 2 */}
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
                        alt="Team Member" 
                      />
                      <div className="bg-[#FFF1E9] px-6 py-4 rounded-[8px] flex-1">
                        <p className="text-[15px] font-medium text-[#002b31] leading-relaxed">
                          Accept your invitation via email to unlock your account and access all welcome resources.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Large Video Preview on Right */}
                  <div className="flex items-center">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-100 group cursor-pointer shadow-sm">
                      <img 
                        src="https://picsum.photos/seed/mobile/800/450" 
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" 
                        alt="Kletta Mobile App" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-10 bg-[#FFDD33] rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <Play size={20} weight="fill" className="text-[#002b31]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Download the app */}
              <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-10 shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-12">
                   {/* Left: App Screen */}
                   <div className="w-full md:w-[320px] flex-shrink-0">
                      <div className="bg-[#002b31] rounded-[36px] p-4 border-[8px] border-[#1a1a1a] shadow-2xl aspect-[9/18.5] relative overflow-hidden group">
                         <img 
                           src="https://picsum.photos/seed/kletta-app/600/1200" 
                           className="w-full h-full object-cover rounded-[24px]" 
                           alt="Kletta App Screenshot" 
                         />
                         <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all pointer-events-none"></div>
                      </div>
                   </div>

                   {/* Right: Content */}
                   <div className="flex-1 py-4">
                      <div className="flex items-center gap-5 mb-8">
                        <div className="w-10 h-10 rounded-full bg-[#E6F0F1] flex items-center justify-center flex-shrink-0">
                          <span className="text-[18px] font-bold text-[#002b31]">3</span>
                        </div>
                        <h2 className="text-[24px] font-bold text-[#002b31]">Download the app</h2>
                      </div>

                      <div className="space-y-6 mb-10">
                        <p className="text-[16px] text-[#002b31] font-medium">Download the Kletta and you’ll be guided to:</p>
                        <ul className="space-y-4">
                          {[
                            "Set up business details (name, logo, banking info, invoice settings)",
                            "Explore key features: add services/products, create invoices, log expenses, track mileage",
                            "Try the in-app chat - send a message as a sole trader and reply to it via your portal"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-[15px] text-[#002b31] leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#002b31] mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Store Buttons */}
                      <div className="flex flex-wrap gap-4 mb-10">
                         <button className="h-10 bg-black hover:bg-[#1a1a1a] transition-colors rounded-lg px-4 flex items-center gap-3">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-7" alt="Google Play" />
                         </button>
                         <button className="h-10 bg-black hover:bg-[#1a1a1a] transition-colors rounded-lg px-4 flex items-center gap-3 border border-white/10">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-7" alt="App Store" />
                         </button>
                      </div>

                      <div className="space-y-6 text-[15px] text-[#002b31] leading-relaxed mb-10">
                        <p>We handle onboarding for your real clients the same way – you just send invites, and we guide them from there.</p>
                        <p>When a sole trader accepts your invitation, they’ll receive a Welcome email packed with helpful assets.</p>
                      </div>

                      <button className="h-[44px] px-8 bg-[#FFDD33] hover:bg-[#FACC15] text-[#002b31] text-[14px] font-bold rounded-lg transition-colors shadow-sm flex items-center gap-3">
                         Download assets
                         <DownloadSimple size={18} weight="bold" />
                      </button>
                   </div>
                </div>
              </div>

              {/* Card 4: Invite your sole trader clients */}
              <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-10 shadow-sm relative overflow-hidden">
                 <div className="flex items-center gap-5 mb-10">
                  <div className="w-10 h-10 rounded-full bg-[#E6F0F1] flex items-center justify-center flex-shrink-0">
                    <span className="text-[18px] font-bold text-[#002b31]">4</span>
                  </div>
                  <h2 className="text-[24px] font-bold text-[#002b31]">Invite your sole trader clients</h2>
                </div>

                <div className="space-y-16">
                  {/* Step 1 */}
                  <div className="space-y-6">
                    <div className="flex items-center">
                       <span className="text-[18px] font-bold text-[#002b31] border-l-[3px] border-[#FFDD33] pl-3 leading-none">Step 1</span>
                    </div>
                    <p className="text-[15px] text-[#002b31] leading-relaxed max-w-[800px]">
                      Send a quick notification email to your clients, letting them know your practice is now using Kletta.
                    </p>
                    <button className="h-[44px] px-6 bg-[#005A66] hover:bg-[#004852] text-white text-[14px] font-bold rounded-lg transition-colors shadow-sm flex items-center gap-3">
                       Download email template
                       <DownloadSimple size={18} weight="bold" />
                    </button>
                  </div>

                  {/* Step 2 */}
                  <div className="pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="flex items-center">
                         <span className="text-[18px] font-bold text-[#002b31] border-l-[3px] border-[#FFDD33] pl-3 leading-none">Step 2</span>
                      </div>
                      <p className="text-[15px] text-[#002b31] leading-relaxed">
                        Invite each sole trader directly from the portal. They’ll get an email to join Kletta.
                      </p>
                      <div className="space-y-2">
                        <p className="text-[15px] text-[#002b31]">Watch the how-to video or refer to Section 3 of the guide if needed.</p>
                        <button className="text-[15px] font-bold text-[#1E6F73] underline underline-offset-4 hover:text-[#165659]">
                          Download the Guide here
                        </button>
                      </div>
                    </div>
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 group cursor-pointer shadow-md bg-[#eee]">
                      <img src="https://picsum.photos/seed/invite-v1/800/450" className="w-full h-full object-cover" alt="Invite Video" />
                      <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
                         <div className="w-full h-[3px] bg-white/30 rounded-full relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-[#FFDD33] w-[45%]" />
                         </div>
                         <div className="flex justify-between mt-2 text-white text-[12px] font-medium">
                            <span>0:24</span>
                            <div className="flex gap-1 items-center">
                               <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                               <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                               <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                            </div>
                         </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-12 bg-[#FFDD33] rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <Play size={24} weight="fill" className="text-[#002b31]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="flex items-center">
                         <span className="text-[18px] font-bold text-[#002b31] border-l-[3px] border-[#FFDD33] pl-3 leading-none">Step 3</span>
                      </div>
                      <div className="space-y-6">
                        <p className="text-[15px] font-bold text-[#002b31]">Have lots of clients?</p>
                        <p className="text-[15px] text-[#002b31] leading-relaxed">
                          Use our Excel template to add them all at once and upload via CSV.
                        </p>
                        <p className="text-[15px] text-[#002b31]">Watch the video to see how bulk invites work.</p>
                      </div>
                    </div>
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 group cursor-pointer shadow-md bg-[#eee]">
                       <img src="https://picsum.photos/seed/invite-v2/800/450" className="w-full h-full object-cover" alt="Bulk Invite Video" />
                       <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent">
                         <div className="w-full h-[3px] bg-white/30 rounded-full relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-[#FFDD33] w-[65%]" />
                         </div>
                         <div className="flex justify-between mt-2 text-white text-[12px] font-medium">
                            <span>0:32</span>
                            <div className="flex gap-1 items-center">
                               <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                               <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                               <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                            </div>
                         </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-12 bg-[#FFDD33] rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <Play size={24} weight="fill" className="text-[#002b31]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Learn through support videos and guides */}
              <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-10 shadow-sm relative overflow-hidden">
                 <div className="flex items-center gap-5 mb-10">
                  <div className="w-10 h-10 rounded-full bg-[#E6F0F1] flex items-center justify-center flex-shrink-0">
                    <span className="text-[18px] font-bold text-[#002b31]">5</span>
                  </div>
                  <h2 className="text-[24px] font-bold text-[#002b31]">Learn through support videos and guides</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                   {/* In-app chat */}
                   <div className="space-y-4">
                      <h3 className="text-[16px] font-bold text-[#002b31] border-b-[2px] border-[#FFDD33] inline-block pb-0.5">In-app chat</h3>
                      <p className="text-[14px] text-[#002b31] leading-relaxed">
                        Watch the demo video: Learn how to chat with your sole traders inside the app — no more messy email chains.
                      </p>
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 group cursor-pointer shadow-sm bg-[#eee]">
                        <img src="https://picsum.photos/seed/chat-v/800/450" className="w-full h-full object-cover" alt="Chat Demo" />
                        <div className="absolute inset-x-0 bottom-0 px-5 py-3 bg-gradient-to-t from-black/60 to-transparent">
                          <div className="w-full h-[3px] bg-white/30 rounded-full relative overflow-hidden">
                              <div className="absolute top-0 left-0 h-full bg-[#FFDD33] w-[15%]" />
                          </div>
                          <div className="flex justify-between mt-1.5 text-white text-[11px] font-medium">
                              <span>0:50</span>
                              <Play size={10} weight="fill" />
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-10 bg-[#FFDD33] rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play size={20} weight="fill" className="text-[#002b31]" />
                          </div>
                        </div>
                      </div>
                      <p className="text-[14px] text-[#002b31]">Or find in Section 5 of Guide. <button className="font-bold text-[#1E6F73] underline underline-offset-2">Download the Guide here</button></p>
                   </div>

                   {/* In-app support assets */}
                   <div className="space-y-4">
                      <h3 className="text-[16px] font-bold text-[#002b31] border-b-[2px] border-[#FFDD33] inline-block pb-0.5">In-app support assets</h3>
                      <p className="text-[14px] text-[#002b31] leading-relaxed">
                        Soon, you’ll also be able to send support videos and FAQs directly via the in-app chat. Stay tuned!
                      </p>
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 bg-[#f3f4f6] flex items-center justify-center">
                         <div className="text-center">
                            <h4 className="text-[28px] font-black text-[#002b31]/40 uppercase tracking-tight">COMING SOON</h4>
                         </div>
                      </div>
                      <div className="flex gap-4 pt-2">
                         <button className="text-[15px] font-bold text-[#1E6F73] underline underline-offset-4">Support videos</button>
                         <button className="text-[15px] font-bold text-[#1E6F73] underline underline-offset-4">FAQ’s</button>
                      </div>
                   </div>

                   {/* Remote login */}
                   <div className="space-y-4">
                      <h3 className="text-[16px] font-bold text-[#002b31] border-b-[2px] border-[#FFDD33] inline-block pb-0.5">Remote login to Sole Trader app</h3>
                      <p className="text-[14px] text-[#002b31] leading-relaxed">
                        Watch the demo video: See how to log in as your client to assist them directly within the app.
                      </p>
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 group cursor-pointer shadow-sm bg-[#eee]">
                        <img src="https://picsum.photos/seed/login-v/800/450" className="w-full h-full object-cover" alt="Remote Login Demo" />
                        <div className="absolute inset-x-0 bottom-0 px-5 py-3 bg-gradient-to-t from-black/60 to-transparent">
                          <div className="w-full h-[3px] bg-white/30 rounded-full relative overflow-hidden">
                              <div className="absolute top-0 left-0 h-full bg-[#FFDD33] w-[35%]" />
                          </div>
                          <div className="flex justify-between mt-1.5 text-white text-[11px] font-medium">
                              <span>1:06</span>
                              <Play size={10} weight="fill" />
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-10 bg-[#FFDD33] rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play size={20} weight="fill" className="text-[#002b31]" />
                          </div>
                        </div>
                      </div>
                      <p className="text-[14px] text-[#002b31]">Or find in Section 13 of Guide. <button className="font-bold text-[#1E6F73] underline underline-offset-2">Download the Guide here</button></p>
                   </div>

                   {/* Backfilling YTD */}
                   <div className="space-y-4">
                      <h3 className="text-[16px] font-bold text-[#002b31] border-b-[2px] border-[#FFDD33] inline-block pb-0.5">Backfilling Year-to-Date (YTD)</h3>
                      <p className="text-[14px] text-[#002b31] leading-relaxed">
                        Watch the demo video: Learn how to capture historical income and expense data in Kletta.
                      </p>
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 group cursor-pointer shadow-sm bg-[#eee]">
                        <img src="https://picsum.photos/seed/ytd-v/800/450" className="w-full h-full object-cover" alt="YTD Demo" />
                        <div className="absolute inset-x-0 bottom-0 px-5 py-3 bg-gradient-to-t from-black/60 to-transparent">
                          <div className="w-full h-[3px] bg-white/30 rounded-full relative overflow-hidden">
                              <div className="absolute top-0 left-0 h-full bg-[#FFDD33] w-[55%]" />
                          </div>
                          <div className="flex justify-between mt-1.5 text-white text-[11px] font-medium">
                              <span>1:40</span>
                              <Play size={10} weight="fill" />
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-10 bg-[#FFDD33] rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play size={20} weight="fill" className="text-[#002b31]" />
                          </div>
                        </div>
                      </div>
                      <p className="text-[14px] text-[#002b31]">Or find in Section 14 of Guide. <button className="font-bold text-[#1E6F73] underline underline-offset-2">Download the Guide here</button></p>
                   </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100">
                   <h3 className="text-[16px] font-bold text-[#002b31] border-b-[2px] border-[#FFDD33] inline-block pb-0.5 mb-4">Kletta for Accountants: Meet & Greet webinar</h3>
                   <p className="text-[15px] text-[#002b31] leading-relaxed">
                     Join our live session to meet other Kletta practices, ask questions, and discover how to use Kletta to support your sole traders and grow your accounting firm.
                   </p>
                </div>
              </div>

              {/* Card 5-bis: Stay supported & connected */}
              <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-10 shadow-sm relative overflow-hidden">
                 <div className="flex items-center gap-5 mb-10">
                  <div className="w-10 h-10 rounded-full bg-[#E6F0F1] flex items-center justify-center flex-shrink-0">
                    <span className="text-[18px] font-bold text-[#002b31]">5</span>
                  </div>
                  <h2 className="text-[24px] font-bold text-[#002b31]">Stay supported & connected</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                   <div className="space-y-12">
                      <div className="space-y-4">
                         <h3 className="text-[16px] font-bold text-[#002b31] border-b-[2px] border-[#FFDD33] inline-block pb-0.5">Stay in the loop</h3>
                         <div className="space-y-4">
                            <p className="text-[14px] text-[#002b31] leading-relaxed">
                              As a partner, you’ll receive our Partner Newsletter, with product updates, feature releases, and insights from other firms.
                            </p>
                            <p className="text-[14px] text-[#002b31] leading-relaxed italic">
                              Your feedback helps shape what comes next – and we’re always listening.
                            </p>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h3 className="text-[16px] font-bold text-[#002b31] border-b-[2px] border-[#FFDD33] inline-block pb-0.5">Get 1:1 support</h3>
                         <p className="text-[14px] text-[#002b31] leading-relaxed">
                           You can book a meeting directly with Kevin to ask questions, get advice, or walk through anything you’re unsure about - whether it’s just you or your whole team.
                         </p>
                         <button className="flex items-center gap-3 px-6 py-3 bg-white border border-[#E5E7EB] rounded-2xl hover:bg-gray-50 transition-colors shadow-sm group">
                            <img src="https://i.pravatar.cc/150?u=kevin" className="w-12 h-12 rounded-full object-cover" alt="Kevin" />
                            <span className="text-[14px] font-bold text-[#002b31] group-hover:text-[#005A66]">Schedule a meeting with Kevin</span>
                         </button>
                         <p className="text-[14px] text-[#002b31]">Or email us at <button className="font-bold text-[#1E6F73] underline underline-offset-4">support@kletta.com</button></p>
                      </div>
                   </div>

                   <div className="space-y-12">
                      <div className="space-y-6">
                         <h3 className="text-[16px] font-bold text-[#002b31] border-b-[2px] border-[#FFDD33] inline-block pb-0.5">Join our weekly 'Meet & Greet'</h3>
                         <p className="text-[14px] text-[#002b31] leading-relaxed">
                           Every Wednesday at 12:30, join our live session to meet other new partners and get your questions answered in real time.
                         </p>
                         <button className="h-[44px] px-6 bg-[#005A66] hover:bg-[#004852] text-white text-[14px] font-bold rounded-lg transition-colors shadow-sm flex items-center gap-3">
                           <div className="w-5 h-5 flex items-center justify-center border border-white/40 rounded">
                              <div className="w-2.5 h-2 bg-white/20" />
                           </div>
                           Join LIVE Webinar
                         </button>
                      </div>

                      <div className="space-y-6">
                         <h3 className="text-[16px] font-bold text-[#002b31] border-b-[2px] border-[#FFDD33] inline-block pb-0.5">Coming soon: Partner Community Forum</h3>
                         <div className="space-y-4">
                            <p className="text-[14px] text-[#002b31] leading-relaxed">
                              Soon, you’ll be able to connect with fellow practices directly inside the portal – share tips, ideas, and best practices to support each other and your sole traders.
                            </p>
                            <p className="text-[14px] text-[#002b31] leading-relaxed">
                              Want to contribute before then? 
                            </p>
                            <p className="text-[14px] text-[#002b31] leading-relaxed">
                              We’d love to feature your insights in Kletta blog posts or on LinkedIn. Just reach out and we’ll help shape your contribution.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex flex-col items-center py-12 space-y-6">
                 <div className="flex flex-col items-center gap-1">
                    <span className="text-[32px] font-black text-[#002b31] tracking-tighter">Kletta</span>
                    <span className="text-[15px] font-medium text-[#002b31]/80">Kletta means better accounting for sole traders</span>
                 </div>
                 <button className="text-[16px] font-bold text-[#1E6F73] underline underline-offset-8 hover:text-[#165659]">
                    www.kletta.com
                 </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-8 relative">
        <VersionSwitcher />
        <div className="max-w-[1200px] mx-auto space-y-12">
          
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-[#002b31] mb-2">Welcome to Kletta</h1>
            <p className="text-[13px] text-gray-500">Everything you need to get started and support your clients.</p>
          </div>

          {/* SECTION A: Let's Get Started */}
          <div>
            <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sections.get_started.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow group">
                  <div className="w-full aspect-[16/10] bg-gray-100 rounded-lg mb-4 overflow-hidden relative border border-gray-100">
                     <img 
                       src={item.image_url} 
                       alt={item.title} 
                       loading="lazy"
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                     {item.video_url && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md backdrop-blur-sm">
                             <Play size={16} weight="fill" className="text-[#002b31] ml-0.5" />
                          </div>
                       </div>
                     )}
                  </div>
                  <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                  <p className="text-[12px] text-gray-500 mb-4 flex-1 leading-relaxed">{item.description}</p>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="w-full h-[36px] bg-[#FFDD33] hover:bg-[#FACC15] text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    {item.cta}
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION B: Quick Start Tutorials */}
          <div>
            <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Quick Start Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.quick_start.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow group">
                  <div className="w-full aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden border border-gray-100">
                     <img 
                       src={item.image_url} 
                       alt={item.title} 
                       loading="lazy"
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                  </div>
                  <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                  <p className="text-[12px] text-gray-500 mb-4 flex-1 leading-relaxed">{item.description}</p>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="w-full h-[36px] bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    {item.cta}
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION C: Explore Resources */}
          <div>
            <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Explore Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.resources.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow">
                  <h3 className="text-[14px] font-bold text-[#002b31] mb-4">{item.title}</h3>
                  <div className="flex-1 space-y-3 mb-6">
                    {item.items?.map((subItem, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-[13px] text-gray-600">
                        <CheckCircle size={16} className="text-gray-300 flex-shrink-0" />
                        <span>{subItem}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full h-[36px] bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2">
                    {item.cta}
                    <DownloadSimple size={14} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION D: Further Support */}
          <div>
            <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Further Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.support.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                     <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img src={item.image_url} alt="" loading="lazy" className="w-full h-full object-cover" />
                     </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                    <p className="text-[13px] text-gray-600 mb-6 flex-1 leading-relaxed">{item.description}</p>
                    <div className="flex gap-3">
                      <button className="flex-1 h-[36px] bg-[#002b31] hover:bg-[#003840] text-white text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                        {item.cta}
                      </button>
                      {item.secondary_cta && (
                        <button className="flex-1 h-[36px] bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                          {item.secondary_cta}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION E & F: Community & Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Community */}
            {sections.community.map((item, idx) => (
              <div key={idx} className="bg-[#002b31] text-white border border-[#002b31] rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
                 <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-[13px] text-gray-300 mb-6 leading-relaxed">{item.description}</p>
                    <button className="h-[36px] px-6 bg-[#FFDD33] hover:bg-[#FACC15] text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                      {item.cta}
                    </button>
                 </div>
                 <div className="w-full md:w-1/3 flex-shrink-0 hidden md:flex items-center justify-center bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                    <img src={item.image_url} alt="" loading="lazy" className="w-full h-full object-cover opacity-80" />
                 </div>
              </div>
            ))}

            {/* Newsletter */}
            {sections.newsletter.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
                 <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                    <p className="text-[13px] text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                    <button className="h-[36px] px-6 bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                      {item.cta}
                    </button>
                 </div>
                 <div className="w-full md:w-1/3 flex-shrink-0 hidden md:flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <img src={item.image_url} alt="" loading="lazy" className="w-full h-full object-cover" />
                 </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Detail Modal */}
      <WelcomeDetailModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        item={selectedItem} 
      />
    </>
  );
};

export default Welcome;