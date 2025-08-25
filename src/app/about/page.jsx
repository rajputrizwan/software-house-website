export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 mt-10">
      <section className="max-w-5xl mx-auto px-6 py-16">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          About <span className="text-blue-600">Us</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
          Welcome to our software house! We are a team of passionate developers,
          designers, and innovators dedicated to building modern, scalable, and
          user-friendly digital solutions. Our mission is to help businesses
          grow by leveraging the latest technologies.
        </p>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We are a diverse team of developers, designers, and strategists
              with a shared passion for technology. Our expertise spans web
              development, mobile apps, cloud solutions, and AI-driven products.
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We aim to become a trusted partner for businesses worldwide,
              helping them achieve digital transformation through innovative
              solutions and customer-focused strategies.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Team</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10">
            A group of passionate professionals working together to deliver the
            best results for our clients.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
              <h3 className="font-semibold">Rizwan Rajput</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full-Stack Developer
              </p>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
              <h3 className="font-semibold">Ayesha Khan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                UI/UX Designer
              </p>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
              <h3 className="font-semibold">Ali Ahmed</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Project Manager
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
