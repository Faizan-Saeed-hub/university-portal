
import React, { useState } from "react";
import axios from "axios";
import "./UniversityRecommendation.css";

function UniversityRecommendation() {

  const [formData, setFormData] = useState({
    merit: "",
    city: "",
    degree: "",
    type: "",
    hostel: false,
    maxFee: ""
  });

  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    // ================= VALIDATION =================

    if (

      !formData.city ||

      !formData.degree ||

      !formData.type ||

      !formData.maxFee
    ) {

      alert(
        "Please fill all required fields"
      );

      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "https://university-admission-support-system.up.railway.app/recommend-universities",
        formData
      );

      setRecommendations(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="recommendation-container-1">

      <div className="recommendation-card-1">

        <h2>AI University Recommendation</h2>

        <form onSubmit={handleSubmit}>

          <div className="grid-1">
            <div>
              <label>Preferred City</label>

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Sargodha">Sargodha</option>
                <option value="Faisalabad">Faisalabad</option>
              </select>
            </div>

            <div>
              <label>Degree Program</label>

              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              >
                <option value="">Select Degree</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="AI">Artificial Intelligence</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            <div>
              <label>University Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label>Maximum Fee</label>

              <input
                type="number"
                name="maxFee"
                placeholder="Enter Maximum Fee"
                value={formData.maxFee}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="checkbox-field-1">

            <input
              type="checkbox"
              name="hostel"
              checked={formData.hostel}
              onChange={handleChange}
            />

            <label>Hostel Required</label>

          </div>

          <button type="submit" className="recommend-btn">

            {loading
              ? "Finding Universities..."
              : "Get Recommendations"}

          </button>

        </form>

      </div>

      {
        recommendations.length > 0 && (

          <div className="results-section-1">

            <h2>Recommended Universities</h2>

            <div className="results-grid-1">

              {recommendations.map((uni, index) => (

                <div className="uni-card-1" key={index}>

                  <h3>{uni.name}</h3>

                  <p>
                    <strong>City:</strong> {uni.city}
                  </p>

                  <p>
                    <strong>Type:</strong> {uni.type}
                  </p>

                  <p>
                    <strong>Average Fee:</strong> {uni.averageFee}
                  </p>

                  <p>
                    <strong>Match Score:</strong> {uni.matchScore}%
                  </p>

                  <div className="match-badge-1">
                    {

                      uni.matchScore >= 80
                        ? "Best Match"

                        : uni.matchScore >= 60
                          ? "Recommended"

                          : "Consider"

                    }
                  </div>

                </div>

              ))}

            </div>

          </div>
        )
      }

    </div>
  );
}

export default UniversityRecommendation;













