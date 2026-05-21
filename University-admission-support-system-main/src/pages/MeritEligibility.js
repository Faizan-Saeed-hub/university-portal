import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hasUploadedDocuments } from "../utils";
import "./Eligibility.css";

const Eligibility = () => {

  const navigate = useNavigate();

  // ================= STATES =================
  const [selectedUni, setSelectedUni] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");

  const [marks, setMarks] = useState({
    matricObtained: "",
    matricTotal: "",

    interObtained: "",
    interTotal: "",

    entryObtained: "",
    entryTotal: "",

    hafizQuran: false,

    interPassingYear: ""
  });

  const [merit, setMerit] = useState(null);
  const [eligible, setEligible] = useState(null);
  const [popupData, setPopupData] = useState(null);

  const [showMeritPopup, setShowMeritPopup] =
    useState(false);
  const [userDegree, setUserDegree] = useState("");
  const [popupStage, setPopupStage] = useState("merit_result");

  const [entryTestRequired, setEntryTestRequired] =
    useState(false);

  const [universities, setUniversities] =
    useState([]);

  // ================= CHECK DOCUMENTS =================
  useEffect(() => {

    if (!hasUploadedDocuments()) {
      navigate("/upload");
    }

  }, [navigate]);

  // ================= FETCH UNIVERSITIES =================
  useEffect(() => {

    fetch("https://university-admission-support-system.up.railway.app/universities")

      .then((res) => res.json())

      .then((data) => {

        console.log("Universities:", data);

        // Prevent map errors
        if (Array.isArray(data)) {
          setUniversities(data);
        } else {
          setUniversities([]);
        }
      })

      .catch((err) => {

        console.error(
          "Error fetching universities:",
          err
        );

        setUniversities([]);
      });

  }, []);

  // ================= ENTRY TEST RULE =================
  useEffect(() => {

    const fetchEntryTestRule = async () => {

      if (selectedUni && department) {

        try {

          const res = await fetch(
            "https://university-admission-support-system.up.railway.app/get-entry-test-rule",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                selectedUni,
                department
              })
            }
          );

          const data = await res.json();

          setEntryTestRequired(
            data.entryTestRequired
          );

        } catch (error) {

          console.error(
            "Error fetching entry test rule:",
            error
          );
        }
      }
    };

    fetchEntryTestRule();

  }, [selectedUni, department]);

  // ================= CHECK ELIGIBILITY =================
  const handleCheckEligibility = async () => {

    // Validate selections
    if (
      !selectedUni ||
      !department ||
      !course
    ) {

      alert("Please select all fields!");
      return;
    }

    // Validate marks
    if (
      !marks.matricObtained ||
      !marks.matricTotal ||
      !marks.interObtained ||
      !marks.interTotal ||
      !marks.interPassingYear
    ) {

      alert(
        "Please fill all required marks fields!"
      );

      return;
    }

    // Validate entry test
    if (
      entryTestRequired &&
      (
        !marks.entryObtained ||
        !marks.entryTotal
      )
    ) {

      alert("Entry test marks required!");

      return;
    }

    try {

      const response = await fetch(
        "https://university-admission-support-system.up.railway.app/check-eligibility",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            selectedUni,
            department,
            course,

            marks: {

              matricObtained:
                Number(marks.matricObtained),

              matricTotal:
                Number(marks.matricTotal),

              interObtained:
                Number(marks.interObtained),

              interTotal:
                Number(marks.interTotal),

              entryObtained:
                Number(
                  marks.entryObtained || 0
                ),

              entryTotal:
                Number(
                  marks.entryTotal || 0
                ),

              hafizQuran:
                marks.hafizQuran,

              interPassingYear:
                Number(
                  marks.interPassingYear
                )
            }
          })
        }
      );

      const data = await response.json();

      console.log("Eligibility:", data);

      if (data.error) {

        alert(data.error);

        return;
      }

      setMerit(data.merit);

      setEligible(data.eligible);

      setPopupData(data);

      setUserDegree("");
      setPopupStage("merit_result");
      setShowMeritPopup(true);

      // ================= UPDATE USER MERIT =================
      const currentUserEmail = localStorage.getItem("currentUser");

      if (currentUserEmail) {
        try {
          await axios.put(`https://university-admission-support-system.up.railway.app/api/users/${currentUserEmail}`, {
            merit: data.merit
          });
          console.log("Merit score saved to database.");
        } catch (err) {
          console.error("Failed to save merit to DB:", err);
        }
      }
    } catch (error) {

      console.error(error);

      alert(
        "Server not running! Start backend server."
      );
    }
  };

  return (

    <div className="eligibility-container">

      <div className="eligibility-card">

        <h2>
          University Eligibility Checker
        </h2>

        {/* ================= UNIVERSITY ================= */}

        <label>University</label>

        <select
          value={selectedUni}

          onChange={(e) => {

            setSelectedUni(e.target.value);

            setDepartment("");

            setCourse("");

            setMarks({
              matricObtained: "",
              matricTotal: "",

              interObtained: "",
              interTotal: "",

              entryObtained: "",
              entryTotal: "",

              hafizQuran: false,

              interPassingYear: ""
            });
          }}
        >

          <option value="">
            -- Select University --
          </option>

          {Array.isArray(universities) &&

            universities.map((uni) => (

              <option
                key={uni._id}
                value={uni.name}
              >
                {uni.name}
              </option>
            ))
          }

        </select>

        {/* ================= DEPARTMENT ================= */}

        <label>Department</label>

        <select
          value={department}

          onChange={(e) => {

            setDepartment(e.target.value);

            setCourse("");
          }}

          disabled={!selectedUni}
        >

          <option value="">
            -- Select Department --
          </option>

          {selectedUni &&

            universities
              .find(
                (u) =>
                  u.name === selectedUni
              )

              ?.departments?.map(
                (dept) => (

                  <option
                    key={dept.name}
                    value={dept.name}
                  >
                    {dept.name}
                  </option>
                )
              )
          }

        </select>

        {/* ================= COURSE ================= */}

        <label>Course</label>

        <select
          value={course}

          onChange={(e) =>
            setCourse(e.target.value)
          }

          disabled={!department}
        >

          <option value="">
            -- Select Course --
          </option>

          {selectedUni &&
            department &&

            universities
              .find(
                (u) =>
                  u.name === selectedUni
              )

              ?.departments
              ?.find(
                (d) =>
                  d.name === department
              )

              ?.courses?.map((c) => (

                <option
                  key={c}
                  value={c}
                >
                  {c}
                </option>
              ))
          }

        </select>

        {/* ================= MATRIC ================= */}

        <div className="marks-grid">

          <div>

            <label>
              Matric Obtained Marks
            </label>

            <input
              type="number"

              placeholder="e.g. 1045"

              value={
                marks.matricObtained
              }

              onChange={(e) =>

                setMarks({
                  ...marks,

                  matricObtained:
                    e.target.value
                })
              }
            />

          </div>

          <div>

            <label>
              Matric Total Marks
            </label>

            <input
              type="number"

              placeholder="e.g. 1100"

              value={
                marks.matricTotal
              }

              onChange={(e) =>

                setMarks({
                  ...marks,

                  matricTotal:
                    e.target.value
                })
              }
            />

          </div>

        </div>

        {/* ================= INTER ================= */}

        <div className="marks-grid">

          <div>

            <label>
              Intermediate Obtained Marks
            </label>

            <input
              type="number"

              placeholder="e.g. 1067"

              value={
                marks.interObtained
              }

              onChange={(e) =>

                setMarks({
                  ...marks,

                  interObtained:
                    e.target.value
                })
              }
            />

          </div>

          <div>

            <label>
              Intermediate Total Marks
            </label>

            <input
              type="number"

              placeholder="e.g. 1100"

              value={
                marks.interTotal
              }

              onChange={(e) =>

                setMarks({
                  ...marks,

                  interTotal:
                    e.target.value
                })
              }
            />

          </div>

        </div>

        {/* ================= PASSING YEAR ================= */}

        <label>
          Intermediate Passing Year
        </label>

        <input
          type="number"

          placeholder="e.g. 2025"

          value={
            marks.interPassingYear
          }

          onChange={(e) =>

            setMarks({
              ...marks,

              interPassingYear:
                e.target.value
            })
          }
        />

        {/* ================= HAFIZ ================= */}

        <div className="checkbox-field">

          <input
            type="checkbox"

            checked={
              marks.hafizQuran
            }

            onChange={(e) =>

              setMarks({
                ...marks,

                hafizQuran:
                  e.target.checked
              })
            }
          />

          <label>
            Hafiz-e-Quran
          </label>

        </div>

        {/* ================= ENTRY TEST ================= */}

        {entryTestRequired && (

          <div className="marks-grid">

            <div>

              <label>
                Entry Test Obtained Marks
              </label>

              <input
                type="number"

                placeholder="e.g. 70"

                value={
                  marks.entryObtained
                }

                onChange={(e) =>

                  setMarks({
                    ...marks,

                    entryObtained:
                      e.target.value
                  })
                }
              />

            </div>

            <div>

              <label>
                Entry Test Total Marks
              </label>

              <input
                type="number"

                placeholder="e.g. 100"

                value={
                  marks.entryTotal
                }

                onChange={(e) =>

                  setMarks({
                    ...marks,

                    entryTotal:
                      e.target.value
                  })
                }
              />

            </div>

          </div>
        )}

        {/* ================= BUTTON ================= */}

        <button
          className="check-btn"

          onClick={
            handleCheckEligibility
          }

          disabled={
            !selectedUni ||
            !department ||
            !course
          }
        >
          Check Eligibility
        </button>

      </div>

      {/* ================= POPUP ================= */}

      {showMeritPopup && (
        <div className="merit-popup">
          <div className="merit-content">

            {/* ===== STEP INDICATOR ===== */}
            <div className="popup-step-indicator">
              <div className={`popup-step ${["merit_result"].includes(popupStage) ? "active" : ["check_degree", "eligible", "not_eligible"].includes(popupStage) ? "done" : ""}`}>
                <div className="popup-step-circle">1</div>
                <span>Merit</span>
              </div>
              <div className="popup-step-line" />
              <div className={`popup-step ${popupStage === "check_degree" ? "active" : ["eligible", "not_eligible"].includes(popupStage) ? "done" : ""}`}>
                <div className="popup-step-circle">2</div>
                <span>Degree</span>
              </div>
              <div className="popup-step-line" />
              <div className={`popup-step ${["eligible", "not_eligible"].includes(popupStage) ? "active" : ""}`}>
                <div className="popup-step-circle">3</div>
                <span>Result</span>
              </div>
            </div>

            {/* ================= STAGE 1: MERIT RESULT ================= */}
            {popupStage === "merit_result" && (
              <>
                {/* Merit Score Badge */}
                <div className="popup-stage1-header">
                  <div className="popup-stage-icon">🎓</div>
                  <h2 className="popup-stage-title">Merit Calculation</h2>
                  <p className="popup-stage-subtitle">Based on your entered marks for <strong>{course}</strong></p>
                </div>

                <div className="popup-merit-score-card">
                  <div className="popup-merit-label">Your Calculated Merit</div>
                  <div className="merit-badge-value">{merit}%</div>
                  <div className="popup-merit-context">
                    at <strong>{selectedUni}</strong>
                  </div>
                </div>

                {eligible ? (
                  <div className="popup-status-card popup-status-success">
                    <div className="popup-status-icon-wrap">🎉</div>
                    <div className="popup-status-message">
                      <strong>Congratulations!</strong> Your merit meets the university's last year cutoff.
                    </div>
                    <button onClick={() => setPopupStage("check_degree")} className="popup-next-btn popup-next-success">
                      Verify Degree Eligibility →
                    </button>
                  </div>
                ) : (
                  <div className="popup-status-card popup-status-fail">
                    <div className="popup-status-icon-wrap">😅</div>
                    <div className="popup-status-message">
                      <strong>Below Cutoff.</strong> Your merit doesn't meet last year's cutoff, but you can still verify degree eligibility.
                    </div>
                    <button onClick={() => setPopupStage("check_degree")} className="popup-next-btn popup-next-fail">
                      Check Degree Eligibility →
                    </button>
                  </div>
                )}

                {/* Cutoff History */}
                <div className="popup-cutoff-section">
                  <div className="popup-section-label">📊 Last 3 Year Cutoffs — {course}</div>
                  <div className="popup-cutoff-grid">
                    <div className="popup-cutoff-year">
                      <span className="popup-cutoff-yr-label">2024</span>
                      <span className="popup-cutoff-yr-val">{popupData?.cutoffHistory?.year2024 ?? "—"}%</span>
                    </div>
                    <div className="popup-cutoff-year">
                      <span className="popup-cutoff-yr-label">2023</span>
                      <span className="popup-cutoff-yr-val">{popupData?.cutoffHistory?.year2023 ?? "—"}%</span>
                    </div>
                    <div className="popup-cutoff-year">
                      <span className="popup-cutoff-yr-label">2022</span>
                      <span className="popup-cutoff-yr-val">{popupData?.cutoffHistory?.year2022 ?? "—"}%</span>
                    </div>
                  </div>
                </div>

                {/* Similar Programs */}
                {popupData?.similarPrograms && popupData.similarPrograms.length > 0 && (
                  <div className="popup-similar-section">
                    <div className="popup-section-label">🔗 Similar Programs at {selectedUni}</div>
                    <ul className="popup-similar-list">
                      {popupData.similarPrograms.map((prog, i) => (
                        <li key={i} className="popup-similar-item">
                          <span>{prog.name}</span>
                          <span className="popup-similar-merit">{prog.merit}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="popup-buttons">
                  <button className="popup-close-btn" onClick={() => setShowMeritPopup(false)}>
                    Close
                  </button>
                </div>
              </>
            )}

            {/* ================= STAGE 2: DEGREE SELECTION ================= */}
            {popupStage === "check_degree" && (
              <>
                <div className="popup-stage1-header">
                  <div className="popup-stage-icon">📋</div>
                  <h2 className="popup-stage-title">Degree Verification</h2>
                  <p className="popup-stage-subtitle">Select your intermediate degree to check qualification for <strong>{course}</strong></p>
                </div>

                <div className="popup-degree-card">
                  <div className="popup-degree-required">
                    <span className="popup-degree-req-label">Required Qualification</span>
                    <span className="popup-degree-req-value">{popupData?.requiredDegree || "Any Intermediate"}</span>
                  </div>

                  <label className="popup-select-label">Your Degree</label>
                  <select
                    value={userDegree}
                    onChange={(e) => setUserDegree(e.target.value)}
                    className="popup-select"
                  >
                    <option value="">-- Select your degree --</option>
                    {(() => {
                      const reqStr = popupData?.requiredDegree || "Any Intermediate";
                      const isAny = /any intermediate|intermediate or equivalent|intermediate/i.test(reqStr);
                      const degrees = isAny
                        ? ["FSc Pre-Medical", "FSc Pre-Engineering", "ICS", "I.Com", "F.A", "A-Level", "DAE"]
                        : reqStr.split(',')
                            .map(d => d.trim().replace(/^(or|and)\s+/i, ''))
                            .filter(Boolean);
                      return degrees.map((deg, idx) => (
                        <option key={idx} value={deg}>{deg}</option>
                      ));
                    })()}
                    <option value="Other">Other / My degree is not listed</option>
                  </select>
                </div>

                <div className="popup-buttons">
                  <button
                    className="apply-btn"
                    disabled={!userDegree}
                    onClick={() => {
                      if (userDegree && userDegree !== "Other") {
                        setPopupStage("eligible");
                      } else {
                        setPopupStage("not_eligible");
                      }
                    }}
                  >
                    Verify Eligibility →
                  </button>
                  <button className="popup-close-btn back-btn" onClick={() => setPopupStage("merit_result")}>
                    ← Back
                  </button>
                </div>
              </>
            )}

            {/* ================= STAGE 3: ELIGIBLE ================= */}
            {popupStage === "eligible" && (
              <>
                <div className="popup-stage1-header">
                  <div className="popup-stage-icon popup-stage-icon-success">✅</div>
                  <h2 className="popup-stage-title popup-title-success">You're Eligible!</h2>
                  <p className="popup-stage-subtitle">You qualify to apply for this program</p>
                </div>

                <div className="popup-result-card popup-result-success">
                  <div className="popup-result-row">
                    <span className="popup-result-key">Your Degree</span>
                    <span className="popup-result-val">{userDegree}</span>
                  </div>
                  <div className="popup-result-divider" />
                  <div className="popup-result-row">
                    <span className="popup-result-key">Program</span>
                    <span className="popup-result-val">{course}</span>
                  </div>
                  <div className="popup-result-divider" />
                  <div className="popup-result-row">
                    <span className="popup-result-key">University</span>
                    <span className="popup-result-val">{selectedUni}</span>
                  </div>
                  <div className="popup-result-divider" />
                  <div className="popup-result-row">
                    <span className="popup-result-key">Merit Score</span>
                    <span className="popup-result-val popup-result-merit">{merit}%</span>
                  </div>
                </div>

                <div className="popup-buttons">
                  {popupData?.applyLink ? (
                    <button className="apply-btn" onClick={() => window.open(popupData.applyLink, "_blank")}>
                      🚀 Apply Now
                    </button>
                  ) : (
                    <button className="apply-btn" disabled>
                      Apply Link N/A
                    </button>
                  )}
                  <button className="popup-close-btn" onClick={() => setShowMeritPopup(false)}>
                    Close
                  </button>
                </div>
              </>
            )}

            {/* ================= STAGE 4: NOT ELIGIBLE ================= */}
            {popupStage === "not_eligible" && (
              <>
                <div className="popup-stage1-header">
                  <div className="popup-stage-icon popup-stage-icon-fail">❌</div>
                  <h2 className="popup-stage-title popup-title-fail">Not Eligible</h2>
                  <p className="popup-stage-subtitle">Your degree does not match the requirements</p>
                </div>

                <div className="popup-result-card popup-result-fail">
                  <div className="popup-result-row">
                    <span className="popup-result-key">Your Degree</span>
                    <span className="popup-result-val">{userDegree}</span>
                  </div>
                  <div className="popup-result-divider" />
                  <div className="popup-result-row">
                    <span className="popup-result-key">Required</span>
                    <span className="popup-result-val">{popupData?.requiredDegree || "N/A"}</span>
                  </div>
                  <div className="popup-result-divider" />
                  <div className="popup-result-row">
                    <span className="popup-result-key">Program</span>
                    <span className="popup-result-val">{course}</span>
                  </div>
                </div>

                <div className="popup-buttons">
                  <button
                    className="apply-btn"
                    onClick={() => {
                      setShowMeritPopup(false);
                      const uniObj = universities.find(u => u.name === selectedUni);
                      if (uniObj) {
                        navigate(`/university/${uniObj._id}/programs`);
                      } else {
                        alert("University details page not found.");
                      }
                    }}
                  >
                    View All Programs
                  </button>
                  <button className="popup-close-btn" onClick={() => setShowMeritPopup(false)}>
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Eligibility;