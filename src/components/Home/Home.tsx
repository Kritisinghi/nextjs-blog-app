const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <section className="flex flex-col justify-center items-center text-center py-20 px-6">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate__animated animate__fadeIn">
          Welcome to the Future of Blogging
        </h1>

        <p className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
          Discover inspiring stories, expert insights, and diverse perspectives from around the world. Start writing, sharing, and connecting today.
        </p>

        <a
          href="#explore"
          className="inline-block bg-white text-blue-700 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-200 transition duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-2s"
        >
          Explore the Blog
        </a>
      </section>

      {/* Features Section */}
      <section id="explore" className="py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-indigo-100 animate__animated animate__fadeIn">
            Why Choose Our Blog?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white text-blue-700 rounded-xl p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl animate__animated animate__fadeIn animate__delay-0.5s">
            <h3 className="text-2xl font-semibold mb-3">Share Your Voice</h3>
            <p className="text-lg">
              Write articles, share stories, and express yourself in a way that inspires others.
            </p>
          </div>
          <div className="bg-white text-blue-700 rounded-xl p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl animate__animated animate__fadeIn animate__delay-1s">
            <h3 className="text-2xl font-semibold mb-3">Connect With Community</h3>
            <p className="text-lg">
              Engage with readers, comment, and build connections with like-minded individuals.
            </p>
          </div>
          <div className="bg-white text-blue-700 rounded-xl p-6 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl animate__animated animate__fadeIn animate__delay-1.5s">
            <h3 className="text-2xl font-semibold mb-3">Explore New Ideas</h3>
            <p className="text-lg">
              Read articles from diverse voices and expand your understanding of the world.
            </p>
          </div>
        </div>
      </section>
      <footer className="py-8 bg-blue-800 text-center text-white">
        <p>&copy; Made With Love KRS. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
