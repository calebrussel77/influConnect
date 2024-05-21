import React from 'react';

// const avatars = [
//   'https://randomuser.me/api/portraits/men/32.jpg',
//   'https://randomuser.me/api/portraits/women/32.jpg',
//   'https://randomuser.me/api/portraits/men/44.jpg',
//   'https://randomuser.me/api/portraits/women/44.jpg',
//   'https://randomuser.me/api/portraits/men/76.jpg',
//   'https://randomuser.me/api/portraits/women/76.jpg',
// ];

const avatars = [
  'https://i.pravatar.cc/40?img=1',
  'https://i.pravatar.cc/40?img=2',
  'https://i.pravatar.cc/40?img=3',
  'https://i.pravatar.cc/40?img=4',
  'https://i.pravatar.cc/40?img=5',
  'https://i.pravatar.cc/40?img=6',
  'https://i.pravatar.cc/40?img=7',
];

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-6xl p-4">
        <div className="mb-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href="#" className="text-gray-500">
              Demo
            </a>
            <span className="text-gray-300">/</span>
            <a href="#" className="text-gray-500">
              Careers <span className="text-yellow-500">✨</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Garnerly.</h1>
            <button className="rounded-full bg-gray-200 px-3 py-1 text-gray-700">
              Light
            </button>
            <button className="rounded-full bg-gray-200 px-3 py-1 text-gray-700">
              Dark
            </button>
          </div>
        </div>
        <div className="flex rounded-lg bg-white p-8">
          <div className="w-1/2 pr-8">
            <h2 className="mb-4 text-3xl font-bold">
              Decentralized all-in-one community platform.
            </h2>
            <div className="space-y-6">
              <div>
                <p className="mb-2 flex items-center text-lg font-semibold">
                  <i className="fas fa-check-circle mr-2 text-purple-600"></i>
                  Have the right conversation, every time.
                </p>
                <p className="text-gray-600">
                  Powerful features such as public sharing and message recall
                  lets you organize communications in a visual way, with easy
                  search and quick access to all relevant information.{' '}
                  <span className="text-red-500">💯</span>
                </p>
              </div>
              <div>
                <p className="mb-2 flex items-center text-lg font-semibold">
                  <i className="fas fa-check-circle mr-2 text-purple-600"></i>
                  Ask your questions instantly. Garner an answer.
                </p>
                <p className="text-gray-600">
                  Define the visual direction of the website and translate the
                  wireframes into high-fidelity designs that successfully
                  communicate your company's brand and product or service.{' '}
                  <span className="text-orange-500">🔥</span>
                </p>
              </div>
              <div>
                <p className="mb-2 flex items-center text-lg font-semibold">
                  <i className="fas fa-check-circle mr-2 text-purple-600"></i>
                  Safe and secure environment.
                </p>
                <p className="text-gray-600">
                  There is no fear of being scammed by anyone! Extra care is
                  taken in protecting our users so they can complete the
                  learning process in a safe manner with full transparency.{' '}
                  <span className="text-yellow-500">😊</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-1/2 flex-col items-center border-l border-gray-200 pl-8">
            <h2 className="mb-4 text-center text-3xl font-bold">
              Join our journey and get early access
            </h2>
            <p className="mb-6 text-center text-gray-600">
              Join our extensive waitlist today to spark connection and get
              notified when we launch{' '}
              <span className="text-yellow-500">🎉</span>
            </p>
            <div className="mb-6 flex space-x-2">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`User avatar ${index + 1}`}
                  className="h-10 w-10 rounded-full"
                />
              ))}
            </div>
            <form className="w-full max-w-xs space-y-4">
              <input
                type="text"
                placeholder="Tell us your name..."
                className="w-full rounded-lg border border-purple-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-purple-600 py-2 font-semibold text-white"
              >
                Continue <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-500">
              By clicking "continue" you agree to our{' '}
              <a href="#" className="text-purple-600">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="#" className="text-purple-600">
                Terms of Use
              </a>
            </p>
            <div className="mt-8 flex justify-center">
              <img
                src="https://placehold.co/40x40"
                alt="Decorative icon"
                className="h-10 w-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
