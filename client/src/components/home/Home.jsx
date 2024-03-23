import React from "react";
import "./Home.css";

function Home() {
  return (
    <div>
      <div
        style={{ minHeight: "45vh" }}
        className="bg-danger-subtle bg-gradient d-flex justify-content-between align-items-center p-5"
      >
        <div>
          <img
            src="https://i0.wp.com/www.woblogger.com/wp-content/uploads/2019/10/Writing-SEO-friendly-Blog-Posts.png?fit=1000%2C600&ssl=1"
            alt=""
            className="img2 "
          />
        </div>
        <div className="text-center mx-4 fs-5 display-3">
          <p className="ab display-5 fs-2 fw-medium">
            Welcome to the
            <span className="fw-bold d-block m-auto fs-1 text-danger">
              Writers Hub
            </span>{" "}
          </p>
          <p className="fs-4 fw-medium">
            Your creative sanctuary for sharing stories, connecting with fellow
            writers, and exploring diverse perspectives. Join us and unleash
            your voice in a vibrant community of passionate storytellers.{" "}
          </p>
          <div className="mt-3">
            {/* <button className='btn btn-dark mx-3 fw-semibold' onClick={handleRegisterClick}>Register</button>
          <button className='btn btn-dark mx-3 fw-semibold' onClick={handleLoginClick}>Login</button> */}
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="about display-3 text-center mt-4 fw-semibold">
          About Us!
        </h1>
        <div className="row mx-5 mt-4">
          <div className="p-3 col-sm-4 bg-secondary-subtle">
            <h4 className="text-center fw-semibold">Explore Diverse Topics</h4>
            <p className="">
              Dive into our diverse collection of articles covering topics
              ranging from the latest trends in technology to the most scenic
              travel destinations around the world. Discover insightful tips,
              captivating stories, and helpful guides that will enrich your
              knowledge and inspire your curiosity.
            </p>
          </div>
          <div className="p-3 col-sm-4">
            <h4 className="text-center fw-semibold">
              Stay Updated with Fresh Content
            </h4>
            <p>
              We strive to keep our content fresh and up-to-date, with new posts
              added regularly to keep you informed and entertained. Be sure to
              check back often or subscribe to our newsletter to receive the
              latest updates directly in your inbox.
            </p>
          </div>
          <div className="p-3 bg-secondary-subtle col-sm-4">
            <h4 className="text-center fw-semibold">
              Engage with the Community
            </h4>
            <p>
              Join our vibrant community of readers and writers by leaving
              comments, sharing your thoughts, and engaging in discussions on
              our blog posts. We value your feedback and encourage you to
              actively participate in shaping the conversation.
            </p>
          </div>
        </div>
        <div className="row mx-5 mb-5">
          <div className="p-3 col-sm-4 ">
            <h4 className="text-center fw-semibold">Connect with Us</h4>
            <p className="">
              Connect with us on social media to stay connected and engaged with
              our blog community. Follow us on Twitter, Facebook, and Instagram
              to receive updates, share your favorite posts, and connect with
              like-minded individuals who share your interests.
            </p>
          </div>
          <div className="p-3 col-sm-4 bg-secondary-subtle">
            <h4 className="text-center fw-semibold">Become a Contributor</h4>
            <p>
              Are you passionate about writing and have a story to share?
              Consider becoming a contributor to our blog! We welcome guest
              posts from talented writers and experts in various fields. Submit
              your ideas, and if selected, your article could be featured on our
              blog for our readers to enjoy.
            </p>
          </div>
          <div className="p-3 col-sm-4">
            <h4 className="text-center fw-semibold">Start Exploring Today!</h4>
            <p>
              Ready to embark on a journey of discovery? Start exploring our
              blog today and unlock a world of knowledge, inspiration, and
              entertainment. Whether you're a seasoned reader or a first-time
              visitor, we're excited to have you join us on this adventure!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;