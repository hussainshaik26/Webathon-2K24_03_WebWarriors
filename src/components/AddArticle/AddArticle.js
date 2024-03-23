import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddArticle.css";
import axios from "axios";
import { useSelector } from "react";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  const { register, handleSubmit } = useForm();
  const [selectedGenre, setSelectedGenre] = useState("");
  let { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  let [err, setErr] = useState();
  let navigate = useNavigate();

  // Define tag options for each genre
  const tagOptions = {
    programming: ["JavaScript", "Python", "Java", "C++", "Ruby", "HTML/CSS"],
    ai_ml: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
    ],
    database: ["SQL", "NoSQL", "MongoDB", "MySQL", "PostgreSQL"],
    story: ["Short Story", "Flash Fiction", "Novella", "Microfiction"],
    poetry: ["Haiku", "Sonnet", "Free Verse", "Narrative Poetry"],
    fiction: ["Science Fiction", "Mystery", "Thriller", "Adventure"],
    history: [
      "Ancient History",
      "Medieval History",
      "Modern History",
      "World History",
    ],
    horror: ["Supernatural", "Psychological", "Gothic", "Body Horror"],
    romance: [
      "Contemporary Romance",
      "Historical Romance",
      "Paranormal Romance",
      "Erotic Romance",
    ],
    abstract: ["Abstract Expressionism", "Cubism", "Surrealism", "Minimalism"],
    tragedy: [
      "Shakespearean Tragedy",
      "Greek Tragedy",
      "Modern Tragedy",
      "Domestic Tragedy",
    ],
    biography: ["Political Figures", "Artists", "Scientists", "Leaders"],
    auto_biography: ["Memoir", "Diary", "Autobiographical Fiction", "Letters"],
    fantasy: ["High Fantasy", "Urban Fantasy", "Dark Fantasy", "Magic Realism"],
    drama: ["Comedy", "Tragicomedy", "Melodrama", "Absurdist Drama"],
    health: ["Fitness", "Nutrition", "Mental Health", "Disease Management"],
    spiritual: ["Meditation", "Mindfulness", "Yoga", "Religious Texts"],
    study: [
      "Study Techniques",
      "Exam Preparation",
      "Effective Learning",
      "Time Management",
    ],
    general: ["Current Affairs", "Opinion Pieces", "Miscellaneous"],
  };

  // Handle change in selected genre
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Form submission handler
  const onSubmit = (data) => {
    console.log(data);
  };

  const postNewArticle = async (article) => {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
    //make HTTP post req
    let res = await axios.post(
      "http://localhost:4000/user-api/article",
      article
    );
    console.log(res);
    if (res.data.message === "New article created") {
      navigate("/user-dashboard");
    } else {
      setErr(res.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="form-container card-body">
              <div className="card-title text-center border-bottom border-dark">
                <h2 className="p-3">Write an Article</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title", { required: true })}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select
                    id="category"
                    className="form-select"
                    {...register("category", { required: true })}
                    onChange={handleGenreChange}
                  >
                    <option value="">Select genre</option>
                    {Object.keys(tagOptions).map((genre, index) => (
                      <option key={index} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conditional rendering for tag options based on selected genre */}
                {selectedGenre && (
                  <div className="mb-4">
                    <label htmlFor="tags" className="form-label">
                      Select tags
                    </label>
                    {tagOptions[selectedGenre].map((tag, index) => (
                      <div key={index} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`tag-${index}`}
                          value={tag}
                          {...register(`tags[${index}]`)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`tag-${index}`}
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    rows="10"
                    {...register("content", { required: true })}
                  ></textarea>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddArticle;
